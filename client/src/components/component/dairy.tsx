import React, { useEffect, useState } from 'react';

type dairyStock = {
  id: number;
  name: string;
  image: string;
  category:string;
  price: number;
  unit: string;
  rating: number;
  stock: number;
};

const Tea: React.FC = () => {
  const [dairyStock, setdairyStock] = useState<dairyStock[]>([]);

  useEffect(() => {
    fetch('/all_item.json')
      .then(res => res.json())
      .then((data: dairyStock[]) => setdairyStock(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      gap-4
      sm:gap-5
      lg:gap-6
      p-4
      sm:p-6
    ">
      {dairyStock.map(dairy => (
        (dairy.category ==="dairy" ||dairy.category==="beverage")&&
        <div
          key={dairy.id}
          className="
            bg-white
            rounded-xl
            shadow-md
            hover:shadow-xl
            transition-all
            duration-300
            cursor-pointer
            flex
            flex-col
            overflow-hidden
          "
        >
          {/* Image */}
          <img
            src={dairy.image}
            alt={dairy.name}
            className="
              w-full
              h-40
              sm:h-44
              md:h-48
              object-cover
            "
          />

          {/* Content */}
          <div className="p-3 sm:p-4 flex flex-col gap-2">
            <p className="text-base sm:text-lg font-semibold text-green-800 truncate">
              {dairy.name}
            </p>

            <p className="text-sm sm:text-base text-gray-800">
              Rs.{dairy.price}
              <span className="text-xs sm:text-sm text-gray-500">
                /{dairy.unit}
              </span>
            </p>

            <div className="flex justify-between items-center text-xs sm:text-sm mt-1">
              <span className="bg-yellow-400 px-2 py-1 rounded-md">
                ⭐ {dairy.rating}
              </span>

              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md">
                Stock: {dairy.stock} kg
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tea;
