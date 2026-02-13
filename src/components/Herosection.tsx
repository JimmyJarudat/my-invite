import { motion } from 'framer-motion';
import { FaHeart, FaRing } from 'react-icons/fa';
import { GiDiamondRing } from 'react-icons/gi';

interface HeroSectionProps {
  onOpenInvitation: () => void;
}

const HeroSection = ({ onOpenInvitation }: HeroSectionProps) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Background Image with Enhanced Overlay */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-bg.jpg"
            alt="background"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30"></div>
          {/* Colored gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-pink-500/20 via-rose-500/10 to-purple-500/20"></div>
          {/* Radial glow */}
          <div className="absolute inset-0" style={{
            background: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)`
          }}></div>
        </div>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-pink-300/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Floating Hearts */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-pink-400/30"
            style={{
              left: `${(i * 12) % 100}%`,
              bottom: '-10%',
            }}
            animate={{
              y: [0, -window.innerHeight - 100],
              x: [0, Math.sin(i) * 50],
              rotate: [0, 360],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear",
            }}
          >
            <FaHeart className="text-2xl" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 text-center px-6 max-w-5xl"
      >
        {/* Top Decorative Hearts */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center items-center mb-8 gap-4"
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaHeart className="text-pink-400 text-5xl drop-shadow-[0_0_15px_rgba(244,114,182,0.6)]" />
          </motion.div>

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          >
            <FaHeart className="text-rose-500 text-6xl drop-shadow-[0_0_20px_rgba(244,63,94,0.8)]" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          >
            <FaHeart className="text-pink-400 text-5xl drop-shadow-[0_0_15px_rgba(244,114,182,0.6)]" />
          </motion.div>
        </motion.div>

        {/* Names with Gradient and Glow */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-serif text-7xl md:text-9xl mb-6 relative"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #fce7f3 50%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 40px rgba(244, 114, 182, 0.4)',
            filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3))',
          }}
        >
          <span className="inline-block">
            <motion.span
              animate={{
                textShadow: [
                  '0 0 20px rgba(244, 114, 182, 0.4)',
                  '0 0 40px rgba(244, 114, 182, 0.6)',
                  '0 0 20px rgba(244, 114, 182, 0.4)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Jimmy
            </motion.span>
          </span>
          {' '}
          <span className="text-pink-300">&</span>
          {' '}
          <span className="inline-block">
            <motion.span
              animate={{
                textShadow: [
                  '0 0 20px rgba(244, 114, 182, 0.4)',
                  '0 0 40px rgba(244, 114, 182, 0.6)',
                  '0 0 20px rgba(244, 114, 182, 0.4)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              Saran
            </motion.span>
          </span>
        </motion.h1>

        {/* Animated Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex justify-center items-center mb-8"
        >
          <motion.div
            className="h-1 bg-gradient-to-r from-transparent via-pink-400 to-rose-400"
            style={{ width: '150px' }}
            animate={{
              boxShadow: [
                '0 0 10px rgba(244, 114, 182, 0.4)',
                '0 0 20px rgba(244, 114, 182, 0.8)',
                '0 0 10px rgba(244, 114, 182, 0.4)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            animate={{ rotate: 0 }}
            className="mx-4"
          >
            <GiDiamondRing className="text-4xl text-pink-400 drop-shadow-[0_0_10px_rgba(244,114,182,0.8)]" />
          </motion.div>

          <motion.div
            className="h-1 bg-gradient-to-r from-rose-400 via-pink-400 to-transparent"
            style={{ width: '150px' }}
            animate={{
              boxShadow: [
                '0 0 10px rgba(244, 114, 182, 0.4)',
                '0 0 20px rgba(244, 114, 182, 0.8)',
                '0 0 10px rgba(244, 114, 182, 0.4)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </motion.div>

        {/* Subtitle with Glow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-3xl md:text-4xl text-white mb-6 font-light tracking-wide"
          style={{
            textShadow: '0 2px 20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(244, 114, 182, 0.3)',
            fontFamily: "'Playfair Display', serif"
          }}
        >
          <motion.span
            animate={{
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            We're Getting Married!
          </motion.span>
        </motion.p>

        {/* Date with Animation */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-2xl md:text-3xl text-pink-100 mb-12 tracking-widest"
          style={{
            textShadow: '0 2px 15px rgba(0, 0, 0, 0.5)',
            fontFamily: "'Playfair Display', serif"
          }}
        >
          <motion.span
            animate={{
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >
            1 March 2569
          </motion.span>
        </motion.p>

        {/* CTA Button with Multiple Effects */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          whileHover={{
            scale: 1.08,
            boxShadow: '0 0 40px rgba(244, 114, 182, 0.8), 0 20px 60px rgba(0, 0, 0, 0.4)'
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenInvitation}
          className="relative group bg-gradient-to-r from-pink-500 to-rose-500 text-white px-16 py-5 rounded-full text-xl font-semibold shadow-2xl overflow-hidden"
          style={{
            boxShadow: '0 10px 40px rgba(244, 114, 182, 0.4), 0 0 20px rgba(244, 114, 182, 0.3)'
          }}
        >
          {/* Button Glow Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
          />

          {/* Button Text */}
          <span className="relative z-10 flex items-center gap-3">
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ✨
            </motion.span>
            Open the website
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
            >
              ✨
            </motion.span>
          </span>

          {/* Hover Border Animation */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/50"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
        </motion.button>

        {/* Decorative Elements at Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-12 flex justify-center gap-8"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            >
              <FaHeart className="text-pink-300/50 text-sm" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Corner Decorations */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute top-10 left-10"
      >
        <FaRing className="text-6xl text-pink-300 rotate-45" style={{
          filter: 'drop-shadow(0 0 20px rgba(244, 114, 182, 0.6))'
        }} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 right-10"
      >
        <FaRing className="text-6xl text-rose-300 -rotate-45" style={{
          filter: 'drop-shadow(0 0 20px rgba(244, 63, 94, 0.6))'
        }} />
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;