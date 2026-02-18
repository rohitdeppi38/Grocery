import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiPlay, FiPlus } from 'react-icons/fi';

// --- TYPES ---
interface StoryItem {
  id: number;
  type: 'image' | 'video';
  url: string;
  caption?: string;
  duration: number; // in seconds
}

interface StoryGroup {
  id: number;
  username: string;
  avatar: string;
  isSeen: boolean;
  items: StoryItem[];
}

// --- MOCK DATA ---
const STORIES_DATA: StoryGroup[] = [
  {
    id: 1,
    username: "Ramu Kaka's Farm",
    avatar: "https://i.pravatar.cc/150?u=farmer1",
    isSeen: false,
    items: [
      { id: 101, type: 'image', url: 'https://images.unsplash.com/photo-1595855709940-a8d431631a5c?q=80&w=800&auto=format&fit=crop', caption: "Fresh Spinach Harvested at 6 AM! 🌿", duration: 5 },
      { id: 102, type: 'image', url: 'https://images.unsplash.com/photo-1615485500704-8e99099d9d97?q=80&w=800&auto=format&fit=crop', caption: "Washing them now... ready for delivery by 9 AM.", duration: 5 }
    ]
  },
  {
    id: 2,
    username: "Today's Special",
    avatar: "https://cdn-icons-png.flaticon.com/512/766/766023.png",
    isSeen: false,
    items: [
      { id: 201, type: 'image', url: 'https://images.unsplash.com/photo-1518843875459-f73f1db1516a?q=80&w=800&auto=format&fit=crop', caption: "Flash Sale on Red Bell Peppers! 🌶️ 50% OFF", duration: 5 }
    ]
  },
  {
    id: 3,
    username: "Chef's Corner",
    avatar: "https://i.pravatar.cc/150?u=chef",
    isSeen: true,
    items: [
      { id: 301, type: 'image', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop', caption: "Recipe: Healthy Green Salad 🥗", duration: 5 }
    ]
  }
];

const FarmStories: React.FC = () => {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const openStory = (index: number) => {
    setActiveStoryIndex(index);
    setCurrentSlideIndex(0);
  };

  const closeStory = () => {
    setActiveStoryIndex(null);
    setCurrentSlideIndex(0);
  };

  // --- RENDERING ---
  return (
    <section className="w-full py-3 bg-[#F3F5F0] border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
           <span>📹</span> Live from the Farm
        </h3>
        
        {/* Horizontal Scroll Container */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          
          {/* My Story (Add Button) */}
          <div className="flex flex-col items-center gap-2 cursor-pointer min-w-[70px]">
             <div className="relative w-[70px] h-[70px]">
                <img src="https://i.pravatar.cc/150?u=me" className="w-full h-full rounded-full object-cover border-2 border-gray-200 p-0.5" alt="Me" />
                <div className="absolute bottom-0 right-0 bg-emerald-600 text-white rounded-full p-1 border-2 border-white">
                   <FiPlus size={14} />
                </div>
             </div>
             <span className="text-xs font-medium text-gray-500 truncate w-full text-center">Add Story</span>
          </div>

          {/* Story Heads */}
          {STORIES_DATA.map((story, index) => (
            <motion.div 
              key={story.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => openStory(index)}
              className="flex flex-col items-center gap-2 cursor-pointer min-w-[70px]"
            >
              <div className={`
                w-[74px] h-[74px] rounded-full p-[2px] 
                ${story.isSeen 
                  ? 'bg-gray-200' 
                  : 'bg-gradient-to-tr from-yellow-400 via-orange-500 to-emerald-600'}
              `}>
                <div className="w-full h-full bg-white rounded-full p-[2px]">
                   <img 
                     src={story.avatar} 
                     alt={story.username} 
                     className="w-full h-full rounded-full object-cover" 
                   />
                </div>
              </div>
              <span className="text-xs font-medium text-gray-700 truncate w-20 text-center">
                {story.username}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- FULL SCREEN VIEWER --- */}
      <AnimatePresence>
        {activeStoryIndex !== null && (
          <StoryViewer 
            storyGroup={STORIES_DATA[activeStoryIndex]} 
            slideIndex={currentSlideIndex}
            setSlideIndex={setCurrentSlideIndex}
            onClose={closeStory}
            onNextGroup={() => {
               if (activeStoryIndex < STORIES_DATA.length - 1) {
                  openStory(activeStoryIndex + 1);
               } else {
                  closeStory();
               }
            }}
            onPrevGroup={() => {
               if (activeStoryIndex > 0) {
                  openStory(activeStoryIndex - 1);
               } else {
                  closeStory();
               }
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

// --- SUB-COMPONENT: STORY VIEWER ---
interface StoryViewerProps {
  storyGroup: StoryGroup;
  slideIndex: number;
  setSlideIndex: (i: number) => void;
  onClose: () => void;
  onNextGroup: () => void;
  onPrevGroup: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ 
  storyGroup, slideIndex, setSlideIndex, onClose, onNextGroup, onPrevGroup 
}) => {
  const currentItem = storyGroup.items[slideIndex];

  // Auto-advance logic
  useEffect(() => {
    const timer = setTimeout(() => {
      if (slideIndex < storyGroup.items.length - 1) {
        setSlideIndex(slideIndex + 1);
      } else {
        onNextGroup();
      }
    }, currentItem.duration * 1000);

    return () => clearTimeout(timer);
  }, [slideIndex, storyGroup, onNextGroup, currentItem.duration, setSlideIndex]);

  // Tap navigation
  const handleTap = (e: React.MouseEvent) => {
    const width = window.innerWidth;
    const x = e.clientX;
    if (x < width / 3) {
      // Left Tap
      if (slideIndex > 0) setSlideIndex(slideIndex - 1);
      else onPrevGroup();
    } else {
      // Right Tap (or middle)
      if (slideIndex < storyGroup.items.length - 1) setSlideIndex(slideIndex + 1);
      else onNextGroup();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center md:bg-gray-900/90 md:backdrop-blur-sm"
    >
      {/* Mobile-like Container */}
      <div className="relative w-full h-full md:w-[400px] md:h-[85vh] bg-black md:rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Progress Bars */}
        <div className="absolute top-4 left-0 w-full px-2 flex gap-1 z-20">
          {storyGroup.items.map((item, idx) => (
            <div key={item.id} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: idx < slideIndex ? "100%" : "0%" }}
                 animate={{ width: idx === slideIndex ? "100%" : (idx < slideIndex ? "100%" : "0%") }}
                 transition={{ duration: idx === slideIndex ? item.duration : 0, ease: "linear" }}
                 className="h-full bg-white"
               />
            </div>
          ))}
        </div>

        {/* Header (User Info) */}
        <div className="absolute top-8 left-4 flex items-center gap-3 z-20">
           <img src={storyGroup.avatar} alt="u" className="w-8 h-8 rounded-full border border-white" />
           <span className="text-white font-bold text-sm drop-shadow-md">{storyGroup.username}</span>
           <span className="text-gray-300 text-xs font-medium">2h</span>
        </div>

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-8 right-4 z-30 text-white p-2">
           <FiX size={24} />
        </button>

        {/* Content Layer */}
        <div className="w-full h-full relative" onClick={handleTap}>
           <img 
             src={currentItem.url} 
             alt="Story" 
             className="w-full h-full object-cover" 
           />
           
           {/* Caption Overlay */}
           {currentItem.caption && (
             <div className="absolute bottom-20 left-0 w-full text-center px-6">
                <p className="inline-block bg-black/50 backdrop-blur-md text-white text-lg font-medium px-4 py-2 rounded-xl">
                  {currentItem.caption}
                </p>
             </div>
           )}

           {/* "Reply" Input Area (Decorative) */}
           <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent flex gap-3 z-20" onClick={(e) => e.stopPropagation()}>
              <input 
                type="text" 
                placeholder="Send Message..." 
                className="flex-1 bg-transparent border border-white/40 rounded-full px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:border-white"
              />
              <button className="text-white p-2">
                 <FiHeart size={28} />
              </button>
           </div>
        </div>

      </div>
    </motion.div>
  );
};

// Add heart icon import manually if missing
import { FiHeart } from 'react-icons/fi';

export default FarmStories;