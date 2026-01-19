import { useEffect, useState } from 'react';

type Item = {
  id: number;
  name: string;
  image: string;
  price: number;
  unit: string;
  rating: number;
  stock: number;
};

const All = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetch('/all_item.json')
      .then(res => res.json())
      .then((data: Item[]) => setItems(data))
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
      {items.map(item => (
        <div
          key={item.id}
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
            src={item.image}
            alt={item.name}
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
              {item.name}
            </p>

            <p className="text-sm sm:text-base text-gray-800">
              Rs.{item.price}
              <span className="text-xs sm:text-sm text-gray-500">
                /{item.unit}
              </span>
            </p>

            <div className="flex justify-between items-center text-xs sm:text-sm mt-1">
              <span className="bg-yellow-400 px-2 py-1 rounded-md">
                ⭐ {item.rating}
              </span>

              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md">
                Stock: {item.stock} kg
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default All;
