import React, { useEffect, useState } from 'react'
import axios from 'axios';

//type imported
import { type List } from '../types/itemList';
import ItemsGrid from '../components/component/itemsGrid';
import CartItem from '../components/component/cartItem';
import { useAppDispatch, useAppSelector } from '../app/hooks';


const Cart = () => {

    const data =useAppSelector(state=>state.cartItems.cartItems);

    //Api calling 
    useEffect(() => {
        console.log('data fetched',data);
    }
      ,[]);
    
  return (
    <div className='bg-white font-sans min-h-screen text-gray-800 relative'>
        {/**header section */}
        <header className='bg-gray-50 shadow-lg py-2 sticky'>
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
        <main className='bg-gray-50 sm:p-6 md:p-7 lg:p-8 shadow-lg mx-auto h-screen'>
            {/**cart section */}
            <div>
               {
                data.length >0 ? 
                 <div className='rounded-lg shadow-2xl max-w-7xl mx-auto'>
                    <ItemsGrid className={''}>
                        {data.map((item)=>(<CartItem key={item.id} item={item}/>))}
                    </ItemsGrid>
                </div>:
                <div className='text-center p-4'>
                    <p className='text-md font-medium text-blue-400'>Cart is Empty.....</p>
                </div>
               }
            </div>
        </main>

    </div>
  )
}

export default Cart