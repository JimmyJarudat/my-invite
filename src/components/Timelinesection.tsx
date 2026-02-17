import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaHeart } from 'react-icons/fa';
import { useState } from 'react';

const TimelineSection = () => {
  const [timelineRef, timelineInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const timelineData = [
    {
      emoji: '💕',
      title: 'วันที่เจอกัน',
      date: '14 ก.พ. 2564',
      description:
        'เริ่มต้นจากการทักทายธรรมดาๆ  ที่ไม่คิดว่าจะกลายเป็นจุดเริ่มต้นของความรักที่สวยงาม',
      image: '/images/timeline/timeline-0.jpg',
      align: 'left' as const,
    },
    {
      emoji: '💑',
      title: 'เป็นแฟนกัน',
      date: '15 พ.ค. 2562',
      description:
        'หลังจากคบหากันมาสักระยะ เราตัดสินใจที่จะเดินหน้าไปด้วยกันอย่างจริงจัง และนั่นคือจุดเริ่มต้นที่สวยงามของเรา',
      image: '/images/timeline/timeline-2.jpg',
      align: 'right' as const,
    },
    {
      emoji: '✈️',
      title: 'ทริปแรกด้วยกัน',
      date: '15 ส.ค. 2563',
      description:
        'เที่ยวทะเลด้วยกันครั้งแรก เปิดประสบการณ์ใหม่ๆ ที่มีกันและกัน ยิ่งทำให้รู้ว่าเราเข้ากันได้ดีมากแค่ไหน',
      image: '/images/timeline/timeline-3.jpg',
      align: 'left' as const,
    },
    // {
    //   emoji: '💒',
    //   title: 'หมั้นกัน',
    //   date: '14 ก.ค. 2567',
    //   description:
    //     'พิธีหมั้นอบอุ่นท่ามกลางครอบครัวและเพื่อนสนิท ก้าวเข้าสู่ประตูบานใหม่ของชีวิตคู่อย่างเป็นทางการ',
    //   image: '/images/timeline/timeline-6.jpg',
    //   align: 'right' as const,
    // },
    {
      emoji: '🎊',
      title: 'Pre-Wedding',
      date: '30 ม.ค. 2569',
      description:
        'ถ่ายรูป Pre-Wedding ท่ามกลางบรรยากาศโรแมนติก เก็บทุกช่วงเวลาแห่งความรักไว้ในภาพถ่ายที่งดงาม',
      image: '/images/timeline/timeline-7.jpg',
      align: 'left' as const,
    },
    {
      emoji: '💒',
      title: 'วันแต่งงาน',
      date: '1 มี.ค. 2569',
      description:
        'วันที่เราจะเดินเข้าสู่ประตูแห่งความสุข ',
      image: '/images/timeline/timeline-8.jpg',
      align: 'right' as const,
      isHighlight: true,
    },
  ];

  return (
    <section
      ref={timelineRef}
      className="py-20 md:py-24 px-4 md:px-6 bg-gradient-to-b from-white via-pink-50/50 to-white relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(244,114,182,0.3) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-40 right-10 w-80 h-80 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(251,113,133,0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={timelineInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto relative z-10"
      >
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={timelineInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="text-pink-400 text-sm tracking-[0.3em] uppercase font-medium">
              Our Love Story
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl md:text-5xl text-gray-800 mt-3 mb-6"
          >
            Timeline แห่งรัก
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            animate={timelineInView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto rounded-full"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={timelineInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-500 mt-4 text-base md:text-lg"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            ทุกช่วงเวลาที่เราผ่านมาด้วยกัน ล้วนมีความหมาย
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line — Desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px]">
            <motion.div
              initial={{ height: 0 }}
              animate={timelineInView ? { height: '100%' } : {}}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="w-full bg-gradient-to-b from-pink-300 via-rose-400 to-pink-300"
            />
          </div>

          {/* Vertical Line — Mobile */}
          <div className="md:hidden absolute left-[18px] top-0 bottom-0 w-[2px]">
            <motion.div
              initial={{ height: 0 }}
              animate={timelineInView ? { height: '100%' } : {}}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="w-full bg-gradient-to-b from-pink-300 via-rose-400 to-pink-300"
            />
          </div>

          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={timelineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * (index + 1) }}
              className="relative mb-10 md:mb-16 last:mb-0"
            >
              {/* ===== Desktop Layout ===== */}
              <div className="hidden md:block">
                <div
                  className={`flex items-start ${
                    item.align === 'left' ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div className={`w-[45%] ${item.align === 'right' ? 'ml-auto' : ''}`}>
                    <motion.div
                      whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                      transition={{ duration: 0.3 }}
                      className={`bg-white rounded-2xl overflow-hidden shadow-lg border border-pink-100/50 ${
                        item.isHighlight ? 'ring-2 ring-pink-400 ring-offset-2' : ''
                      }`}
                    >
                      {/* Image — Desktop: aspect-ratio based */}
                      <TimelineImage
                        src={item.image}
                        alt={item.title}
                        emoji={item.emoji}
                        date={item.date}
                        isHighlight={item.isHighlight}
                        mobile={false}
                      />

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-11 h-11 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                            <span className="text-xl">{item.emoji}</span>
                          </div>
                          <h4
                            className={`font-semibold text-lg ${
                              item.isHighlight ? 'text-pink-600' : 'text-gray-800'
                            }`}
                          >
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed pl-14">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Center Dot — Desktop */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={timelineInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 * (index + 1) + 0.2 }}
                  className="absolute left-1/2 top-24 transform -translate-x-1/2 z-10"
                >
                  <div
                    className={`w-5 h-5 rounded-full border-4 border-white shadow-md ${
                      item.isHighlight ? 'bg-rose-500' : 'bg-pink-400'
                    }`}
                  />
                  {item.isHighlight && (
                    <motion.div
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-rose-400"
                    />
                  )}
                </motion.div>
              </div>

              {/* ===== Mobile Layout ===== */}
              <div className="md:hidden pl-10">
                <motion.div
                  className={`bg-white rounded-2xl overflow-hidden shadow-lg border border-pink-100/50 ${
                    item.isHighlight ? 'ring-2 ring-pink-400 ring-offset-2' : ''
                  }`}
                >
                  {/* Image — Mobile: smart aspect ratio */}
                  <TimelineImage
                    src={item.image}
                    alt={item.title}
                    emoji={item.emoji}
                    date={item.date}
                    isHighlight={item.isHighlight}
                    mobile={true}
                  />

                  {/* Content — Mobile */}
                  <div className="p-4">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-9 h-9 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-base">{item.emoji}</span>
                      </div>
                      <div>
                        <h4
                          className={`font-semibold text-[15px] leading-tight ${
                            item.isHighlight ? 'text-pink-600' : 'text-gray-800'
                          }`}
                        >
                          {item.title}
                        </h4>
                        <span className="text-[11px] text-pink-400 font-medium">
                          {item.date}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-[13px] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>

                {/* Left Dot — Mobile */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={timelineInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 * (index + 1) + 0.2 }}
                  className="absolute left-[18px] top-8 transform -translate-x-1/2 z-10"
                >
                  <div
                    className={`w-4 h-4 rounded-full border-[3px] border-white shadow-md ${
                      item.isHighlight ? 'bg-rose-500' : 'bg-pink-400'
                    }`}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}

          {/* End Heart */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={timelineInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 * (timelineData.length + 1) + 0.3 }}
            className="flex justify-center mt-8 md:mt-12"
          >
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg"
              style={{
                boxShadow: '0 0 30px rgba(244,114,182,0.4)',
              }}
            >
              <FaHeart className="text-white text-lg md:text-xl" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

/* ============================================
   Smart Image Component
   - ตรวจสอบขนาดรูปจริง (portrait / landscape)
   - แสดงรูปเต็มไม่ crop ส่วนสำคัญหาย
   ============================================ */
interface TimelineImageProps {
  src: string;
  alt: string;
  emoji: string;
  date: string;
  isHighlight?: boolean;
  mobile: boolean;
}

const TimelineImage: React.FC<TimelineImageProps> = ({
  src,
  alt,
  emoji,
  date,
  isHighlight,
  mobile,
}) => {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape' | 'square'>('landscape');
  const [imgError, setImgError] = useState(false);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    const ratio = img.naturalWidth / img.naturalHeight;
    if (ratio < 0.85) {
      setOrientation('portrait');
    } else if (ratio > 1.15) {
      setOrientation('landscape');
    } else {
      setOrientation('square');
    }
  };

  // กำหนด aspect-ratio ตาม orientation
  // Portrait: แสดงแนวตั้ง (4:5) ให้เห็นเต็มรูป
  // Landscape: แสดงแนวนอน (16:10)
  // Square: แสดง 1:1
  const getAspectClass = () => {
    if (mobile) {
      switch (orientation) {
        case 'portrait':
          return 'aspect-[3/4]'; // มือถือ portrait ให้สูงขึ้น
        case 'square':
          return 'aspect-square';
        default:
          return 'aspect-[4/3]';
      }
    } else {
      switch (orientation) {
        case 'portrait':
          return 'aspect-[3/4]';
        case 'square':
          return 'aspect-square';
        default:
          return 'aspect-[16/10]';
      }
    }
  };

  return (
    <div className={`relative overflow-hidden group ${getAspectClass()}`}>
      {!imgError ? (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={() => setImgError(true)}
          className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
            orientation === 'portrait' ? 'object-cover object-top' : 'object-cover object-center'
          }`}
        />
      ) : (
        /* Fallback ถ้าไม่มีรูป */
        <div className="w-full h-full bg-gradient-to-br from-pink-200 to-rose-300 flex items-center justify-center">
          <span className={mobile ? 'text-5xl' : 'text-6xl'}>{emoji}</span>
        </div>
      )}

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />

      {/* Date badge — Desktop only (mobile shows date in content) */}
      {!mobile && (
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
          <span className="text-xs font-medium text-pink-600">{date}</span>
        </div>
      )}

      {/* Highlight badge */}
      {isHighlight && (
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1 rounded-full shadow-sm"
        >
          <span className="text-xs font-semibold flex items-center gap-1">✨ วันสำคัญ</span>
        </motion.div>
      )}
    </div>
  );
};

export default TimelineSection;