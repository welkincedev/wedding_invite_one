"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/data/weddingConfig";

export default function ClosingSection() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <section className="relative bg-gradient-to-br from-[#460d14] via-[#35080e] to-[#240407] text-white py-16 sm:py-24 px-4 text-center overflow-hidden">
        {/* Subtle Geometric Overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "url('/assets/islamic-pattern.svg')",
            backgroundSize: "80px 80px"
          }}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9 }}
          className="relative z-10 max-w-[680px] mx-auto flex flex-col items-center"
        >
          {/* Wax Seal Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mb-6 drop-shadow-xl">
            <img
              src="/assets/wax-seal.svg"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>

          {/* Arabic Dua */}
          <p
            className="text-2xl sm:text-4xl text-[#f6dfb3] font-bold leading-relaxed mb-3"
            style={{ fontFamily: "var(--font-arabic)" }}
            lang="ar"
          >
            {weddingConfig.islamic.duaArabic}
          </p>

          {/* English Dua */}
          <p
            className="text-base sm:text-xl italic text-[#eed5cc] mb-6 max-w-[500px]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            “{weddingConfig.islamic.duaEnglish}”
          </p>

          {/* Names */}
          <h2
            className="text-3xl sm:text-5xl font-normal text-white mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {weddingConfig.couple.bride.fullName}{" "}
            <span
              className="text-[#d4a755] italic font-normal"
              style={{ fontFamily: "var(--font-script)" }}
            >
              &amp;
            </span>{" "}
            {weddingConfig.couple.groom.fullName}
          </h2>

          {/* Closing Wish */}
          <p
            className="text-base sm:text-lg tracking-wider text-[#e5c382] mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {weddingConfig.islamic.closingWish}
          </p>

          {/* Date Badge */}
          <div className="inline-block text-[0.68rem] tracking-[0.22em] text-[#d4a755] uppercase border border-[#d4a755]/40 rounded-full px-5 py-2 bg-white/5">
            13 December 2026 &middot; Kuthiathode Juma Masjid
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 bg-[#1f0306] text-[#9d8b83] text-xs text-center border-t border-[#d4a755]/15">
        <p>
          Crafted with love for <strong>Aleena &amp; Siyad</strong> &middot; {currentYear}
        </p>
        <p className="mt-1 text-[0.7rem] opacity-75">
          Designed by{" "}
          <a
            href={weddingConfig.brand.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#d4a755] underline underline-offset-2"
          >
            {weddingConfig.brand.name}
          </a>{" "}
          &middot; {weddingConfig.brand.tagline}
        </p>
      </footer>
    </>
  );
}
