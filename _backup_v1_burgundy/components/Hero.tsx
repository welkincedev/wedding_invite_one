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
    <header className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 pt-16 pb-12 overflow-hidden">
      {/* Decorative Floral Top Frame */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-[340px] mb-5 opacity-85 pointer-events-none"
      >
        <img
          src="/assets/floral-divider.svg"
          alt=""
          className="w-full h-auto"
        />
      </motion.div>

      <div className="w-full max-w-[740px] mx-auto relative z-10">
        {/* Arabic Bismillah Calligraphy */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mb-5"
        >
          <img
            src="/assets/bismillah.svg"
            alt="Bismillahir Rahmanir Rahim in Arabic Calligraphy"
            className="w-full max-w-[320px] sm:max-w-[360px] mx-auto drop-shadow-sm"
          />
          <p
            className="text-sm sm:text-base italic text-[#4e3c36] mt-2 font-medium"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            “{weddingConfig.islamic.bismillahEnglish}”
          </p>
        </motion.div>

        {/* Gold Filigree Divider */}
        <div className="flex items-center justify-center gap-3 text-[#d4a755] my-4">
          <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-[#d4a755] to-transparent"></span>
          <span className="text-xs">✦</span>
          <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-[#d4a755] to-transparent"></span>
        </div>

        {/* Lead Invitation Text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xs sm:text-sm tracking-[0.25em] text-[#b98c39] font-semibold mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          TOGETHER WITH THEIR FAMILIES
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-xl italic text-[#4e3c36] max-w-[560px] mx-auto mb-4 leading-relaxed"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          We cordially invite you to celebrate the Nikah of our beloved daughter
        </motion.p>

        {/* Couple Names Typography */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="my-3 sm:my-5"
        >
          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-normal text-[#5a121d] leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {weddingConfig.couple.bride.fullName}
          </h1>

          <div className="flex items-center justify-center gap-4 my-2">
            <span className="w-10 sm:w-16 h-[1px] bg-[#d4a755]/50"></span>
            <em
              className="text-2xl sm:text-3xl text-[#b98c39] font-normal"
              style={{ fontFamily: "var(--font-script)" }}
            >
              with
            </em>
            <span className="w-10 sm:w-16 h-[1px] bg-[#d4a755]/50"></span>
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-normal text-[#5a121d] leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {weddingConfig.couple.groom.fullName}
          </h1>
        </motion.div>

        {/* Groom Lineage Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="text-xs sm:text-sm text-[#4e3c36] mt-2"
        >
          <strong className="text-[#5a121d]">
            {weddingConfig.couple.groom.family.parents}
          </strong>
          <br />
          <span className="text-[#78655d] text-xs">
            {weddingConfig.couple.groom.family.residence}
          </span>
        </motion.p>

        <p
          className="text-2xl sm:text-3xl text-[#b98c39] mt-3"
          style={{ fontFamily: "var(--font-script)" }}
        >
          Insha&apos;Allah
        </p>

        {/* Date Cluster Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="inline-flex items-center justify-center gap-3 sm:gap-6 bg-[#fffdfa]/85 border border-[#d4a755]/40 rounded-2xl shadow-md px-4 sm:px-8 py-3 sm:py-4 my-6"
        >
          <div className="flex flex-col items-center">
            <span className="text-[0.6rem] tracking-[0.2em] text-[#b98c39] font-semibold">
              DATE
            </span>
            <strong
              className="text-lg sm:text-2xl font-bold text-[#5a121d]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              13 DEC 2026
            </strong>
            <span className="text-xs text-[#78655d]">Sunday</span>
          </div>

          <div className="w-[1px] h-9 bg-gradient-to-b from-transparent via-[#d4a755] to-transparent" />

          <div className="flex flex-col items-center">
            <span className="text-[0.6rem] tracking-[0.2em] text-[#b98c39] font-semibold">
              TIME
            </span>
            <strong
              className="text-lg sm:text-2xl font-bold text-[#5a121d]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              11:00 AM
            </strong>
            <span className="text-xs text-[#78655d]">IST (Kerala)</span>
          </div>

          <div className="w-[1px] h-9 bg-gradient-to-b from-transparent via-[#d4a755] to-transparent" />

          <div className="flex flex-col items-center">
            <span className="text-[0.6rem] tracking-[0.2em] text-[#b98c39] font-semibold">
              HIJRI DATE
            </span>
            <strong
              className="text-base sm:text-xl font-bold text-[#5a121d]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {weddingConfig.dateTime.hijriDateString.replace(" AH", "")}
            </strong>
            <span className="text-xs text-[#78655d]">Islamic Calendar</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap"
        >
          <a href="#events" className="btn btn-luxury-burgundy">
            <span>View Schedule</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
          <button
            type="button"
            onClick={onAddToCalendar}
            className="btn btn-luxury-gold"
          >
            <Calendar className="w-4 h-4 text-[#b98c39]" />
            <span>Add to Calendar</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="mt-8 text-center text-[#78655d] text-[0.65rem] tracking-[0.25em] flex flex-col items-center gap-1 opacity-75">
        <span>SCROLL TO EXPLORE</span>
        <span className="text-sm animate-bounce">&darr;</span>
      </div>
    </header>
  );
}
