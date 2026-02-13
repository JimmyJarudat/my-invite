import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaMapMarkerAlt,
  FaClock,
  FaPalette,
  FaMapPin,
  FaTimes,
  FaImage,
  FaMusic,
} from 'react-icons/fa';

// ============================================================
// 🔧 CONFIG — แก้ไขตรงนี้
// ============================================================
const CONFIG = {
  invitationImage: '/images/invitation-card.jpg', // ← รูปการ์ดเชิญจริง
  morlamImages: ['/images/morlam-1.jpg', '/images/morlam-2.jpg'],         // ← (optional) รูปคณะหมอลำ
  morlamName: 'คณะ เจมส์ พรชัย',                    // ← ชื่อคณะหมอลำ
  morlamDetail: 'หมอลำน้องใหม่กำลังมาแรงตอนนี้ โชว์สุดมันส์ตลอดงาน พร้อมนักร้องนำและหางเครื่องสุดสวย มากกว่า 10 ชีวิต',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=17.685540,104.159453',
};
// ============================================================

const WeddingDetailsSection = () => {
  const [detailsRef, detailsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [showInvitation, setShowInvitation] = useState(false);
  const [showMorlam, setShowMorlam] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const scheduleItems = [
    {
      time: '09.39 น.',
      title: 'พิธีแห่ขันหมาก',
      emoji: '🎊',
    },
    {
      time: '09.59 น.',
      title: 'พิธีบายศรีสู่ขวัญ',
      emoji: '🪷',
    },
    {
      time: 'หลังเสร็จพิธี',
      title: 'รับประทานอาหาร',
      emoji: '🍽️',
    },
  ];

  const themeColors = [
    { name: 'Pink', color: '#F9C0D0' },
    { name: 'Cream', color: '#FFF8E7' },
    { name: 'Gold', color: '#D4AF37' },
  ];

  return (
    <>
      <section
        ref={detailsRef}
        className="py-24 px-6 bg-gradient-to-b from-pink-50/30 via-white to-pink-50/30 relative overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-32 right-0 w-80 h-80 rounded-full opacity-10"
            style={{
              background:
                'radial-gradient(circle, rgba(244,114,182,0.4) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute bottom-20 left-0 w-64 h-64 rounded-full opacity-10"
            style={{
              background:
                'radial-gradient(circle, rgba(251,113,133,0.3) 0%, transparent 70%)',
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={detailsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto relative z-10"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={detailsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="text-pink-400 text-sm tracking-[0.3em] uppercase font-medium">
                Wedding Details
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={detailsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl text-gray-800 mt-3 mb-6"
            >
              รายละเอียดงาน
            </motion.h2>

            <motion.div
              initial={{ width: 0 }}
              animate={detailsInView ? { width: 80 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto rounded-full"
            />
          </div>

          {/* Couple Names Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={detailsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-3xl shadow-lg border border-pink-100/50 p-8 md:p-10 mb-8 text-center"
          >
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img src="/images/jn.png" alt="Logo" className="w-36 h-36  object-contain" />
            </div>

            <p className="text-gray-500 text-sm mb-6">
              มีความยินดีขอเรียนเชิญท่านเพื่อเป็นเกียรติเนื่องในงานพิธีมงคลสมรส
              ระหว่าง
            </p>

            {/* Parents */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 mb-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm">ร.ต.อ. วิทยา อุปทุม</p>
                <p className="text-gray-600 text-sm">นางบัวพันธุ์ อุปทุม</p>
              </div>
              <span className="text-pink-400 font-serif text-lg">และ</span>
              <div className="text-center">
                <p className="text-gray-600 text-sm">นายอนุวัตร ชายกวด</p>
                <p className="text-gray-600 text-sm">นางดอกรัก กัลยาฤทธิ์</p>
              </div>
            </div>

            {/* Bride & Groom */}
            <div className="mb-6">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={detailsInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="font-serif text-2xl md:text-3xl mb-2"
                style={{
                  background:
                    'linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                นางสาวสรัลรัตน์ อุปทุม (น้อง)
              </motion.h3>
              <p className="text-pink-400 font-serif text-xl mb-2">และ</p>
              <motion.h3
                initial={{ opacity: 0 }}
                animate={detailsInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="font-serif text-2xl md:text-3xl"
                style={{
                  background:
                    'linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                นายจารุเดช ชายกวด (จิมมี่)
              </motion.h3>
            </div>

            {/* View Invitation Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowInvitation(true)}
              className="inline-flex items-center gap-2 border border-pink-300 text-pink-500 px-5 py-2 rounded-full text-sm font-medium hover:bg-pink-50 transition-colors"
            >
              <FaImage className="text-xs" />
              ดูการ์ดเชิญ
            </motion.button>
          </motion.div>

          {/* ===== Date Hero Card ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={detailsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-3xl shadow-lg border border-pink-100/50 overflow-hidden mb-8"
          >
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 py-3 text-center">
              <span className="text-white/80 text-xs tracking-[0.2em] uppercase font-medium">
                Save the Date
              </span>
            </div>

            <div className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
                {/* Day Name */}
                <div className="text-center">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                    วัน
                  </p>
                  <p className="text-gray-800 font-serif text-2xl">อาทิตย์</p>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-[1px] h-20 bg-pink-200" />
                <div className="md:hidden h-[1px] w-20 bg-pink-200" />

                {/* Big Date */}
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <span
                      className="text-8xl md:text-9xl font-bold leading-none"
                      style={{
                        background:
                          'linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #ec4899 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      1
                    </span>
                  </motion.div>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-[1px] h-20 bg-pink-200" />
                <div className="md:hidden h-[1px] w-20 bg-pink-200" />

                {/* Month & Year */}
                <div className="text-center">
                  <p className="text-gray-800 font-serif text-2xl">มีนาคม</p>
                  <p className="text-pink-400 text-lg font-light tracking-widest">
                    2569
                  </p>
                </div>
              </div>

              {/* Time Badge */}
              <div className="flex justify-center mt-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200/60 rounded-full px-6 py-2.5">
                  <FaClock className="text-pink-400 text-sm" />
                  <span className="text-gray-700 text-sm font-medium">
                    เริ่มพิธี 09.39 น.
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Location & Schedule Row */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={detailsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-pink-100/50 hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center mb-5 mx-auto">
                <FaMapMarkerAlt className="text-2xl text-rose-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                สถานที่
              </h3>
              <div className="text-center">
                <p className="text-gray-700 leading-relaxed mb-4">
                  บ้านเลขที่ 28 หมู่ 8 บ้านท่าโข่ง
                  <br />
                  ตำบลบ้านข่า อำเภอศรีสงคราม
                  <br />
                  จังหวัดนครพนม
                </p>
                <motion.a
                  href={CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2.5 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow"
                >
                  <FaMapPin className="text-xs" />
                  ดูแผนที่ Google Maps
                </motion.a>
              </div>
            </motion.div>

            {/* Schedule */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={detailsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-pink-100/50"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center mb-5 mx-auto">
                <FaClock className="text-2xl text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-5 text-center">
                กำหนดการ
              </h3>

              <div className="space-y-4">
                {scheduleItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={detailsInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">{item.emoji}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium text-sm">
                        {item.title}
                      </p>
                      <p className="text-gray-400 text-xs">{item.time}</p>
                    </div>
                  </motion.div>
                ))}

                {/* Morlam — Clickable */}
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={detailsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowMorlam(true)}
                  className="w-full flex items-center gap-4 bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200/60 rounded-xl p-3 text-left hover:shadow-md transition-shadow group"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">🎶</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-pink-600 font-semibold text-sm">
                      คณะหมอลำซิ่ง
                    </p>
                    <p className="text-gray-400 text-xs">
                      11.00 - 16.00 น. · กดดูรายละเอียด
                    </p>
                  </div>
                  <FaMusic className="text-pink-300 group-hover:text-pink-500 transition-colors text-sm flex-shrink-0" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Theme Colors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={detailsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 text-center border border-pink-100/50"
          >
            <div className="flex items-center justify-center gap-2 mb-5">
              <FaPalette className="text-pink-400" />
              <h3 className="text-xl font-semibold text-gray-800">
                Theme Colors
              </h3>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              ขอเชิญแต่งกายตามโทนสีของงาน
            </p>

            <div className="flex justify-center items-center gap-6">
              {themeColors.map((tc, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={detailsInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
                  className="text-center"
                >
                  <div
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full mx-auto mb-2 shadow-md border-2 border-white"
                    style={{ backgroundColor: tc.color }}
                  />
                  <span className="text-xs text-gray-500">{tc.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={detailsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-center text-gray-400 text-sm mt-8"
          >
            (ขออภัยหากมิได้เรียนเชิญด้วยตนเอง)
          </motion.p>
        </motion.div>
      </section>

      {/* ===== Modal: การ์ดเชิญ ===== */}
      <AnimatePresence>
        {showInvitation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowInvitation(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-lg w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowInvitation(false)}
                className="absolute -top-3 -right-3 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes />
              </button>

              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={CONFIG.invitationImage}
                  alt="การ์ดเชิญงานแต่งงาน"
                  className="w-full h-auto object-contain max-h-[85vh]"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Modal: หมอลำซิ่ง ===== */}
      <AnimatePresence>
        {showMorlam && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowMorlam(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-md w-full my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowMorlam(false)}
                className="absolute -top-3 -right-3 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes />
              </button>

              <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-4 text-center relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-3xl block mb-1"
                  >
                    🎶
                  </motion.span>
                  <h3 className="text-white font-bold text-lg relative z-10">
                    คณะหมอลำซิ่ง
                  </h3>
                  <p className="text-white/80 text-xs mt-0.5 relative z-10">
                    โชว์สุดพิเศษในงาน
                  </p>
                </div>

                {/* Band Image — รองรับรูปแนวตั้ง */}
                <div className="relative bg-gradient-to-br from-pink-100 to-rose-100 overflow-hidden">
                  <img
                    src={CONFIG.morlamImages[currentSlide]}
                    alt={`${CONFIG.morlamName} ${currentSlide + 1}`}
                    className="w-full max-h-[50vh] object-contain transition-opacity duration-300"
                  />

                  <button
                    onClick={() => setCurrentSlide(currentSlide === 0 ? CONFIG.morlamImages.length - 1 : currentSlide - 1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md text-gray-600 hover:bg-white transition"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setCurrentSlide(currentSlide === CONFIG.morlamImages.length - 1 ? 0 : currentSlide + 1)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md text-gray-600 hover:bg-white transition"
                  >
                    ›
                  </button>

                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {CONFIG.morlamImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? 'bg-pink-500 w-4' : 'bg-white/70'
                          }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h4 className="font-bold text-gray-800 text-lg mb-1">
                    {CONFIG.morlamName}
                  </h4>

                  <div className="inline-flex items-center gap-2 bg-pink-50 text-pink-600 px-3 py-1 rounded-full text-sm font-medium mb-3">
                    <FaClock className="text-xs" />
                    11.00 - 16.00 น.
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {CONFIG.morlamDetail}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[
                      '🎤 ลำเต้ย',
                      '💃 หางเครื่อง',
                      '🎵 ลูกทุ่งอีสาน',
                      '🥁 สนุกสนาน',
                    ].map((tag, i) => (
                      <span
                        key={i}
                        className="bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200/50 text-gray-600 text-xs px-3 py-1.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowMorlam(false)}
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-semibold text-sm shadow-lg"
                  >
                    🎉 มันส์แน่นอน! ปิด
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WeddingDetailsSection;