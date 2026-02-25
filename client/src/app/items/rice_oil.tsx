import React, { useEffect, useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

import { useAppDispatch, useAppSelector } from '../hooks';  

import type { List } from '../../types/itemList';
import { ProductSkeleton } from '../../components/component/skeleton';
import { ProductCard } from '../../components/component/itemStructure';

import { fetchProducts } from '../../features/storeItems/productsDetailsThunk';

const RiceOil:React.FC = () => {
 
  const dispatch = useAppDispatch();
  
  const {items,error,loading} = useAppSelector((state)=>{
    const filteredItems = state.productsDetails.items.filter((item)=>item.category.toLowerCase() === "grocery")
    return {
      items: filteredItems,
      error: state.productsDetails.error,
      loading: state.productsDetails.loading
    }
  })

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

   if (error) {
       return (
         <div className="flex flex-col items-center justify-center py-20 text-gray-500">
           <FiAlertCircle size={40} className="mb-2 text-red-400" />
           <p>{error}</p>
         </div>
       );
     }

   return (
    <div className='bg-[#F3F5F0]'>
        <div className="max-w-7xl bg-[#F3F5F0] mx-auto px-4 py-8">
        
        {/* Section Header */}
        <div className="flex items-end justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">All Rice & Oil</h2>
            <p className="text-gray-500 text-sm mt-1">Fresh from the farm to your kitchen</p>
          </div>
          <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            {items.length} Items
          </span>
        </div>
  
        {/* Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
            : items.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))
          }
        </div>
      </div>
      </div>
    );
};

export default RiceOil;