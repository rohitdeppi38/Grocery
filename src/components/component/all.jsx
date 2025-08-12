import React, { useEffect, useState } from 'react';

const All = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('all_item.json')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setItems(data);
      })
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <div className='grid lg:grid-cols-4 items-center md:grid-cols-3 sm:grid-cols-2 p-6 gap-6'>
      {items.map((item) => (
        <div key={item.id} className='flex bg-white items-center rounded-xl cursor-pointer shadow-md hover:shadow-2xl flex-col transition-all duration-300 p-4 border'>
          <img src={item.image} alt={item.name} className='w-full h-50  object-cover rounded-lg mb-4' />
          <p className='text-xl font-semibold text-green-800 mb-4'>{item.name} </p>
          <p className='text-gray-800 mb-2'>Rs.{item.price} <span className='text-sm text-gray-500'>/{item.unit}</span></p>
          <div className='flex justify-between w-full text-sm text-gray-600'>
            <span className='bg-yellow-400 px-2 py-1 rounded-lg'>⭐{item.rating}</span>
            <span className='bg-green-100 text-green-800 px-2 py-1 rounded-lg'>Stock: {item.stock} kg</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default All;