import React, { useEffect, useState } from 'react';

const Vegetables = () => {
  const [veges, setveges] = useState([]);

  useEffect(() => {
    fetch('veges.json')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setveges(data);
      })
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 p-6 gap-6'>
      {veges.map((veg) => (
        <div key={veg.id} className='flex bg-white items-center rounded-xl cursor-pointer shadow-md hover:shadow-2xl flex-col transition-all duration-300 p-4 border'>
          <img src={veg.image} alt={veg.name} className='w-full h-50 object-cover rounded-lg mb-4' />
          <p className='text-xl font-semibold text-green-800 mb-4'>{veg.name} </p>
          <p className='text-gray-800 mb-2'>Rs.{veg.price} <span className='text-sm text-gray-500'>/{veg.unit}</span></p>
          <div className='flex justify-between w-full text-sm text-gray-600'>
            <span className='bg-yellow-400 px-2 py-1 rounded-lg'>⭐{veg.rating}</span>
            <span className='bg-green-100 text-green-800 px-2 py-1 rounded-lg'>Stock: {veg.stock} kg</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Vegetables;