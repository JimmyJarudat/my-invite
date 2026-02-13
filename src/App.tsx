import { useState, useRef } from 'react';
import { FaMusic } from 'react-icons/fa';

// Import Components
import HeroSection from './components/Herosection';
import WelcomeSection from './components/Welcomesection';
import OurStorySection from './components/Ourstorysection';
import TimelineSection from './components/Timelinesection';
import PreWeddingGallery from './components/Preweddinggallery';
import LoveQuoteSection from './components/Lovequotesection';
import WeddingDetailsSection from './components/Weddingdetailssection';
import WishesSection from './components/WishesSection';
import Footer from './components/Footer';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.error('Error:', err));
      }
    }
  };

  // ฟังก์ชันสำหรับเปิดการ์ด + เล่นเพลง
  const handleOpenInvitation = () => {
    setShowInvitation(true);
    
    // เล่นเพลงทันทีที่กดปุ่ม
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            console.log('🎵 เพลงเริ่มเล่น');
          })
          .catch(err => {
            console.error('ไม่สามารถเล่นเพลงได้:', err);
          });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50">
      {/* Audio Element */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/music/wedding-song.mp3" type="audio/mpeg" />
      </audio>

      {/* Background Music Button */}
      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
        title={isPlaying ? 'หยุดเพลง' : 'เล่นเพลง'}
      >
        <FaMusic className={`text-pink-500 text-xl ${isPlaying ? 'animate-pulse' : ''}`} />
      </button>

      {/* Hero Section - หน้าแรก */}
      {!showInvitation ? (
        <HeroSection onOpenInvitation={handleOpenInvitation} />
      ) : (
        <>
          {/* Main Content */}
          <div>
            <WelcomeSection />
            <OurStorySection />
            <TimelineSection />
            <PreWeddingGallery />
            <LoveQuoteSection />
            <WeddingDetailsSection />
            <WishesSection />
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}

export default App;