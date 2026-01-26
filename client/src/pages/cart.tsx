import React, { useEffect, useState } from 'react'
import axios from 'axios';

//type imported
import { type List } from '../types/itemList';
import ItemsGrid from '../components/component/itemsGrid';


const Cart = () => {

    const [data, setdata] = useState<List[] | null>(null);

    //Api calling 
    useEffect(() => {
      axios.get('My Api')
      .then((res)=>setdata(res.data))
      .catch(error=>console.log("Error is this ",error));
    }, [])
    

  return (
    <div className='bg-white font-sans min-h-screen text-gray-800'>
        {/**header section */}
        <header className='bg-gray-50 shadow-sm sticky top-0'>
            <div className='max-w-7xl px-4 sm:p-6 lg:p-8 flex justify-between items-center mx-auto '>
                <h1 className='text-indigo-400 font-extrabold text-3xl tracking-tight'>
                    MY Cart
                </h1>
                <span className='text-black font-bold bg-gray-200 rounded-full text-center text-xs py-1 px-4'>
                    8 items
                </span>
            </div>
        </header>
        
        {/**container section or main section */}
        <main className='bg-gray-50 sm:p-6 md:p-7 lg:p-8 shadow-lg max-w-7xl mx-auto h-screen'>
            {/**cart section */}
            <div className='flex'>
                <div className=''>
                    <ItemsGrid items={data}/>
                </div>
            </div>
        </main>

    </div>
  )
}

export default Cart