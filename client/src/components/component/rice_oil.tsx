import React, { useEffect, useState } from 'react';

type riceOilStructure ={
  id: number;
  name: string;
  image: string;
  category:string;
  price: number;
  unit: string;
  rating: number;
  stock: number;
}

const RiceOil:React.FC = () => {
  const [riceOil, setRiceOil] = useState<riceOilStructure[]>([]);

  useEffect(() => {
   ( async ()=>{
      const data:riceOilStructure[] = await (await fetch('all_item.json')).json();
      setRiceOil(data)})();
    }, []);

  return (
    <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 p-6 gap-6'>
      {riceOil.map((items) => (
        (items.category==="Grocery"||items.category==="grain"||items.category==="Flour" )&&
        <div key={items.id} className='flex bg-white items-center rounded-xl cursor-pointer shadow-md hover:shadow-2xl flex-col transition-all duration-300 p-4 border'>
          <img src={items.image} alt={items.name} className='w-full h-50 object-cover rounded-lg mb-4' />
          <p className='text-xl font-semibold text-green-800 mb-4'>{items.name} </p>
          <p className='text-gray-800 mb-2'>Rs.{items.price} <span className='text-sm text-gray-500'>/{items.unit}</span></p>
          <div className='flex justify-between w-full text-sm text-gray-600'>
            <span className='bg-yellow-400 px-2 py-1 rounded-lg'>⭐{items.rating}</span>
            <span className='bg-green-100 text-green-800 px-2 py-1 rounded-lg'>Stock: {items.stock} kg</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RiceOil;