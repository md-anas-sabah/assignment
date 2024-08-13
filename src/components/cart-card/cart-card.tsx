import React from "react";

interface CartCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

const CartCard: React.FC<CartCardProps> = ({ title, price, image, amount }) => {
  return (
    <div className="flex flex-row rounded-lg gap-8 m-3">
      <div className="rounded-lg overflow-hidden object-cover flex-1 h-20 w-20">
        <img
          src={image}
          alt={`${title} product image`}
          className="h-20 w-20 text-gray-400 object-cover"
        />
      </div>
      <div className="flex flex-col w-[200px]">
        <h2 className="text-lg text-black font-extralight font-roboto truncate">
          {title}
        </h2>
        <h4 className="text-gray-400 font-roboto">{`₹${price}`}</h4>
        <p className="text-sm text-gray-500">Quantity: {amount}</p>
      </div>
    </div>
  );
};

export default CartCard;
