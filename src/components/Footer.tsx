import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaHeart, FaInstagram, FaLine, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const [footerRef, footerInView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-gradient-to-b from-white via-pink-50 to-rose-100 pt-20 pb-10"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-20"
          style={{
            background:
              'radial-gradient(ellipse, rgba(244,114,182,0.4) 0%, transparent 70%)',
          }}
        />
        {/* Floating mini hearts */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300/20"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -12, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          >
            <FaHeart className="text-lg" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Decorative Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={footerInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-pink-300" />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaHeart className="text-pink-400 text-sm" />
          </motion.div>
          <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-pink-300" />
        </motion.div>

        {/* Thank You Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={footerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <FaHeart className="text-5xl text-pink-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(244,114,182,0.5)]" />
          </motion.div>

          <h3
            className="text-3xl md:text-4xl font-serif text-gray-800 mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Thank You
          </h3>

          <p className="text-gray-600 mb-2 text-lg">
            ขอบคุณที่ร่วมแบ่งปันความสุขกับเรา
          </p>
          <p className="text-gray-500 text-sm mb-8">
            ความรักของพวกเราจะสมบูรณ์มากขึ้น เมื่อมีทุกคนอยู่เคียงข้าง
          </p>

          {/* Names & Date */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={footerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-block"
          >
            <div
              className="font-serif text-2xl md:text-3xl mb-2"
              style={{
                background:
                  'linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Jimmy & Saran
            </div>
            <p className="text-gray-500 tracking-[0.3em] text-sm">
              01 . 03 . 2569
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={footerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center gap-5 mt-8 mb-10"
          >
            {[
              { icon: FaInstagram, href: '#', label: 'Instagram' },
              { icon: FaLine, href: '#', label: 'Line' },
              { icon: FaEnvelope, href: '#', label: 'Email' },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                aria-label={social.label}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-pink-400 hover:text-pink-600 hover:shadow-lg transition-colors"
              >
                <social.icon className="text-lg" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={footerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="border-t border-pink-200/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
        >
          <p className="text-xs text-gray-400">
            Made with{' '}
            <FaHeart className="inline text-pink-400 text-[10px] mx-0.5" />{' '}
            for our special day
          </p>
          <p className="text-xs text-gray-400">
            #JimmyAndSaran2569
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;