import { useEffect, useState } from 'react';
import WishListGrid from '../components/component/wishlistGrid';
import axios from 'axios';

import {type List} from "../types/itemList"

function WishList() {
  const [wishData, setWishData] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a fetch delay for effect, replace URL with real endpoint
    axios.get("YOUR_API_URL")
      .then((res) => {
        setWishData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error is ", err);
        setLoading(false);
      });
  }, []);

  const handleRemove = (id: number) => {
    setWishData(prev => prev.filter(item => item.id !== id));
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
            <WishListGrid items={wishData} onRemove={handleRemove} />
        )}
      </main>
    </div>
  );
}

export default WishList;