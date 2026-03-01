
import { useEffect, useState } from 'react';
import { FiHeart, FiStar, FiPlus, FiX } from 'react-icons/fi';

import type { List } from '../../types/itemList';
import { useAppDispatch } from '../../app/hooks';
import { addLocalCart } from '../../features/userItems/cart/cartItems';
import { postCartItems } from '../../features/userItems/cart/cartItemsThunk';


// --- INDIVIDUAL CARD COMPONENT ---
export const ProductCard = ({ item }: { item: List }) => {
  const isOutOfStock = item.stock === 0;
  const isLowStock = item.stock > 0 && item.stock < 10;

  const dispatch = useAppDispatch();

  function handleApiClick(){
    dispatch(addLocalCart(item));
    dispatch(postCartItems(item));
  }

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* 1. Image Area */}
      <div className="relative aspect-[4/3] overflow-hidden cursor:pointer bg-gray-50">
        {/* Wishlist Button (Floating) */}
        <button title="add to wishlist" className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm cursor-pointer rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-colors shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300" onClick={handleApiClick}>
          <FiHeart size={18}/>
        </button>

        {/* Badges */}
        {isOutOfStock && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">
            SOLD OUT
          </div>
        )}
        {!isOutOfStock && isLowStock && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded">
            LOW STOCK
          </div>
        )}

        {/* Image */}
        <img
          src={item.image}
          alt={item.name}
          className={`
            w-full h-full object-cover transition-transform duration-500 group-hover:scale-110
            ${isOutOfStock ? 'grayscale opacity-60' : ''}
          `}
          loading="lazy"
        />
      </div>

      {/* 2. Content Area */}
      <div className="p-4 flex flex-col flex-1">
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-1">
          <FiStar className="text-yellow-400 fill-yellow-400 text-xs" />
          <span className="text-xs font-medium text-gray-500">{item.rating}</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-gray-800 group-hover:text-emerald-700 transition-colors line-clamp-1 mb-1">
          {item.name}
        </h3>

        {/* Unit & Stock Text */}
        <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
          <span>{item.unit}</span>
          {!isOutOfStock && (
            <span className={`${isLowStock ? 'text-orange-500' : 'text-emerald-600'} font-medium`}>
              {item.stock} in stock
            </span>
          )}
        </div>

        {/* Price & Action Row (Push to bottom) */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 line-through">₹{Math.round(item.price * 1.2)}</span>
            <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
          </div>

          <button 
            disabled={isOutOfStock}
            className={`
              flex items-center cursor-pointer justify-center w-10 h-10 rounded-full transition-all duration-200 shadow-sm
              ${isOutOfStock 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white hover:scale-105 active:scale-95'}
            `}
            title="Add to Cart"
          >
            {isOutOfStock ? <FiX /> : <FiPlus size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};
