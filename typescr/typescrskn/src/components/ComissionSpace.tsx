// src/components/CommissionCard.tsx
import React from "react";

export interface Commission {
  image: string;       // <-- добавили URL картинки
  title: string;
  description: string;
  price: string;
}

const CommissionCard: React.FC<{ commission: Commission }> = ({ commission }) => (
  <div className="border rounded-lg overflow-hidden shadow-sm">
    {/* обёртка фиксированной высоты + object-fit */}
    <div className="w-full h-48 bg-gray-100">
      <img
        src={commission.image}
        alt={commission.title}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-2">{commission.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{commission.description}</p>
      <div className="text-right font-medium">{commission.price}円</div>
    </div>
  </div>
);

export default CommissionCard;
