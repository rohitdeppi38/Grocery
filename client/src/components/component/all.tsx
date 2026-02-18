import { useEffect, useState } from 'react';
import { FiShoppingCart, FiHeart, FiStar, FiPlus, FiAlertCircle } from 'react-icons/fi';

type Item = {
  id: number;
  name: string;
  image: string;
  price: number;
  unit: string;
  rating: number;
  stock: number;
};

const All = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate a slight delay to show off the loading skeleton (optional)
    const fetchData = async () => {
      try {
        const res = await fetch('/all_item.json');
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error(err);
        setError("Could not load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- LOADING SKELETON COMPONENT ---
  const ProductSkeleton = () => (
    <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm animate-pulse">
      <div className="w-full h-40 bg-gray-100 rounded-xl mb-4"></div>
      <div className="flex justify-between items-start mb-2">
        <div className="h-4 w-2/3 bg-gray-100 rounded"></div>
        <div className="h-4 w-8 bg-gray-100 rounded"></div>
      </div>
      <div className="h-3 w-1/3 bg-gray-100 rounded mb-4"></div>
      <div className="flex justify-between items-center mt-4">
        <div className="h-6 w-16 bg-gray-100 rounded"></div>
        <div className="h-8 w-8 bg-gray-100 rounded-full"></div>
      </div>
    </div>
  );

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
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">All Products</h2>
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

// --- INDIVIDUAL CARD COMPONENT ---
const ProductCard = ({ item }: { item: Item }) => {
  const isOutOfStock = item.stock === 0;
  const isLowStock = item.stock > 0 && item.stock < 10;

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* 1. Image Area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        {/* Wishlist Button (Floating) */}
        <button className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-colors shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300">
          <FiHeart size={18} />
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
              flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 shadow-sm
              ${isOutOfStock 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white hover:scale-105 active:scale-95'}
            `}
            title="Add to Cart"
          >
            {isOutOfStock ? <FiXSmall /> : <FiPlus size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

// Simple helper for the X icon
const FiXSmall = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default All;