import React, { useState, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Search, ArrowRight } from 'lucide-react';

// --- Types ---
interface MousePos { x: number; y: number; }
interface StatBoxProps { label: string; value: string; icon: ReactNode; delay?: number; }
interface ParallaxItemProps { x: number; y: number; children: ReactNode; className?: string; }
interface FloatingCardProps { img: string; title: string; price: string; color?: string; }

const Hero: React.FC = () => {
  // --- Mouse Parallax Logic ---
  const [mousePosition, setMousePosition] = useState<MousePos>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const calculateMovement = (factor: number): MousePos => {
    const x = (mousePosition.x - window.innerWidth / 2) * factor;
    const y = (mousePosition.y - window.innerHeight / 2) * factor;
    return { x, y };
  };

  return (
    // FIX 1: Using 'block' instead of 'flex' to stop vertical centering.
    // Added 'pt-32 lg:pt-40' to control the top gap precisely.
    <div className="relative w-full min-h-screen bg-[#F3F5F0] overflow-hidden block pt-8 font-sans">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#22c55e 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* Background "FRESH" Text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 1.5 }}
        // FIX 2: Moved text up to 'top-40' to match the new content position
        className="absolute top-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap z-0 select-none"
      >
        <h1 className="text-[10rem] lg:text-[20rem] font-black text-green-900 leading-none tracking-tighter">
          FRESH
        </h1>
      </motion.div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* --- LEFT COLUMN: Typography & Actions --- */}
        <div className="space-y-8">
          
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-2"
          >
            <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold tracking-wide uppercase border border-orange-200">
              #1 Grocery App in India
            </span>
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                </div>
              ))}
            </div>
            <span className="text-sm text-gray-500 font-medium pl-2">12k+ Reviews</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-6xl lg:text-8xl font-black text-gray-900 leading-[0.9] tracking-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Don't Panic, <br />
            Go <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">Organic.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-xl text-gray-600 max-w-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            SabzziBazzar brings the farm to your fingertip.
            <span className="font-bold text-gray-900"> Artificial Intelligence</span> checks quality,
            humans deliver with love.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="relative max-w-md group"
            initial={{ width: "80%" }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 border-2 border-gray-100 rounded-2xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all shadow-xl shadow-green-100/50"
              placeholder="Search 'Shimla Mirch'..."
            />
            <button className="absolute inset-y-2 right-2 px-6 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center gap-2">
              Go <ArrowRight size={16} />
            </button>
          </motion.div>

          {/* Stats Row */}
          <div className="flex gap-8 pt-4">
            <StatBox label="Delivery" value="15 Min" icon="⚡" delay={0.6} />
            <StatBox label="Farmers" value="850+" icon="👨‍🌾" delay={0.7} />
            <StatBox label="Freshness" value="100%" icon="🥗" delay={0.8} />
          </div>
        </div>

        {/* --- RIGHT COLUMN: 3D Composition & Parallax --- */}
        <div className="relative h-[600px] flex items-center justify-center perspective-1000 mt-10 lg:mt-0">

          {/* Spinning Circle */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute w-[500px] h-[500px] border border-dashed border-green-300 rounded-full opacity-50"
          />
          <div className="absolute w-[400px] h-[400px] bg-green-500/10 rounded-full blur-3xl" />

          {/* Phone Mockup */}
          <motion.div
            className="relative z-20 w-72 h-[500px] bg-gray-900 rounded-[3rem] border-8 border-gray-900 shadow-2xl overflow-hidden"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800"
              alt="App Screen"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black/90 to-transparent p-6 flex flex-col justify-end">
              <p className="text-white font-bold text-xl">Order Arriving...</p>
              <div className="w-full bg-gray-700 h-1 rounded-full mt-2 overflow-hidden">
                <motion.div
                  className="bg-green-500 h-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "70%" }}
                  transition={{ duration: 2, delay: 1 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Floating Parallax Elements */}
          <ParallaxItem x={calculateMovement(-0.05).x} y={calculateMovement(-0.05).y} className="absolute -left-12 top-20 z-30">
            <FloatingCard img="https://cdn-icons-png.flaticon.com/512/1202/1202125.png" title="Tomato" price="₹40/kg" color="bg-red-50" />
          </ParallaxItem>

          <ParallaxItem x={calculateMovement(0.08).x} y={calculateMovement(0.08).y} className="absolute -right-8 top-40 z-10">
            <FloatingCard img="https://cdn-icons-png.flaticon.com/512/2346/2346967.png" title="Broccoli" price="₹120/kg" color="bg-green-50" />
          </ParallaxItem>

          <ParallaxItem x={calculateMovement(-0.03).x} y={calculateMovement(-0.03).y} className="absolute bottom-20 -right-4 z-40">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="bg-yellow-400 text-black font-black p-4 rounded-xl shadow-lg border-b-4 border-yellow-600 rotate-[-10deg]"
            >
              <span className="text-xs uppercase tracking-wide">First Order</span>
              <div className="text-3xl">50% OFF</div>
            </motion.div>
          </ParallaxItem>

        </div>
      </div>
    </div>
  );
};

// --- Sub-Components ---

const StatBox: React.FC<StatBoxProps> = ({ label, value, icon, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="flex flex-col"
  >
    <div className="text-3xl mb-1">{icon}</div>
    <div className="font-bold text-gray-900 text-lg">{value}</div>
    <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{label}</div>
  </motion.div>
);

const ParallaxItem: React.FC<ParallaxItemProps> = ({ x, y, children, className = "" }) => (
  <motion.div
    animate={{ x, y }}
    transition={{ type: 'spring', stiffness: 50, damping: 20 }}
    className={className}
  >
    {children}
  </motion.div>
);

const FloatingCard: React.FC<FloatingCardProps> = ({ img, title, price, color = "bg-white" }) => (
  <div className={`p-3 rounded-2xl shadow-xl backdrop-blur-md bg-white/80 border border-white/50 flex items-center gap-3 w-48 hover:scale-105 transition-transform duration-300`}>
    <div className={`p-2 rounded-lg ${color}`}>
      <img src={img} alt={title} className="w-8 h-8 object-contain" />
    </div>
    <div>
      <h4 className="font-bold text-gray-800 text-sm">{title}</h4>
      <p className="text-green-600 font-bold text-xs">{price}</p>
    </div>
    <div className="ml-auto bg-gray-900 text-white p-1.5 rounded-full cursor-pointer hover:bg-green-600 transition-colors">
      <ShoppingBag size={12} />
    </div>
  </div>
);

export default Hero;