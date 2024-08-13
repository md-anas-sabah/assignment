import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../redux/toggleCartSlice";
import { ShoppingCart, Menu, X } from "lucide-react";
import SearchInput from "../ui/search-input";
import CartCard from "../cart-card/cart-card";

interface ItemData {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

type CartItem = ItemData;

interface RootState {
  cart: {
    items: CartItem[];
  };
  toggleCart: {
    isOpenCart: boolean;
  };
}

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((store: RootState) => store.cart.items);
  const isOpenCart = useSelector(
    (store: RootState) => store.toggleCart.isOpenCart
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggle = () => {
    dispatch(toggle());
  };

  const handleCheckout = () => {
    dispatch(toggle());
    navigate("/cart");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-[#2873F0] py-2 md:py-0 md:h-14 flex flex-col md:flex-row items-center justify-center gap-3 px-4 md:px-8">
      <div className="flex items-center justify-between w-full md:w-auto">
        <button className="md:hidden text-white" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      <div
        className={`${
          isMobileMenuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row items-center w-full md:w-auto mt-4 md:mt-0 space-y-4 md:space-y-0 md:space-x-4`}
      >
        <div className="w-full md:w-auto">
          <SearchInput onSearch={onSearch} />
        </div>
        <button className="bg-white text-[#2874f0] font-medium py-1 px-10 rounded-sm hover:bg-opacity-90 transition-all duration-200 ease-in-out shadow-md w-full md:w-auto">
          Login
        </button>
        <div className="relative">
          <div
            className="flex items-center cursor-pointer"
            onClick={handleToggle}
          >
            <ShoppingCart className="h-6 w-6 text-white" />
            <span className="ml-2 text-white font-medium">Cart</span>
            <div className="ml-1 w-6 h-6 flex items-center justify-center">
              {cartItems.length > 0 && (
                <span className="bg-[#ff6161] text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </div>
          </div>

          {isOpenCart && (
            <div className="absolute top-10 right-0 w-96 bg-white mt-1 flex flex-col shadow-2xl rounded-sm z-50">
              {cartItems.length === 0 ? (
                <div className="flex flex-col justify-center items-center p-6 h-40">
                  <p className="text-lg font-medium text-gray-700">
                    Your cart is empty!
                  </p>
                </div>
              ) : (
                <>
                  <div className="max-h-96 overflow-y-auto">
                    {cartItems.map((item: CartItem) => (
                      <CartCard key={item.id} {...item} />
                    ))}
                  </div>
                  <div className="bg-white p-3 border-t">
                    <Link onClick={handleCheckout} to="/cart">
                      <button className="w-full bg-[#fb641b] text-white py-2 px-4 rounded-sm font-medium hover:bg-opacity-90 transition-colors">
                        Go to Checkout
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
