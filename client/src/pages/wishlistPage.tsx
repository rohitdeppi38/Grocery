import { useEffect, useState } from 'react';
import axios from 'axios';

import {type List} from "../types/itemList"
import ItemsGrid from '../components/component/itemsGrid';
import WishItems from '../components/component/WishItems.tsx';
import { useAppSelector } from '../app/hooks';

function WishList() {
  const [loading, setLoading] = useState(true);

  const wishData = useAppSelector(state=>state.wishItems.wishItems);

  useEffect(() => {
    // useSelector call hoga idhar 
  }, []);

  const handleRemove = (id: string) => {
   //dispatch use krna hai yaha parr
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Header Section */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-extrabold text-indigo-600 tracking-tight">
              My Wishlist
            </h1>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
              {wishData.length} Items
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        ) : (
            // Passing the data down to the grid
            <ItemsGrid className=''>
               {wishData.map((items)=>(<WishItems key={items.id} items={items}/>))}
            </ItemsGrid>
        )}
      </main>
    </div>
  );
}

export default WishList;