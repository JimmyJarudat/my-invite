import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaHeart, FaMapMarkedAlt, FaClock } from 'react-icons/fa';

const OurStorySectionWithPhoto = () => {
  const [storyRef, storyInView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={storyRef} className="py-20 px-6 bg-gradient-to-b from-white via-blue-50/30 to-pink-50/30 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <FaHeart className="text-pink-200 text-3xl" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={storyInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-16">


          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={storyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-serif text-4xl md:text-6xl mb-3"
            style={{
              background: 'linear-gradient(135deg, #3B82F6 0%, #EC4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            เรื่องราวของเรา
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            animate={storyInView ? { width: '120px' } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-1 mx-auto bg-gradient-to-r from-blue-400 via-pink-400 to-blue-400"
          />
        </div>

       {/* Main Content with Photo */}
        <div className="grid md:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-start mb-12">
          {/* Left: Story Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={storyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Story Item 1 */}
            <div className="bg-linear-to-br from-blue-100 to-cyan-100 rounded-3xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    <FaMapMarkedAlt />
                  </div>
                </motion.div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">จุดเริ่มต้น</h3>
                  <p className="text-sm text-gray-600 mb-3 italic">ปี 2564</p>

                  <p className="text-gray-700 text-sm leading-relaxed">
                    พวกเราอยู่จังหวัดนครพนมเหมือนกัน อำเภอเดียวกัน
                    แต่เรียนกันคนละที่ — จิมมี่เรียนอยู่ลาดกระบัง
                    ส่วนสรัลเรียนอยู่นครพนม
                    ถ้าไม่ใช่เพราะโซเชียล…
                    ก็คงไม่มีทางได้เจอกัน
                  </p>

                  <p className="text-gray-700 text-sm leading-relaxed mt-3">
                    ไม่ทัก = ไม่เกิด
                    ทักก่อน = ได้ใจไปก่อน
                    และแน่นอน…
                    คงเดาได้ไม่ยากว่าใครเป็นคนเริ่มก่อน 😄
                  </p>

                  <p className="text-gray-500 text-xs italic mt-3">
                    *บทเรียนชีวิตเล็ก ๆ : คนที่กล้าทัก มักจะได้หัวใจไปครอง 💕
                  </p>
                </div>

              </div>
            </div>

            {/* Story Item 2 */}
            <div className="bg-linear-to-br from-pink-100 to-rose-100 rounded-3xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex-shrink-0"
                >
                  <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white">
                    <FaClock />
                  </div>
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">การเจอกัน</h3>
                  <p className="text-sm text-gray-600 mb-2 italic">ปี 2564</p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    หลังจากพูดคุยกันทุกวันได้ระยะหนึ่ง
                    เราก็เริ่มนัดเจอกันจริง ๆ
                    เดทตามคาเฟ่เล็ก ๆ หาของอร่อย ๆ กิน
                    ใช้เวลาธรรมดา ๆ ร่วมกันในทุกเทศกาล
                    <br /><br />
                    สิ่งเล็ก ๆ เหล่านั้น
                    กลับกลายเป็นจุดเริ่มต้นของความรักที่สวยงาม
                    จากคนแปลกหน้า…
                    สู่การเป็นคู่ชีวิตของกันและกัน
                  </p>
                </div>

              </div>
            </div>

            {/* Story Item 3 */}
            <div className="bg-linear-to-br from-purple-100 to-pink-100 rounded-3xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex-shrink-0"
                >
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white">
                    <FaHeart />
                  </div>
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">วันนี้</h3>
                  <p className="text-sm text-gray-600 mb-2 italic">ปี 2569</p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    และในวันนี้
                    เราพร้อมที่จะก้าวสู่บทใหม่ของชีวิต
                    ผูกพันกันอย่างเป็นทางการ
                    จึงใคร่ขอเรียนเชิญทุกท่าน
                    มาร่วมเป็นสักขีพยานแห่งความรักของเรา
                  </p>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Right: Photo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={storyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative w-full md:w-[320px] lg:w-[380px] xl:w-[420px] md:sticky md:top-8"
          >
            {/* Glow effect */}
            <motion.div
              className="absolute -inset-3 bg-linear-to-br from-blue-200 to-pink-200 rounded-3xl opacity-50 blur-xl"
              animate={{
                boxShadow: [
                  '0 0 40px rgba(59, 130, 246, 0.4)',
                  '0 0 60px rgba(236, 72, 153, 0.6)',
                  '0 0 40px rgba(59, 130, 246, 0.4)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Photo container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/story-photo.png"
                alt="Our Story"
                className="w-full h-auto block"
              />

              {/* Sparkles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  style={{
                    left: `${20 + (i % 3) * 30}%`,
                    top: `${20 + Math.floor(i / 3) * 30}%`,
                  }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </div>

            {/* Floating hearts around photo */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`float-${i}`}
                className="absolute text-3xl"
                style={{
                  left: `${-10 + (i % 2) * 110}%`,
                  top: `${-5 + Math.floor(i / 2) * 110}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 10, 0],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                💕
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={storyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-pink-50 via-white to-blue-50 rounded-3xl p-12 text-center shadow-xl"
        >
          <FaHeart className="text-5xl text-pink-400 mx-auto mb-6" style={{
            filter: 'drop-shadow(0 0 20px rgba(244, 114, 182, 0.6))'
          }} />

          <blockquote className="font-serif text-2xl md:text-3xl text-gray-800 leading-relaxed mb-4">
            "จากคนแปลกหน้า กลายเป็นเพื่อน<br />
            จากเพื่อน กลายเป็นคนพิเศษ<br />
            และวันนี้ เรากำลังจะเป็นครอบครัว"
          </blockquote>

          <div className="flex justify-center items-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-400"></div>
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="text-2xl"
            >
              💕
            </motion.span>
            <div className="h-px w-16 bg-gradient-to-r from-pink-400 to-transparent"></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default OurStorySectionWithPhoto;