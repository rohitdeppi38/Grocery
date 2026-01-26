import React, { useState } from 'react';
import { List } from '../../types/itemList';
import ItemsGrid from './itemsGrid';
import { FiBox } from 'react-icons/fi';

function CartItems({ items }: { items: List }): React.ReactElement {
  const [animate, setanimate] = useState(false);
  return (
    <section className='rounded-lg shadow-2xl'>
      <ItemsGrid className={''}>

        <div className='bg-white shadow-sm rounded-lg'>

          {/**cart items */}
          <div className='rounded-lg object-cover'>
            <img src={'cart item image'} alt={`${items.name}`} className='rounded-xs' />
          </div>

          {/**cart items details */}

          <div className='flex flex-col justify-between flex-wrap'>
            <div className='tracking-tight p-1.5 flex flex-col gap-2'>
              <span className='text-sm text-gray-500 uppercase'>{items.category}</span>
              <h1 className='text-lg font-bold text-gray-900'>{items.name}</h1>
              {items.stock >= 10 ?
                <span className='text-red-300 font-medium '>In stock</span>
                : <span className='text-green-300 font-medium'>Few left</span>}
            </div>
            {/**button of cart quantity */}
            <div className='rounded-2xl p-2 flex justify-between tracking-tight'>
              <button className='text-sm text-gray-700 font-medium'>-</button>
              <span className='text-md text-black font-medium'>{/**filling the user quintity */}</span>
              <button className='text-sm text-gray-700 font-medium'>+</button>
            </div>
          </div>

          {/**calculation = total */}
          <div className='flex flex-col items-center flex-wrap content-center'>
            <p className='font-medium'>{new Intl.NumberFormat('en-IN', {
              style: "currency",
              currency: "INR",
            }).format(items.price)}</p>
            <div className='p-1 bg-red-300'>
              <FiBox onClick={
                () => {
                  setanimate(false);
                  setTimeout(() => setanimate(true), 0);
                }
              }
                className={animate ? "slideup" : ""}
              />
              <span className='font-normal tracking-tight text-red-300'>Remove</span>
            </div>
          </div>

        </div>

      </ItemsGrid>
    </section>
  )
}

export default CartItems