import React, { useEffect, useState } from 'react';
import { ProductCard } from '../../components/component/itemStructure';
import { ProductSkeleton } from '../../components/component/skeleton';
import { FiAlertCircle } from 'react-icons/fi';

import type { List } from '../../types/itemList';

const Dairy: React.FC = () => {
  const [items, setItems] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/all_item.json')
      .then(res => res.json())
      .then((data: List[]) => {
        const dairyItems = data.filter(item => item.category === "dairy");
        setItems(dairyItems);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        setError("Failed to load dairy products.");
      });
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
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">All Dairy</h2>
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

export default Dairy;
