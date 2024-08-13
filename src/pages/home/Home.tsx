/* eslint-disable no-case-declarations */
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import {
  Product,
  ProductCard,
} from "../../components/product-card/product-card";
import SkeletonLoader from "../../components/ui/skeleton-loader";

const filters = [
  {
    id: "category",
    name: "Category",
    options: ["smartphones", "laptops", "fragrances", "skincare", "groceries"],
  },
  {
    id: "brand",
    name: "Brand",
    options: ["Apple", "Samsung", "OPPO", "Huawei"],
  },
  {
    id: "price",
    name: "Price",
    options: [
      "Under $100",
      "$100 - $500",
      "$500 - $1000",
      "$1000 - $1500",
      "Over $1500",
    ],
  },
  {
    id: "rating",
    name: "Rating",
    options: ["4★ & above", "3★ & above", "2★ & above", "1★ & above"],
  },
];

interface ExtendedProduct extends Product {
  category?: string;
  brand?: string;
}

interface HomeProps {
  searchQuery: string;
}

function Home() {
  const { searchQuery } = useOutletContext<HomeProps>();
  const [allProducts, setAllProducts] = useState<ExtendedProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ExtendedProduct[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contentVisible, setContentVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{
    [key: string]: string[];
  }>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        console.log("Fetched products:", response.data.products);
        setAllProducts(response.data.products);
        setFilteredProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();

    const timer = setTimeout(() => {
      setShowLoader(false);
      setTimeout(() => setContentVisible(true), 100);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const applyFiltersAndSearch = () => {
      let newFilteredProducts = allProducts;

      Object.entries(activeFilters).forEach(([filterId, selectedOptions]) => {
        if (selectedOptions.length > 0) {
          newFilteredProducts = newFilteredProducts.filter((product) => {
            switch (filterId) {
              case "category":
                return (
                  product.category && selectedOptions.includes(product.category)
                );
              case "brand":
                return product.brand && selectedOptions.includes(product.brand);
              case "price":
                const productPrice = product.price;
                return selectedOptions.some((option) => {
                  if (option === "Under $100") return productPrice < 100;
                  if (option === "$100 - $500")
                    return productPrice >= 100 && productPrice < 500;
                  if (option === "$500 - $1000")
                    return productPrice >= 500 && productPrice < 1000;
                  if (option === "$1000 - $1500")
                    return productPrice >= 1000 && productPrice < 1500;
                  if (option === "Over $1500") return productPrice >= 1500;
                  return false;
                });
              case "rating":
                const productRating = product.rating;
                return selectedOptions.some((option) => {
                  const minRating = parseInt(option.split("★")[0]);
                  return productRating >= minRating;
                });
              default:
                return true;
            }
          });
        }
      });

      if (searchQuery) {
        newFilteredProducts = newFilteredProducts.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      console.log("Filtered products:", newFilteredProducts);
      setFilteredProducts(newFilteredProducts);
    };

    applyFiltersAndSearch();
  }, [activeFilters, allProducts, searchQuery]);

  const handleFilterChange = (filterId: string, option: string) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev };
      if (!newFilters[filterId]) {
        newFilters[filterId] = [];
      }
      const index = newFilters[filterId].indexOf(option);
      if (index > -1) {
        newFilters[filterId] = newFilters[filterId].filter(
          (item) => item !== option
        );
      } else {
        newFilters[filterId].push(option);
      }
      if (newFilters[filterId].length === 0) {
        delete newFilters[filterId];
      }
      console.log("New filters:", newFilters);
      return newFilters;
    });
  };

  if (showLoader || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <SkeletonLoader />
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div
      className={`container mx-auto px-4 py-8 transition-all duration-1000 ease-out ${
        contentVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-[-20px]"
      }`}
    >
      <div className="flex flex-col md:flex-row">
        <div
          className={`w-full md:w-1/4 mb-4 md:mb-0 transition-all duration-1000 ease-out delay-300 ${
            contentVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-[-20px]"
          }`}
        >
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          {filters.map((filter, index) => (
            <div
              key={filter.id}
              className={`mb-4 transition-all duration-500 ease-out ${
                contentVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-[-20px]"
              }`}
              style={{ transitionDelay: `${index * 100 + 400}ms` }}
            >
              <h3 className="font-medium mb-2">{filter.name}</h3>
              <ul>
                {filter.options.map((option, optionIndex) => (
                  <li
                    key={optionIndex}
                    className={`mb-1 transition-all duration-300 ease-out ${
                      contentVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-[-10px]"
                    }`}
                    style={{
                      transitionDelay: `${
                        (index * filter.options.length + optionIndex) * 50 + 600
                      }ms`,
                    }}
                  >
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 cursor-pointer"
                        checked={
                          activeFilters[filter.id]?.includes(option) || false
                        }
                        onChange={() => handleFilterChange(filter.id, option)}
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className={`w-full md:w-3/4 md:pl-8 transition-all duration-1000 ease-out delay-500 ${
            contentVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-[-20px]"
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`transition-all duration-500 ease-out ${
                  contentVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-[-20px]"
                }`}
                style={{ transitionDelay: `${index * 100 + 800}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center mt-8">
              No products match the selected filters or search query.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
