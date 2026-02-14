import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaHeart, FaPaperPlane, FaQrcode, FaCopy, FaCheck, FaQuoteLeft } from 'react-icons/fa';
import { db } from "../config/firebaseConfig";
import { collection, addDoc, Timestamp, onSnapshot, query, orderBy } from "firebase/firestore";

// ============================================================
// 🔧 CONFIG — แก้ไขตรงนี้
// ============================================================
const CONFIG = {
  qrImage: '/images/promptpay-qr.png',   // ← path รูป QR Code
  name: 'จารุเดช ชายกวด',
  promptPayNumber: '0830625832',        // ← เบอร์พร้อมเพย์
  deadlineText: 'กรุณายืนยันภายในวันที่ 25 กุมภาพันธ์ 2569',
};
// ============================================================

// interface WishItem {
//   name: string;
//   message: string;
//   timestamp: Date;
// }

const WishesSection = () => {
  const [sectionRef, sectionInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // const [wishes, setWishes] = useState<WishItem[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    attendance: 'yes',
    guests: '1',
    message: '',
  });

  // useEffect(() => {
  //   const q = query(collection(db, "blessings"), orderBy("createdAt", "desc"));
  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     const data = snapshot.docs
  //       .filter((doc) => doc.data().message?.trim())
  //       .map((doc) => ({
  //         name: doc.data().name,
  //         message: doc.data().message,
  //         timestamp: doc.data().createdAt?.toDate() || new Date(),
  //       }));
  //     setWishes(data);
  //   });
  //   return () => unsubscribe();
  // }, []);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // บันทึกลง Firestore
      await addDoc(collection(db, "blessings"), {
        name: formData.name || 'ไม่ระบุชื่อ',
        attendance: formData.attendance,
        guests: formData.attendance === 'yes' ? Number(formData.guests) : 0,
        message: formData.message,
        createdAt: Timestamp.now(),
      });

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', attendance: 'yes', guests: '1', message: '' });
      }, 4000);
    } catch (error) {
      console.error('Error:', error);
      alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    }
  };

  const handleCopy = async () => {
    const raw = CONFIG.promptPayNumber.replace(/\D/g, '');
    try {
      await navigator.clipboard.writeText(raw);
    } catch {
      const el = document.createElement('textarea');
      el.value = raw;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 bg-gradient-to-b from-white via-pink-50/30 to-white relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(244,114,182,0.3) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-20 right-10 w-64 h-64 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(251,113,133,0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={sectionInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="text-pink-400 text-sm tracking-[0.3em] uppercase font-medium">
              Blessings & Gift
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-gray-800 mt-3 mb-6"
          >
            อวยพร & ร่วมยินดี
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            animate={sectionInView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto rounded-full"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={sectionInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-500 mt-4 text-lg"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            ส่งความรักและคำอวยพรถึงเราได้ที่นี่
          </motion.p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* ========== LEFT: Form + Wishes ========== */}
          <motion.div
            className="h-full"
            initial={{ opacity: 0, x: -30 }}
            animate={sectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Form Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-pink-100/60 overflow-hidden h-full flex flex-col">


              <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-4 text-center">
                <span className="text-white font-semibold tracking-wide">
                  ✉️ ยืนยัน & อวยพร
                </span>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-10 text-center flex-1"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <FaHeart className="text-white text-2xl" />
                    </motion.div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">
                      ขอบคุณค่ะ / ครับ 💕
                    </h4>
                    <p className="text-gray-500">
                      ได้รับขคำอวยพรของคุณแล้ว เราจะเก็บไว้เป็นความทรงจำที่มีค่ามากๆ ค่ะ / ครับ
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="p-6 space-y-5 flex-1"
                  >
                    {/* Name */}
                    <div>
                      <label className="block text-gray-600 text-sm font-medium mb-1.5">
                        ชื่อ-นามสกุล <span className="text-pink-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-transparent focus:bg-white outline-none transition"
                        placeholder="กรอกชื่อ-นามสกุล"
                      />
                    </div>

                    {/* Attendance + Guests */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1.5">
                          การเข้าร่วมงาน
                        </label>
                        <select
                          name="attendance"
                          value={formData.attendance}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-transparent focus:bg-white outline-none transition appearance-none"
                        >
                          <option value="yes">✅ เข้าร่วม</option>
                          <option value="no">❌ ไม่สะดวก</option>
                        </select>
                      </div>

                      {formData.attendance === 'yes' && (
                        <div>
                          <label className="block text-gray-600 text-sm font-medium mb-1.5">
                            จำนวนท่าน
                          </label>
                          <select
                            name="guests"
                            value={formData.guests}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-transparent focus:bg-white outline-none transition appearance-none"
                          >
                            {[1, 2, 3, 4, 5].map((n) => (
                              <option key={n} value={n}>
                                {n} ท่าน
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-gray-600 text-sm font-medium mb-1.5">
                        ข้อความอวยพร 💌
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-transparent focus:bg-white outline-none transition resize-none"
                        placeholder="ฝากคำอวยพรถึงบ่าวสาว..."
                      />
                    </div>

                    {/* Deadline */}
                    <p className="text-xs text-gray-400 text-center">
                      {CONFIG.deadlineText}
                    </p>

                    {/* Submit */}
                    <motion.button
                      whileHover={{
                        scale: 1.02,
                        boxShadow: '0 8px 25px rgba(244,114,182,0.3)',
                      }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3.5 rounded-xl font-semibold text-base shadow-lg flex items-center justify-center gap-2 relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      />
                      <FaPaperPlane className="relative z-10" />
                      <span className="relative z-10">ส่งคำอวยพร</span>
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Wishes Wall */}
            {/* <div>
              <h4 className="text-gray-700 font-semibold text-sm mb-4 flex items-center gap-2">
                <FaQuoteLeft className="text-pink-300" />
                คำอวยพรจากแขกผู้มีเกียรติ
              </h4>

              <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                {wishes.map((wish, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={sectionInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                    className="bg-white rounded-xl p-4 shadow-sm border border-pink-50 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FaHeart className="text-pink-400 text-xs" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-gray-700 text-sm">{wish.name}</p>
                          <p className="text-gray-400 text-xs flex-shrink-0">
                            {wish.timestamp.toLocaleDateString('th-TH', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                        <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                          {wish.message}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div> */}
          </motion.div>

          {/* ========== RIGHT: QR Code ========== */}
          <motion.div
            className="h-full"
            initial={{ opacity: 0, x: 30 }}
            animate={sectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="bg-white rounded-3xl shadow-xl border border-pink-100/60 overflow-hidden h-full flex flex-col">

              {/* Card Header */}
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-2 text-white">
                  <FaQrcode className="text-lg" />
                  <span className="font-semibold tracking-wide">
                    พร้อมเพย์ PromptPay
                  </span>
                </div>
              </div>

              {/* Card Body */}
                <div className="p-5 text-center flex-1">

                {/* QR Code Image */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={sectionInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="inline-block bg-white p-2 rounded-2xl shadow-md border border-gray-100 mb-4"
                >
                  <img
                    src={CONFIG.qrImage}
                    alt="PromptPay QR Code"
                    className="w-44 h-44 object-contain"
                  />
                </motion.div>

                {/* Divider */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="h-[1px] w-8 bg-gray-200" />
                  <span className="text-xs text-gray-400 tracking-wider uppercase">
                    Scan to Pay
                  </span>
                  <div className="h-[1px] w-8 bg-gray-200" />
                </div>

                {/* Account Info */}
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-4 mb-4">
                  <p className="text-gray-500 text-sm mb-1">ชื่อบัญชี</p>
                  <p
                    className="text-gray-800 font-semibold text-lg mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {CONFIG.name}
                  </p>

                  <div className="h-[1px] w-full bg-pink-200/50 mb-3" />

                  <p className="text-gray-500 text-sm mb-1">หมายเลขพร้อมเพย์</p>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-gray-800 font-mono text-lg font-semibold tracking-wider">
                      {CONFIG.promptPayNumber}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleCopy}
                      className="w-8 h-8 rounded-full bg-white shadow-sm border border-pink-200 flex items-center justify-center text-pink-500 hover:text-pink-600 transition-colors"
                      aria-label="คัดลอกหมายเลข"
                    >
                      {copied ? (
                        <FaCheck className="text-xs text-green-500" />
                      ) : (
                        <FaCopy className="text-xs" />
                      )}
                    </motion.button>
                  </div>
                  {copied && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-500 text-xs mt-2"
                    >
                      คัดลอกแล้ว!
                    </motion.p>
                  )}
                </div>

                {/* Tip */}
                <p className="text-gray-400 text-xs leading-relaxed">
                  ร่วมแสดงความยินดีกับบ่าวสาว ด้วยการสแกน QR Code ผ่านแอปธนาคาร
                  <br />
                  หรือแอปพลิเคชันที่รองรับพร้อมเพย์
                </p>
              </div>

              {/* Card Footer */}
              <div className="bg-pink-50/50 px-6 py-4 text-center border-t border-pink-100/50">
                <div className="flex items-center justify-center gap-2 text-pink-400">
                  <FaHeart className="text-xs" />
                  <span className="text-sm">ขอบคุณสำหรับทุกคำอวยพร</span>
                  <FaHeart className="text-xs" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom Scrollbar Style */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f9a8d4;
          border-radius: 99px;
        }
      `}</style>
    </section>
  );
};

export default WishesSection;