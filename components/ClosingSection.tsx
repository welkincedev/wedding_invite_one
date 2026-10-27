"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingConfig, assetPath } from "@/data/weddingConfig";

export default function ClosingSection() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <section className="relative bg-gradient-to-br from-[#343C32] via-[#283027] to-[#1C221B] text-white py-16 sm:py-24 px-4 sm:px-6 text-center overflow-hidden">
        {/* Subtle Geometric Overlay */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `url('${assetPath("/assets/islamic-pattern.svg")}')`,
            backgroundSize: "80px 80px"
          }}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.85 }}
          className="relative z-10 max-w-[680px] mx-auto flex flex-col items-center"
        >
          {/* Sage Monogram Crest */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mb-5 sm:mb-6 drop-shadow-lg">
            <img
              src={assetPath("/assets/sage-monogram-crest.svg")}
              alt="Aleena & Siyad Monogram Crest"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Arabic Dua */}
          <p
            lang="ar"
            dir="rtl"
            className="font-arabic text-2xl sm:text-3xl md:text-4xl text-[#E4D5B7] font-normal leading-[1.85] tracking-normal mb-3 max-w-[620px] mx-auto select-text"
          >
            {weddingConfig.islamic.duaArabic}
          </p>

          {/* English Dua */}
          <p
            className="text-sm sm:text-base md:text-lg italic text-[#DCE3D5] mb-6 max-w-[520px] mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            “{weddingConfig.islamic.duaEnglish}”
          </p>

          {/* Gold Filigree Rule */}
          <div
            className="flex items-center justify-center gap-3 text-[#C6AD76] my-2 sm:my-3 opacity-75"
            aria-hidden="true"
          >
            <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent via-[#C6AD76] to-transparent" />
            <span className="text-[0.6rem]">✦</span>
            <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent via-[#C6AD76] to-transparent" />
          </div>

          {/* Names */}
          <h2
            className="text-[clamp(2.1rem,6vw,3.75rem)] font-normal text-white leading-tight my-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {weddingConfig.couple.bride.fullName}{" "}
            <span
              className="text-[#C6AD76] italic font-normal text-[0.85em] mx-1"
              style={{ fontFamily: "var(--font-script)" }}
            >
              &amp;
            </span>{" "}
            {weddingConfig.couple.groom.fullName}
          </h2>

          {/* Closing Wish */}
          <p
            className="text-sm sm:text-base tracking-[0.18em] uppercase text-[#C6AD76] mb-6 font-medium"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {weddingConfig.islamic.closingWish}
          </p>

          {/* Date & Venue Badge */}
          <div className="inline-block text-[0.68rem] sm:text-xs tracking-[0.2em] text-[#C6AD76] uppercase border border-[#C6AD76]/40 rounded-full px-5 py-2.5 bg-white/5 backdrop-blur-sm">
            13 December 2026 &middot; Kuthiathode Juma Masjid
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 bg-[#181E17] text-[#9EA89A] text-xs text-center border-t border-[#C6AD76]/15">
        <p>
          Crafted with love for <strong>Aleena &amp; Siyad</strong> &middot; {currentYear}
        </p>
        <p className="mt-1 text-[0.7rem] opacity-75">
          Designed by{" "}
          <a
            href={weddingConfig.brand.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C6AD76] underline underline-offset-2"
          >
            {weddingConfig.brand.name}
          </a>{" "}
          &middot; {weddingConfig.brand.tagline}
        </p>
      </footer>
    </>
  );
}
