import React from "react";
import { Trash, Plus, Minus } from "lucide-react";

interface CartItem {
  id: number;
  title: string;
  price: number;
  amount: number;
  image?: string;
}

interface CheckoutCardProps {
  item: CartItem;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onDelete: (id: number) => void;
}

const CheckoutCard: React.FC<CheckoutCardProps> = ({
  item,
  onIncrement,
  onDecrement,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div className="flex items-center">
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className="w-16 h-16 object-cover mr-4"
          />
        )}
        <div>
          <h3 className="font-semibold">{item.title}</h3>
          <div className="flex items-center mt-2">
            <button
              onClick={() => onDecrement(item.id)}
              className="p-1 bg-gray-200 rounded-full"
            >
              <Minus size={16} />
            </button>
            <span className="mx-2">{item.amount}</span>
            <button
              onClick={() => onIncrement(item.id)}
              className="p-1 bg-gray-200 rounded-full"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="text-right flex flex-col items-end">
        <p className="font-semibold mb-2">
          ${(item.price * item.amount).toFixed(2)}
        </p>
        <button
          onClick={() => onDelete(item.id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash size={20} />
        </button>
      </div>
    </div>
  );
};

export default CheckoutCard;
