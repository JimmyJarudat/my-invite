import { motion } from 'framer-motion';
import { FaHeart, FaRing } from 'react-icons/fa';
import { GiDiamondRing } from 'react-icons/gi';
import { useInView } from 'react-intersection-observer';

const LoveQuoteSection = () => {
  const [sectionRef, sectionInView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  // คำคมโรแมนติกหลายข้อความ
  const quotes = [
    {
      text: "เธอคือคำตอบของคำถามทุกข้อในชีวิต",
      subtext: "คือจุดหมายปลายทางที่ฉันค้นหา",
      author: "~ จากใจของเรา ~"
    },
    {
      text: "ในทุกๆ วัน ฉันตื่นขึ้นมาเพื่อรักเธอมากขึ้น",
      subtext: "และในทุกๆ คืน ฉันหลับไปพร้อมความขอบคุณที่มีเธอ",
      author: "~ ความรักที่งอกงาม ~"
    },
    {
      text: "เมื่อหัวใจสองดวงเลือกกันและกัน",
      subtext: "ทุกก้าวต่อจากนี้ เราจะเดินไปด้วยกัน",
      author: "~ เส้นทาวแห่งความรัก ~"
    },

    {
      text: "เธอไม่ได้ทำให้ฉันสมบูรณ์แบบ",
      subtext: "แต่เธอทำให้ฉันเป็นคนที่ดีขึ้นทุกวัน",
      author: "~ พลังแห่งความรัก ~"
    },
    {
      text: "รักแท้ไม่ได้หมายถึงการมองหน้ากัน",
      subtext: "แต่คือการมองไปทิศทางเดียวกันด้วยกัน",
      author: "~ เป้าหมายเดียวกัน ~"
    },
    {
      text: "ฉันไม่ต้องการใครที่สมบูรณ์แบบ",
      subtext: "ฉันแค่ต้องการเธอที่จะอยู่ข้างๆ ฉันตลอดไป",
      author: "~ ความรักที่แท้จริง ~"
    }
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-linear-to-br from-pink-100 via-rose-50 to-pink-100"></div>

      {/* Radial Gradient Overlays */}
      <div className="absolute inset-0" style={{
        background: `radial-gradient(circle at 30% 40%, rgba(244, 114, 182, 0.15) 0%, transparent 60%)`
      }}></div>
      <div className="absolute inset-0" style={{
        background: `radial-gradient(circle at 70% 60%, rgba(244, 63, 94, 0.15) 0%, transparent 60%)`
      }}></div>

      {/* Floating Hearts Background */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`quote-heart-${i}`}
          className="absolute text-pink-300/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(i) * 20, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          <FaHeart className="text-2xl" />
        </motion.div>
      ))}

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`quote-particle-${i}`}
          className="absolute w-2 h-2 bg-pink-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div ref={sectionRef} className="max-w-6xl mx-auto relative z-10">
        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Top Decorative Elements */}
          <motion.div
            initial={{ scale: 0 }}
            animate={sectionInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center items-center mb-8 gap-4"
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, -10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaHeart className="text-pink-500 text-5xl drop-shadow-[0_0_15px_rgba(244,114,182,0.6)]" />
            </motion.div>

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <GiDiamondRing className="text-rose-600 text-7xl drop-shadow-[0_0_20px_rgba(244,63,94,0.7)]" />
            </motion.div>

            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <FaHeart className="text-pink-500 text-5xl drop-shadow-[0_0_15px_rgba(244,114,182,0.6)]" />
            </motion.div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={sectionInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-5xl md:text-6xl mb-6"
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #be185d 50%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 15px rgba(244, 114, 182, 0.3))',
            }}
          >
            <motion.span
              animate={{
                textShadow: [
                  '0 0 20px rgba(244, 114, 182, 0.3)',
                  '0 0 30px rgba(244, 114, 182, 0.5)',
                  '0 0 20px rgba(244, 114, 182, 0.3)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              คำคมแห่งความรัก
            </motion.span>
          </motion.h2>

          {/* Divider */}
          <motion.div
            initial={{ width: 0 }}
            animate={sectionInView ? { width: '200px' } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-pink-400 via-rose-500 to-pink-400 mx-auto rounded-full"
            style={{
              boxShadow: '0 0 15px rgba(244, 114, 182, 0.5)'
            }}
          />
        </motion.div>

        {/* Quote Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={sectionInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.6 + index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{
                scale: 1.03,
                y: -5,
                transition: { duration: 0.3 }
              }}
              className="relative bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200/50 group overflow-hidden"
            >
              {/* Card Background Gradient */}
              <div className="absolute inset-0 bg-linear-to-br from-pink-50/50 to-rose-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Decorative Hearts in Card */}
              <motion.div
                className="absolute -top-4 -right-4 text-pink-200/40"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
              >
                <FaHeart className="text-6xl" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 text-rose-200/40"
                animate={{
                  rotate: [0, -360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 + 1 }}
              >
                <FaHeart className="text-5xl" />
              </motion.div>

              {/* Content */}
              <div className="relative z-10">
                {/* Top Icon */}
                <motion.div
                  animate={{
                    y: [0, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  className="mb-6"
                >
                  <FaHeart className="text-4xl text-pink-500 mx-auto drop-shadow-[0_0_10px_rgba(244,114,182,0.5)]" />
                </motion.div>

                {/* Main Quote */}
                <blockquote className="font-serif text-2xl md:text-3xl text-gray-800 leading-relaxed mb-4 text-center">
                  <motion.span
                    className="inline-block"
                    animate={{
                      textShadow: [
                        '0 2px 10px rgba(0, 0, 0, 0.1)',
                        '0 2px 15px rgba(244, 114, 182, 0.2)',
                        '0 2px 10px rgba(0, 0, 0, 0.1)',
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                  >
                    "{quote.text}"
                  </motion.span>
                </blockquote>

                {/* Sub Text */}
                <p className="text-lg md:text-xl text-gray-600 text-center mb-6 font-light italic">
                  {quote.subtext}
                </p>

                {/* Decorative Line */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={sectionInView ? { width: '100px' } : {}}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.15 }}
                  className="h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mb-4"
                />

                {/* Author */}
                <p className="text-sm text-pink-600 text-center font-medium tracking-wide">
                  {quote.author}
                </p>
              </div>

              {/* Hover Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 0 2px rgba(244, 114, 182, 0.3), 0 0 40px rgba(244, 114, 182, 0.2)'
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom Special Quote - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="relative bg-linear-to-br from-pink-500 via-rose-500 to-pink-600 rounded-3xl p-12 md:p-16 shadow-2xl overflow-hidden"
        >
          {/* Animated Background Pattern */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`special-heart-${i}`}
              className="absolute text-white/10"
              style={{
                left: `${(i * 12) % 100}%`,
                top: `${20 + (i * 15) % 60}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                delay: i * 0.4
              }}
            >
              <FaHeart className="text-6xl" />
            </motion.div>
          ))}

          {/* Content */}
          <div className="relative z-10 text-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mb-8"
            >
              <GiDiamondRing className="text-8xl text-white mx-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]" />
            </motion.div>

            <blockquote className="font-serif text-3xl md:text-5xl text-white leading-relaxed mb-6">
              <motion.span
                animate={{
                  textShadow: [
                    '0 4px 20px rgba(0, 0, 0, 0.3)',
                    '0 4px 30px rgba(0, 0, 0, 0.5)',
                    '0 4px 20px rgba(0, 0, 0, 0.3)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                "ชีวิตที่สมบูรณ์แบบที่สุด<br />
                คือชีวิตที่มีเธอเดินเคียงข้างไปตลอดกาล"
              </motion.span>
            </blockquote>

            <motion.p
              animate={{
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xl md:text-2xl text-white/90 font-light tracking-wide"
            >
              ✨ เพราะรักแท้ไม่มีวันจบสิ้น มีเพียงเริ่มต้นใหม่ทุกวัน ✨
            </motion.p>

            {/* Decorative Elements */}
            <div className="flex justify-center items-center gap-6 mt-8">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`bottom-heart-${i}`}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                >
                  <FaHeart className="text-white text-xl" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Corner Rings */}
          <motion.div
            animate={{
              rotate: [0, 360]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-8 left-8 text-white/20"
          >
            <FaRing className="text-5xl" />
          </motion.div>

          <motion.div
            animate={{
              rotate: [0, -360]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-8 right-8 text-white/20"
          >
            <FaRing className="text-5xl" />
          </motion.div>
        </motion.div>

        {/* Final Decorative Hearts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={sectionInView ? { opacity: 1 } : {}}
          transition={{ delay: 2 }}
          className="mt-16 flex justify-center gap-8"
        >
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={`final-heart-${i}`}
              animate={{
                y: [0, -15, 0],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            >
              <FaHeart className="text-pink-400 text-2xl drop-shadow-[0_0_10px_rgba(244,114,182,0.5)]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LoveQuoteSection;