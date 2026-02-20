import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { GiDiamondRing } from 'react-icons/gi';

// Type definitions
interface ImageData {
  width: number;
  height: number;
  aspectRatio: number;
  orientation: 'landscape' | 'portrait' | 'square';
  loaded: boolean;
}

interface ImageDataMap {
  [key: number]: ImageData;
}

interface LoadingStates {
  [key: number]: boolean;
}

const PreWeddingGallery = () => {
  const [galleryRef, galleryInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [imageData, setImageData] = useState<ImageDataMap>({});
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({});

  // รูปภาพ Pre-Wedding
  const preweddingPhotos = [
    { id: 1, src: '/images/prewedding/1.jpg', alt: 'Pre-Wedding 1' },
    { id: 2, src: '/images/prewedding/2.jpg', alt: 'Pre-Wedding 2' },
    { id: 3, src: '/images/prewedding/33.jpg', alt: 'Pre-Wedding 3' },
    { id: 4, src: '/images/prewedding/4.jpg', alt: 'Pre-Wedding 4' },
    { id: 5, src: '/images/prewedding/5.jpg', alt: 'Pre-Wedding 5' },
    { id: 6, src: '/images/prewedding/6.jpg', alt: 'Pre-Wedding 6' },
    { id: 7, src: '/images/prewedding/7.jpg', alt: 'Pre-Wedding 7' },
    { id: 8, src: '/images/prewedding/8.jpg', alt: 'Pre-Wedding 8' },
    { id: 9, src: '/images/prewedding/10.jpg', alt: 'Pre-Wedding 9' },
    { id: 10, src: '/images/prewedding/9.jpg', alt: 'Pre-Wedding 10' },
  ];

  // โหลดรูปและตรวจจับ orientation
  useEffect(() => {
    const loadImages = async () => {
      const data: ImageDataMap = {};
      const loading: LoadingStates = {};

      for (const photo of preweddingPhotos) {
        loading[photo.id] = true;
        setLoadingStates({ ...loading });

        try {
          const img = new Image();

          await new Promise<void>((resolve) => {
            img.onload = () => {
              const aspectRatio = img.naturalWidth / img.naturalHeight;

              data[photo.id] = {
                width: img.naturalWidth,
                height: img.naturalHeight,
                aspectRatio: aspectRatio,
                orientation: aspectRatio > 1.2 ? 'landscape' :
                  aspectRatio < 0.8 ? 'portrait' : 'square',
                loaded: true
              };

              loading[photo.id] = false;
              resolve();
            };

            img.onerror = () => {
              data[photo.id] = {
                width: 0,
                height: 0,
                aspectRatio: 1,
                orientation: 'square',
                loaded: false
              };
              loading[photo.id] = false;
              resolve();
            };

            img.src = photo.src;
          });
        } catch (error) {
          data[photo.id] = {
            width: 0,
            height: 0,
            aspectRatio: 1,
            orientation: 'square',
            loaded: false
          };
          loading[photo.id] = false;
        }
      }

      setImageData(data);
      setLoadingStates(loading);
    };

    loadImages();
  }, []);

  // กำหนด grid span ตาม orientation อัตโนมัติ
  const getGridSpan = (photoId: number) => {
    const data = imageData[photoId];
    if (!data) return 'col-span-1 row-span-1';

    const index = preweddingPhotos.findIndex(p => p.id === photoId);
    const last = preweddingPhotos.length - 1;
    const secondLast = preweddingPhotos.length - 2;

    // รูปรองสุดท้าย = แนวตั้งสูง
    if (index === secondLast) {
      return 'col-span-1 row-span-2';
    }

    // รูปสุดท้าย = เต็มสูงกว้าง (ปิด layout)
    if (index === last) {
      return 'col-span-2 row-span-2';
    }

    // logic ปกติ
    if (data.orientation === 'landscape') {
      return 'col-span-2 row-span-1';
    }

    if (data.orientation === 'portrait') {
      return 'col-span-1 row-span-2';
    }

    return 'col-span-1 row-span-1';
  };

  // Keyboard navigation
  useEffect(() => {
    if (selectedImage === null) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setSelectedImage((prev) =>
          prev !== null && prev > 0 ? prev - 1 : preweddingPhotos.length - 1
        );
      } else if (e.key === 'ArrowRight') {
        setSelectedImage((prev) =>
          prev !== null && prev < preweddingPhotos.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage]);

  // ป้องกัน body scroll เมื่อเปิด modal
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50 via-rose-50 to-white"></div>
      
      {/* Radial Gradient Overlays */}
      <div className="absolute inset-0" style={{
        background: `radial-gradient(circle at 20% 30%, rgba(244, 114, 182, 0.1) 0%, transparent 50%)`
      }}></div>
      <div className="absolute inset-0" style={{
        background: `radial-gradient(circle at 80% 70%, rgba(244, 63, 94, 0.1) 0%, transparent 50%)`
      }}></div>

      {/* Floating Particles Background */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 bg-pink-300/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Floating Hearts */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`bg-heart-${i}`}
          className="absolute text-pink-300/20"
          style={{
            left: `${(i * 15) % 100}%`,
            top: `${20 + (i * 10) % 60}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.sin(i) * 30, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          <FaHeart className="text-3xl" />
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
       {/* Enhanced Header with Decorative Elements */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={galleryInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.8 }}
  className="text-center mb-20"
>
  {/* Top Decorative Hearts */}
  <motion.div
    initial={{ scale: 0 }}
    animate={galleryInView ? { scale: 1 } : {}}
    transition={{ duration: 0.6, delay: 0.3 }}
    className="flex justify-center items-center mb-6 gap-3"
  >
    <motion.div
      animate={{ y: [0, -10, 0], rotate: [0, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <FaHeart className="text-pink-300 text-4xl drop-shadow-[0_0_10px_rgba(244,114,182,0.3)]" />
    </motion.div>

    <motion.div
      animate={{ scale: [1, 1.15, 1], rotate: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
    >
      <GiDiamondRing className="text-rose-400 text-5xl drop-shadow-[0_0_15px_rgba(244,63,94,0.3)]" />
    </motion.div>

    <motion.div
      animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
    >
      <FaHeart className="text-pink-300 text-4xl drop-shadow-[0_0_10px_rgba(244,114,182,0.3)]" />
    </motion.div>
  </motion.div>

  {/* Title with Gradient and Glow */}
  <motion.h2
    initial={{ opacity: 0, scale: 0.9 }}
    animate={galleryInView ? { opacity: 1, scale: 1 } : {}}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="font-serif text-5xl md:text-6xl mb-4 relative inline-block"
    style={{
      background: 'linear-gradient(135deg, #f9a8d4 0%, #fda4af 50%, #f9a8d4 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      filter: 'drop-shadow(0 2px 15px rgba(244, 114, 182, 0.15))',
    }}
  >
    <motion.span
      animate={{
        textShadow: [
          '0 0 20px rgba(244, 114, 182, 0.15)',
          '0 0 30px rgba(244, 114, 182, 0.25)',
          '0 0 20px rgba(244, 114, 182, 0.15)',
        ]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      Pre-Wedding Gallery
    </motion.span>
  </motion.h2>

  {/* Animated Divider */}
  <motion.div
    initial={{ width: 0 }}
    animate={galleryInView ? { width: '200px' } : {}}
    transition={{ duration: 1, delay: 0.4 }}
    className="h-1 bg-gradient-to-r from-pink-200 via-rose-300 to-pink-200 mx-auto mb-6 rounded-full"
    style={{ boxShadow: '0 0 15px rgba(244, 114, 182, 0.2)' }}
  />

  {/* Subtitle */}
  <motion.p
    initial={{ opacity: 0 }}
    animate={galleryInView ? { opacity: 1 } : {}}
    transition={{ duration: 0.8, delay: 0.5 }}
    className="text-xl md:text-2xl text-gray-600 font-light tracking-wide"
    style={{
      fontFamily: "'Playfair Display', serif",
      textShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }}
  >
    <motion.span
      animate={{ opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      Our Pre-Wedding Moments ✨
    </motion.span>
  </motion.p>
</motion.div>

        {/* Enhanced Masonry Grid Layout */}
        <motion.div
          ref={galleryRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-[220px] md:auto-rows-[260px] lg:auto-rows-[300px]"
        >
          {preweddingPhotos.map((photo, index) => {
            const data = imageData[photo.id];
            const isLoading = loadingStates[photo.id];

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={galleryInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.08,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.02,
                  zIndex: 10,
                  transition: { duration: 0.3 }
                }}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group ${getGridSpan(photo.id)}`}
                onClick={() => setSelectedImage(index)}
                style={{
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* Loading placeholder with gradient */}
                {isLoading && (
                  <div className="absolute inset-0 bg-linear-to-br from-pink-200 via-rose-300 to-pink-200 flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <FaHeart className="text-white text-6xl drop-shadow-lg" />
                    </motion.div>
                  </div>
                )}

                {/* รูปภาพจริง */}
                {data?.loaded && (
                  <>
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                      loading="lazy"
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center'
                      }}
                    />
                    
                    {/* Enhanced Border Glow on Hover */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        boxShadow: 'inset 0 0 0 3px rgba(244, 114, 182, 0.6), 0 0 30px rgba(244, 114, 182, 0.4)'
                      }}
                    />
                  </>
                )}

                {/* Placeholder ถ้ารูปโหลดไม่ได้ */}
                {data?.loaded === false && (
                  <div className="w-full h-full bg-linear-to-br from-pink-200 via-rose-300 to-pink-200 flex items-center justify-center">
                    <FaHeart className="text-white text-6xl drop-shadow-lg" />
                  </div>
                )}

                {/* Enhanced Overlay with Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end pb-8">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    <FaHeart className="text-pink-400 text-3xl mb-3 mx-auto drop-shadow-[0_0_10px_rgba(244,114,182,0.8)]" />
                    <p className="text-white font-medium text-lg drop-shadow-lg tracking-wide">
                      คลิกเพื่อดูขนาดใหญ่
                    </p>
                  </motion.div>
                </div>

                {/* Decorative Corner Elements */}
                <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-white/40 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-white/40 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Loading indicator badge */}
                {isLoading && (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-pink-600 font-medium shadow-lg"
                  >
                    กำลังโหลด...
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

       {/* Enhanced Lightbox Modal */}
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
            style={{
              background: 'radial-gradient(circle, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.98) 100%)'
            }}
          >
            {/* Animated Background Pattern */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`modal-heart-${i}`}
                className="absolute text-pink-500/10 pointer-events-none"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.1, 0.2, 0.1],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              >
                <FaHeart className="text-5xl" />
              </motion.div>
            ))}

            {/* Close Button - ย้ายให้ปลอดภัยจาก notch + ใหญ่ขึ้นบน mobile */}
            <motion.button
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              whileHover={{ 
                scale: 1.1, 
                rotate: 90,
                boxShadow: '0 0 30px rgba(244, 114, 182, 0.6)'
              }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-4 left-4 sm:top-6 sm:right-6 text-white text-2xl z-30 bg-linear-to-br from-pink-500 to-rose-600 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm border-2 border-white/20"
              style={{ WebkitTapHighlightColor: 'transparent' }}
              aria-label="ปิด"
            >
              ✕
            </motion.button>

            {/* รูปภาพขนาดใหญ่ - แก้ให้กดพื้นหลังปิดได้ */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 150 }}
              className="relative flex items-center justify-center pointer-events-none"
              style={{ maxWidth: '90vw', maxHeight: '75vh' }}
            >
              {(() => {
                const currentPhoto = preweddingPhotos[selectedImage];
                const data = imageData[currentPhoto.id];

                if (!data?.loaded) {
                  return (
                    <div className="w-72 h-72 sm:w-96 sm:h-96 bg-linear-to-br from-pink-500 via-rose-500 to-pink-600 rounded-2xl flex flex-col items-center justify-center shadow-2xl pointer-events-auto">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.3, 1],
                          rotate: [0, 360]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <FaHeart className="text-white text-7xl sm:text-9xl mb-6 drop-shadow-2xl" />
                      </motion.div>
                      <p className="text-white text-xl sm:text-2xl font-light tracking-wider">กำลังโหลดรูปภาพ...</p>
                    </div>
                  );
                }

                return (
                  <div
                    className="relative flex items-center justify-center pointer-events-auto"
                  >
                    <motion.img
                      initial={{ filter: 'blur(20px)' }}
                      animate={{ filter: 'blur(0px)' }}
                      transition={{ duration: 0.5 }}
                      src={currentPhoto.src}
                      alt={currentPhoto.alt}
                      className="max-w-[90vw] max-h-[70vh] sm:max-h-[75vh] w-auto h-auto object-contain rounded-2xl"
                      style={{
                        aspectRatio: data.aspectRatio,
                        boxShadow: '0 25px 100px rgba(0, 0, 0, 0.5), 0 0 60px rgba(244, 114, 182, 0.3)'
                      }}
                      draggable={false}
                    />
                    
                    {/* Image Border Glow */}
                    <div 
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        boxShadow: 'inset 0 0 0 2px rgba(255, 255, 255, 0.1), 0 0 80px rgba(244, 114, 182, 0.2)'
                      }}
                    />
                  </div>
                );
              })()}
            </motion.div>

            {/* Navigation - ปรับให้ mobile ใช้ง่าย */}
            <div className="absolute bottom-[env(safe-area-inset-bottom,16px)] left-0 right-0 flex justify-center gap-3 sm:gap-4 z-10 px-4 pb-4">
              <motion.button
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 0 30px rgba(244, 114, 182, 0.6)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage((prev) =>
                    prev !== null && prev > 0 ? prev - 1 : preweddingPhotos.length - 1
                  );
                }}
                className="bg-linear-to-br from-pink-500 to-rose-600 backdrop-blur-sm text-white px-5 py-3 sm:px-8 sm:py-4 rounded-full font-medium shadow-2xl border-2 border-white/20 flex items-center gap-2"
              >
                <span className="text-xl sm:text-2xl">←</span>
                <span className="hidden sm:inline">ก่อนหน้า</span>
              </motion.button>

              {/* ปุ่มปิด ตรงกลาง - mobile เห็นชัด */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
                className="bg-white/20 backdrop-blur-sm text-white px-5 py-3 sm:px-6 sm:py-4 rounded-full font-medium shadow-2xl border-2 border-white/20 flex items-center gap-2 sm:hidden"
              >
                <span>✕ ปิด</span>
              </motion.button>

              <motion.button
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 0 30px rgba(244, 114, 182, 0.6)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage((prev) =>
                    prev !== null && prev < preweddingPhotos.length - 1 ? prev + 1 : 0
                  );
                }}
                className="bg-linear-to-br from-pink-500 to-rose-600 backdrop-blur-sm text-white px-5 py-3 sm:px-8 sm:py-4 rounded-full font-medium shadow-2xl border-2 border-white/20 flex items-center gap-2"
              >
                <span className="hidden sm:inline">ถัดไป</span>
                <span className="text-xl sm:text-2xl">→</span>
              </motion.button>
            </div>

            {/* Image Counter */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-sm sm:text-lg bg-linear-to-br from-pink-500 to-rose-600 backdrop-blur-sm px-5 py-2 sm:px-8 sm:py-3 rounded-full shadow-2xl border-2 border-white/20 font-medium z-20"
            >
              {selectedImage + 1} / {preweddingPhotos.length}
            </motion.div>

            {/* Keyboard Hint - desktop only */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1 }}
              className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-white/60 text-sm gap-6 hidden sm:flex"
            >
              <span>← → เปลี่ยนรูป</span>
              <span>ESC ปิด</span>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PreWeddingGallery;