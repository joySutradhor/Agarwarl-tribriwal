'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MdEmail } from 'react-icons/md';
import { FaThumbsUp } from 'react-icons/fa';

export default function ComingSoonPage() {
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const launchDate = new Date('2025-10-01T00:00:00');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = launchDate - now;

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setCountdown({ days: d, hours: h, minutes: m, seconds: s });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
   <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-gradient-to-br from-[#98b5f7d0] via-[#f5f9ff] to-[#98b5f7d0]">

      {/* Decorative Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-white to-transparent rounded-full blur-[200px] opacity-30 pointer-events-none z-0" />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-6xl bg-gradient-to-br from-[#98b4f7] via-gray-200 to-[#98b4f7] backdrop-blur-xl rounded-[32px] shadow-2xl p-8 md:p-20 text-center"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-white backdrop-blur-xl shadow-xl px-7 py-4 rounded-full">
            <Image
              src="/logo.jpg"
              alt="Logo"
              width={180}
              height={60}
              className="object-cover h-[40px] lg:h-[60px] w-full"
            />
          </div>
        </div>

      
        <p className="uppercase text-sm sm:text-base font-semibold text-gray-700 mt-10 xl:mt-16 ">We're still</p>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#101b4d] mt-2 mb-6">
          Coming Soon
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          We’re going to launch very soon. Stay tuned!
        </p>

        {/* Countdown */}
        <div className="flex justify-center gap-6 text-[#101b4d] font-bold text-xl sm:text-2xl mb-10">
          {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, index) => {
            const value = Object.values(countdown)[index].toString().padStart(2, '0');
            return (
              <div key={label} className="text-center">
                <div className="relative h-12 sm:h-14 w-16 sm:w-20 overflow-hidden mx-auto">
                  <motion.div
                    key={value}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white/70 rounded-lg shadow text-[#101b4d] text-xl sm:text-2xl font-extrabold"
                  >
                    {value}
                  </motion.div>
                </div>
                <div className="text-sm font-normal text-gray-600 mt-2">{label}</div>
              </div>
            );
          })}
        </div>

        {/* Notify Button */}
        <button
          onClick={() => setShowModal(true)}
          className=" cursor-pointer inline-flex items-center gap-3 bg-[#101b4d] text-white font-semibold px-8 py-4 rounded-full shadow hover:scale-105 transition-transform duration-300 text-lg"
        >
          <MdEmail className="text-2xl cursor-pointer" />
          Notify Me
        </button>
      </motion.div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className=" backdrop-blur-4xl p-8 rounded-2xl w-full max-w-lg shadow-xl relative"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-red-500 text-xl font-bold cursor-pointer" 
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-center mb-4 text-white">Get Notified</h2>
            <p className="text-white text-center mb-6 text-sm">
              Enter your email to be notified when we launch!
            </p>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="you@example.com"
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#101b4d] bg-white/70"
              />
              <button
                type="submit"
                className="bg-[#101b4d] text-white py-3 rounded-lg font-semibold hover:scale-105 transition cursor-pointer"
              >
                Notify Me
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
