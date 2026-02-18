import React, { useEffect, useState } from 'react';

type fruits ={
  id: number;
  name: string;
  image: string;
  category:string;
  price: number;
  unit: string;
  rating: number;
  stock: number;
}

const Fruits:React.FC = () => {
  const [fruits, setfruits] = useState<fruits[]>([]);

  useEffect(() => {
    fetch('all_item.json')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setfruits(data);
      })
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 p-6 gap-6'>
      {fruits.map((fruit) => (
        fruit.category==="fruit" &&
        <div key={fruit.id} className='flex bg-white items-center rounded-xl cursor-pointer shadow-md hover:shadow-2xl flex-col transition-all duration-300 p-4 border'>
          <img src={fruit.image} alt={fruit.name} className='w-full h-50 object-cover rounded-lg mb-4' />
          <p className='text-xl font-semibold text-green-800 mb-4'>{fruit.name} </p>
          <p className='text-gray-800 mb-2'>Rs.{fruit.price} <span className='text-sm text-gray-500'>/{fruit.unit}</span></p>
          <div className='flex justify-between w-full text-sm text-gray-600'>
            <span className='bg-yellow-400 px-2 py-1 rounded-lg'>⭐{fruit.rating}</span>
            <span className='bg-green-100 text-green-800 px-2 py-1 rounded-lg'>Stock: {fruit.stock} kg</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Fruits;