"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/data/weddingConfig";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
    isPassed: false,
    isToday: false
  });

  useEffect(() => {
    // Target timestamp locked to Asia/Kolkata
    const targetTimestamp = new Date(weddingConfig.dateTime.nikahIsoTime).getTime();

    const calculate = () => {
      const now = Date.now();
      const diff = targetTimestamp - now;

      if (diff <= 0) {
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
          isPassed: diff <= -86400000,
          isToday: diff > -86400000
        });
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
        isPassed: false,
        isToday: false
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  let statusMessage = "Until our beautiful journey begins, Insha'Allah";
  if (timeLeft.isToday) {
    statusMessage = "Today is the blessed wedding day. Alhamdulillah!";
  } else if (timeLeft.isPassed) {
    statusMessage = "The Nikah has taken place. May Allah shower the couple with barakah.";
  }

  return (
    <section className="section-padding text-center" id="countdown">
      <div className="container-standard">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.85 }}
          className="bg-[#FFFEFA]/90 border border-[#C6AD76]/40 rounded-3xl p-6 sm:p-12 max-w-[780px] mx-auto shadow-sm"
        >
          <p
            className="text-xs tracking-[0.28em] text-[#74866D] font-semibold mb-2 uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Counting The Moments
          </p>
          <h2
            className="text-3xl sm:text-5xl font-normal text-[#343C32] leading-tight mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Until the Sacred Nikah
          </h2>
          <p className="text-xs sm:text-sm text-[#817E72] mb-6">
            Sunday, 13 December 2026 &middot; 11:00 AM IST &middot; Kuthiathode Juma Masjid
          </p>

          <div
            className="flex items-center justify-center gap-2 sm:gap-4 my-6 select-none"
            aria-live="polite"
          >
            {/* Days */}
            <div className="flex-1 max-w-[110px] bg-[#F7F3E9]/80 border border-[#C6AD76]/30 rounded-xl py-3.5 sm:py-5 px-2 shadow-sm">
              <span
                className="block text-2xl sm:text-5xl font-bold text-[#343C32] tabular-nums"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {timeLeft.days}
              </span>
              <span
                className="block text-[0.6rem] sm:text-xs tracking-[0.2em] text-[#74866D] font-semibold mt-1 uppercase"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Days
              </span>
            </div>

            <span className="hidden sm:inline text-2xl font-serif text-[#C6AD76]/60 pb-3">
              :
            </span>

            {/* Hours */}
            <div className="flex-1 max-w-[110px] bg-[#F7F3E9]/80 border border-[#C6AD76]/30 rounded-xl py-3.5 sm:py-5 px-2 shadow-sm">
              <span
                className="block text-2xl sm:text-5xl font-bold text-[#343C32] tabular-nums"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {timeLeft.hours}
              </span>
              <span
                className="block text-[0.6rem] sm:text-xs tracking-[0.2em] text-[#74866D] font-semibold mt-1 uppercase"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Hours
              </span>
            </div>

            <span className="hidden sm:inline text-2xl font-serif text-[#C6AD76]/60 pb-3">
              :
            </span>

            {/* Minutes */}
            <div className="flex-1 max-w-[110px] bg-[#F7F3E9]/80 border border-[#C6AD76]/30 rounded-xl py-3.5 sm:py-5 px-2 shadow-sm">
              <span
                className="block text-2xl sm:text-5xl font-bold text-[#343C32] tabular-nums"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {timeLeft.minutes}
              </span>
              <span
                className="block text-[0.6rem] sm:text-xs tracking-[0.2em] text-[#74866D] font-semibold mt-1 uppercase"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Minutes
              </span>
            </div>

            <span className="hidden sm:inline text-2xl font-serif text-[#C6AD76]/60 pb-3">
              :
            </span>

            {/* Seconds */}
            <div className="flex-1 max-w-[110px] bg-[#F7F3E9]/80 border border-[#C6AD76]/30 rounded-xl py-3.5 sm:py-5 px-2 shadow-sm">
              <span
                className="block text-2xl sm:text-5xl font-bold text-[#343C32] tabular-nums"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {timeLeft.seconds}
              </span>
              <span
                className="block text-[0.6rem] sm:text-xs tracking-[0.2em] text-[#74866D] font-semibold mt-1 uppercase"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Seconds
              </span>
            </div>
          </div>

          <p
            className="text-sm sm:text-base italic text-[#74866D] my-4"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {statusMessage}
          </p>

          <div className="mt-4">
            <a href="#rsvp" className="btn btn-sage-primary">
              RSVP Your Attendance
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
