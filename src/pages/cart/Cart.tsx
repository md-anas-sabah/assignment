import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";
import CheckoutCard from "../../components/checkout-card/checkout-card";
import { closeCart } from "../../redux/toggleCartSlice";
import { PaymentModal } from "../../payment/PaymentModal";
import {
  decreaseItemAmount,
  increaseItemAmount,
  removeItem,
} from "../../redux/cartSlice";

interface CartItem {
  id: number;
  title: string;
  price: number;
  amount: number;
  // Add other properties that your item might have
}

interface RootState {
  cart: {
    items: CartItem[];
  };
}

const EmptyCart: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen pt-14">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center py-12 bg-white shadow-md rounded-sm p-4">
          <ShoppingCart size={64} className="text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-4">
            Add items to your cart to see them here!
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#fb641b] text-white px-8 py-3 rounded-sm font-medium hover:bg-[#f85c02] transition-colors duration-300"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

const Cart: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState<number>(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeCart());
  }, [dispatch]);

  const { items = [] } = useSelector((store: RootState) => store.cart) || {};

  const totalPrice = useMemo(() => {
    return items.reduce((total: number, item: CartItem) => {
      return total + (item.price || 0) * (item.amount || 1);
    }, 0);
  }, [items]);

  const totalItems = useMemo(() => {
    return items.reduce((total: number, item: CartItem) => {
      return total + (item.amount || 1);
    }, 0);
  }, [items]);

  const buyItems = () => {
    setPrice(totalPrice);
    setIsOpen(true);
  };

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="bg-gray-100 min-h-screen pt-14">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left column - Cart Items */}
          <div className="md:w-8/12">
            <div className="bg-white shadow-md rounded-sm p-4">
              <h2 className="text-xl font-semibold mb-4">
                My Cart ({totalItems})
              </h2>
              <div className="space-y-4">
                {items.map((item: CartItem) => (
                  <CheckoutCard
                    item={item}
                    key={item.id}
                    onIncrement={(id) => dispatch(increaseItemAmount(id))}
                    onDecrement={(id) => dispatch(decreaseItemAmount(id))}
                    onDelete={(id) => dispatch(removeItem(id))}
                  />
                ))}
              </div>
              <div className="mt-6 text-right">
                <button
                  onClick={buyItems}
                  className="bg-[#fb641b] text-white px-8 py-3 rounded-sm font-medium hover:bg-[#f85c02] transition-colors duration-300"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>

          {/* Right column - Price Details */}
          <div className="md:w-4/12">
            <div className="bg-white shadow-md rounded-sm p-4">
              <h2 className="text-xl font-semibold mb-4">Price Details</h2>
              <div className="space-y-3 pb-3 border-b">
                <div className="flex justify-between">
                  <span>Price ({totalItems} items)</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-green-600">FREE</span>
                </div>
              </div>
              <div className="flex justify-between py-3 text-lg font-semibold">
                <span>Total Amount</span>
                <span>₹{totalPrice}</span>
              </div>
              <p className="text-green-600 text-sm mt-2">
                You will save ₹XXX on this order
              </p>
            </div>
          </div>
        </div>
      </div>
      {isOpen && price > 0 && (
        <PaymentModal setIsOpen={setIsOpen} isOpen={isOpen} price={price} />
      )}
    </div>
  );
};

export default Cart;
