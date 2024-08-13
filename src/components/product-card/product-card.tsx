import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";

export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  rating: number;
  discountPercentage: number;
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch();

  const handleCartItems = () => {
    const cartItem: CartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.thumbnail,
      amount: 1,
    };
    dispatch(addItem(cartItem));
  };

  return (
    <div className="border rounded-lg hover:shadow-lg transition-shadow flex flex-col justify-between h-[420px] w-full bg-white overflow-hidden">
      <div className="flex flex-col h-full p-4">
        <div className="h-48 mb-4 overflow-hidden rounded-md">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        </div>
        <h3 className="font-medium mb-2 text-sm h-10 overflow-hidden line-clamp-2">
          {product.title}
        </h3>
        <div className="flex items-center mb-2">
          <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded">
            {product.rating.toFixed(1)}★
          </span>
        </div>
        <div className="flex flex-col gap-1 mt-auto">
          <div className="flex items-baseline gap-2">
            <p className="text-gray-900 font-bold text-lg">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-500 text-xs line-through">
              $
              {(product.price / (1 - product.discountPercentage / 100)).toFixed(
                2
              )}
            </p>
          </div>
          <p className="text-green-600 text-sm font-medium">
            {product.discountPercentage.toFixed(0)}% off
          </p>
        </div>
      </div>
      <button
        onClick={handleCartItems}
        className="w-full bg-[#ff9f00] cursor-pointer hover:bg-[#f39803] text-white py-3 px-4 font-medium transition-colors duration-300 ease-in-out"
      >
        Add to Cart
      </button>
    </div>
  );
}
