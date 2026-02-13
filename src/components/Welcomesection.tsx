import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCalendarAlt, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import { GiDiamondRing } from 'react-icons/gi';

const WelcomeSection = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section 
      ref={heroRef} 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Gradient Background ตามสีรูป */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-pink-50">
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-linear-to-br from-blue-100/30 via-transparent to-pink-100/30"
          animate={{
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity
          }}
        />
      </div>

      {/* Floating Sparkles - เพราะชุดมีประกาย */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 10 - 5, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          <div className="text-2xl">✨</div>
        </motion.div>
      ))}

      {/* Floating Flowers */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`flower-${i}`}
          className="absolute text-3xl"
          style={{
            left: `${(i * 15 + 10) % 90}%`,
            top: `${20 + (i * 10) % 60}%`,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          🌸
        </motion.div>
      ))}
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={heroInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Decorative Top */}
        <motion.div
          initial={{ scale: 0 }}
          animate={heroInView ? { scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center items-center gap-4 mb-8"
        >
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <GiDiamondRing className="text-5xl text-blue-400" style={{
              filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.6))'
            }} />
          </motion.div>
          
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
          
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaHeart className="text-4xl text-pink-400" style={{
              filter: 'drop-shadow(0 0 10px rgba(244, 114, 182, 0.6))'
            }} />
          </motion.div>
          
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
          
          <motion.div
            animate={{ 
              rotate: [0, -360],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          >
            <GiDiamondRing className="text-5xl text-blue-400" style={{
              filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.6))'
            }} />
          </motion.div>
        </motion.div>

        {/* Photo Frame - Hexagon Style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={heroInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mx-auto mb-12"
          style={{ width: 'fit-content' }}
        >
          {/* Rotating Ring Behind Photo */}
          <motion.div
            className="absolute inset-0 -m-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-full rounded-full border-4 border-dashed border-blue-300/30"></div>
          </motion.div>

          {/* Sparkles around photo */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute text-3xl"
              style={{
                left: `${50 + 45 * Math.cos((i * Math.PI * 2) / 8)}%`,
                top: `${50 + 45 * Math.sin((i * Math.PI * 2) / 8)}%`,
                transform: 'translate(-50%, -50%)'
              }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.25,
              }}
            >
              ✨
            </motion.div>
          ))}

          {/* Main Photo Container */}
          <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem]">
            {/* Outer Glow */}
            <motion.div
              className="absolute inset-0 rounded-full bg-linear-to-br from-blue-200 via-pink-200 to-blue-200"
              animate={{
                boxShadow: [
                  '0 0 40px rgba(59, 130, 246, 0.4)',
                  '0 0 60px rgba(244, 114, 182, 0.6)',
                  '0 0 40px rgba(59, 130, 246, 0.4)',
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity
              }}
              style={{ 
                filter: 'blur(20px)',
                transform: 'scale(1.1)'
              }}
            />

            {/* Hexagon Border */}
            <div 
              className="absolute inset-0 rounded-full p-2 bg-linear-to-br from-blue-300 via-white to-pink-300"
              style={{
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1), 0 0 20px rgba(59, 130, 246, 0.3)'
              }}
            >
              {/* Inner Border */}
              <div className="w-full h-full rounded-full p-2 bg-white">
                {/* Photo */}
                <div className="w-full h-full rounded-full overflow-hidden shadow-2xl">
                  <motion.img 
                    src="/images/couple-main.jpg" 
                    alt="คู่บ่าวสาว" 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>

            {/* Floating Hearts around photo */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`heart-${i}`}
                className="absolute text-2xl"
                style={{
                  left: `${50 + 55 * Math.cos((i * Math.PI * 2) / 4 + Math.PI / 4)}%`,
                  top: `${50 + 55 * Math.sin((i * Math.PI * 2) / 4 + Math.PI / 4)}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                💕
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Names with Gradient */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-serif text-5xl md:text-7xl mb-6"
          style={{
            background: 'linear-gradient(135deg, #3B82F6 0%, #EC4899 50%, #3B82F6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 2px 10px rgba(59, 130, 246, 0.3))',
          }}
        >
          <motion.span
            animate={{
              textShadow: [
                '0 0 20px rgba(59, 130, 246, 0.3)',
                '0 0 40px rgba(236, 72, 153, 0.5)',
                '0 0 20px rgba(59, 130, 246, 0.3)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            จิมมี่ & สรัล
          </motion.span>
        </motion.h2>

        {/* Subtitle with animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-8"
        >
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-4" style={{
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
          }}>
            <motion.span
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block"
            >
              "ขอเชิญร่วมเป็นสักขีพยานในวันแห่งความสุข"
            </motion.span>
          </p>
          <p className="text-lg md:text-xl text-gray-600">
            ที่เราจะก้าวเดินไปด้วยกันตลอดชีวิต
          </p>
        </motion.div>

        {/* Animated Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={heroInView ? { width: '100%' } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="flex justify-center items-center gap-4 mb-8 max-w-md mx-auto"
        >
          <motion.div 
            className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-300 to-blue-400"
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            💐
          </motion.div>
          <motion.div 
            className="h-px flex-1 bg-gradient-to-r from-blue-400 via-blue-300 to-transparent"
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </motion.div>

        {/* Date & Location Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="space-y-4"
        >
          {/* Date */}
          <motion.div 
            className="flex items-center justify-center gap-4 text-gray-700"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaCalendarAlt className="text-2xl text-blue-500" style={{
                filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.4))'
              }} />
            </motion.div>
            <span className="text-lg md:text-xl font-medium">
              วันอาทิตย์ที่ 1 มีนาคม 2569
            </span>
          </motion.div>

          {/* Location (Optional) */}
          <motion.div 
            className="flex items-center justify-center gap-4 text-gray-600"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ 
                y: [0, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaMapMarkerAlt className="text-2xl text-pink-500" style={{
                filter: 'drop-shadow(0 0 10px rgba(236, 72, 153, 0.4))'
              }} />
            </motion.div>
            <span className="text-base md:text-lg">
              บ้านเลขที่ 28 หมู่ 8 ตำบล บ้านข่า อำเภอศรีสงคราม จังหวัดนครพนม 
            </span>
          </motion.div>
        </motion.div>

        {/* Decorative Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-12 flex justify-center gap-6"
        >
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -8, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            >
              <div className="text-sm md:text-base">
                {['💙', '✨', '💕', '🌸', '💕', '✨', '💙'][i]}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WelcomeSection;