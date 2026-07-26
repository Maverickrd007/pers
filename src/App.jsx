import React, { useRef, useState } from 'react';
import Starfield from './components/Starfield';
import LandingScreen from './components/LandingScreen';
import ConstellationSection from './components/ConstellationSection';
import MuseumSection from './components/MuseumSection';
import FinalSection from './components/FinalSection';

function App() {
  const constellationRef = useRef(null);
  const [exploredCards, setExploredCards] = useState([]);

  const handleBegin = () => {
    constellationRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCardExplored = (id) => {
    if (id !== 7 && !exploredCards.includes(id)) {
      setExploredCards((prev) => [...prev, id]);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#050816] text-[#f4f3ec] font-sans-inter overflow-hidden selection:bg-[#f4f3ec]/20 selection:text-white">
      {/* Background Starfield */}
      <Starfield />

      {/* Landing Hero Screen */}
      <LandingScreen onBegin={handleBegin} />

      {/* Section 1: Constellation */}
      <div ref={constellationRef}>
        <ConstellationSection
          exploredCards={exploredCards}
          onCardExplored={handleCardExplored}
        />
      </div>

      {/* Divider */}
      <div className="w-full flex justify-center py-8 z-10 relative">
        <div className="w-[100px] h-[1px] bg-gradient-to-r from-transparent via-[#f4f3ec]/10 to-transparent" />
      </div>

      {/* Section 2: Museum Horizontal Gallery */}
      <MuseumSection />

      {/* Divider */}
      <div className="w-full flex justify-center py-8 z-10 relative">
        <div className="w-[100px] h-[1px] bg-gradient-to-r from-transparent via-[#f4f3ec]/10 to-transparent" />
      </div>

      {/* Final Section */}
      <FinalSection />
      
      {/* Small subtle brand signature footer */}
      <footer className="w-full text-center py-8 z-10 relative border-t border-[#f4f3ec]/5 bg-[#050816]/30 backdrop-blur-sm">
        <span className="text-[10px] tracking-[0.35em] uppercase text-[#f4f3ec]/25 font-sans-inter">
          The Museum of Unsaid Things • &copy; {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
}

export default App;
