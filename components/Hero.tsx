"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/data/weddingConfig";
import { Calendar, ChevronDown } from "lucide-react";

interface HeroProps {
  onAddToCalendar: () => void;
}

export default function Hero({ onAddToCalendar }: HeroProps) {
  return (
    <header className="relative min-h-[100svh] flex flex-col items-center justify-between text-center px-4 sm:px-6 pt-[max(2.5rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] overflow-hidden">
      {/* Decorative Sage Divider Top */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[280px] sm:max-w-[340px] mb-3 opacity-85 pointer-events-none mx-auto"
        aria-hidden="true"
      >
        <img
          src="/assets/sage-divider.svg"
          alt=""
          className="w-full h-auto"
        />
      </motion.div>

      <div className="w-full max-w-[760px] mx-auto relative z-10 flex flex-col items-center flex-grow justify-center py-2">
        {/* Arabic Bismillah Calligraphy & Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-3 max-w-[540px] mx-auto w-full"
        >
          <div className="max-w-[300px] sm:max-w-[350px] mx-auto mb-1.5">
            <img
              src="/assets/bismillah-sage.svg"
              alt="Bismillahir Rahmanir Rahim in Arabic Calligraphy"
              className="w-full h-auto drop-shadow-sm"
            />
          </div>
          <p
            lang="ar"
            dir="rtl"
            className="font-arabic text-xl sm:text-2xl text-[#343C32] font-normal leading-[1.8] tracking-normal my-1 select-text"
          >
            {weddingConfig.islamic.bismillahArabic}
          </p>
          <p
            className="text-xs sm:text-sm italic text-[#4A5547] mt-1 font-medium leading-relaxed max-w-[480px] mx-auto"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            “{weddingConfig.islamic.bismillahEnglish}”
          </p>
        </motion.div>

        {/* Champagne Gold Filigree Rule */}
        <div
          className="flex items-center justify-center gap-3 text-[#C6AD76] my-2 sm:my-3 opacity-80"
          aria-hidden="true"
        >
          <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-[#C6AD76] to-transparent" />
          <span className="text-[0.65rem]">✦</span>
          <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-[#C6AD76] to-transparent" />
        </div>

        {/* Lead Invitation Text */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25 }}
          className="w-full"
        >
          <p
            className="text-[0.68rem] sm:text-xs tracking-[0.25em] text-[#74866D] font-semibold mb-1 uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Together with their families
          </p>
          <p
            className="hero-lead-text italic text-[#4A5547] max-w-[560px] mx-auto mb-3 sm:mb-4 leading-relaxed"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            We cordially invite you to celebrate the Nikah of our beloved daughter
          </p>
        </motion.div>

        {/* Couple Names Editorial Typography (Primary Focal Point) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.4 }}
          className="my-2 sm:my-3.5 w-full"
        >
          <h1
            className="hero-couple-title font-normal text-[#343C32] break-words"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {weddingConfig.couple.bride.fullName}
          </h1>

          <div
            className="flex items-center justify-center gap-3 sm:gap-4 my-1.5 sm:my-2"
            aria-hidden="true"
          >
            <span className="w-8 sm:w-14 h-[1px] bg-[#C6AD76]/45" />
            <em
              className="text-xl sm:text-2xl md:text-3xl text-[#C6AD76] font-normal leading-none"
              style={{ fontFamily: "var(--font-script)" }}
            >
              with
            </em>
            <span className="w-8 sm:w-14 h-[1px] bg-[#C6AD76]/45" />
          </div>

          <h1
            className="hero-couple-title font-normal text-[#343C32] break-words"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {weddingConfig.couple.groom.fullName}
          </h1>
        </motion.div>

        {/* Groom Lineage Subtext */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-xs sm:text-sm text-[#4A5547] max-w-[520px] mx-auto leading-relaxed my-1.5"
        >
          <strong className="text-[#343C32] font-semibold block">
            {weddingConfig.couple.groom.family.parents}
          </strong>
          <span className="text-[#817E72] text-[0.76rem] sm:text-xs block mt-0.5">
            {weddingConfig.couple.groom.family.residence}
          </span>
        </motion.div>

        <p
          className="text-xl sm:text-2xl md:text-3xl text-[#C6AD76] my-1.5 sm:my-2"
          style={{ fontFamily: "var(--font-script)" }}
        >
          Insha&apos;Allah
        </p>

        {/* Date Cluster Stationery Tile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="inline-flex items-center justify-center gap-4 sm:gap-8 bg-[#FFFEFA]/95 border border-[#C6AD76]/45 rounded-2xl shadow-sm px-5 sm:px-9 py-3 sm:py-3.5 my-3 sm:my-4 max-w-[95%]"
        >
          <div className="flex flex-col items-center">
            <span className="text-[0.6rem] sm:text-[0.65rem] tracking-[0.2em] text-[#74866D] font-semibold uppercase">
              DATE
            </span>
            <strong
              className="text-base sm:text-xl md:text-2xl font-bold text-[#343C32] tracking-wide"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              13 DEC 2026
            </strong>
            <span className="text-[0.72rem] sm:text-xs text-[#817E72]">Sunday</span>
          </div>

          <div
            className="w-[1px] h-8 sm:h-9 bg-gradient-to-b from-transparent via-[#C6AD76] to-transparent"
            aria-hidden="true"
          />

          <div className="flex flex-col items-center">
            <span className="text-[0.6rem] sm:text-[0.65rem] tracking-[0.2em] text-[#74866D] font-semibold uppercase">
              NIKAH CEREMONY
            </span>
            <strong
              className="text-base sm:text-xl md:text-2xl font-bold text-[#343C32] tracking-wide"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              11:00 AM
            </strong>
            <span className="text-[0.72rem] sm:text-xs text-[#817E72]">Kuthiathode Masjid</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap my-2"
        >
          <a href="#events" className="btn btn-sage-primary">
            <span>View Schedule</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
          <button
            type="button"
            onClick={onAddToCalendar}
            className="btn btn-ivory-outline"
          >
            <Calendar className="w-4 h-4 text-[#C6AD76]" />
            <span>Add to Calendar</span>
          </button>
        </motion.div>
      </div>

      {/* Subtle Scroll Cue */}
      <div className="pt-2 text-center text-[#817E72] text-[0.65rem] tracking-[0.24em] flex flex-col items-center gap-1 opacity-75">
        <span>SCROLL TO EXPLORE</span>
        <span className="text-sm animate-bounce" aria-hidden="true">&darr;</span>
      </div>
    </header>
  );
}
