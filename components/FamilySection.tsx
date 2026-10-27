"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/data/weddingConfig";

export default function FamilySection() {
  const { bride, groom } = weddingConfig.couple;

  return (
    <section className="section-padding" id="families">
      <div className="container-standard">
        {/* Section Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-[620px] mx-auto mb-10 sm:mb-14"
        >
          <p
            className="text-xs tracking-[0.28em] text-[#b98c39] font-semibold mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            WITH LOVE &amp; GRATITUDE
          </p>
          <h2
            className="text-3xl sm:text-5xl font-normal text-[#5a121d] leading-tight mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            The Families
          </h2>
          <div className="w-48 mx-auto my-2 opacity-85">
            <img
              src="/assets/floral-divider.svg"
              alt=""
              className="w-full h-auto"
            />
          </div>
          <p className="text-xs sm:text-sm text-[#78655d] leading-relaxed">
            Honouring the roots, prayers, and generations that shaped this blessed union.
          </p>
        </motion.header>

        {/* Family Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Bride Family Card */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.85, delay: 0.1 }}
            className="relative bg-[#fffdfa]/90 border border-[#d4a755]/40 rounded-2xl p-6 sm:p-9 text-center shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="w-12 h-12 rounded-full border border-[#d4a755] flex items-center justify-center mx-auto mb-4 bg-[#faf6f0] shadow-sm">
              <span
                className="text-xl font-bold text-[#5a121d]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                A
              </span>
            </div>

            <p
              className="text-[0.68rem] tracking-[0.24em] text-[#b98c39] font-semibold mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              BRIDE&apos;S FAMILY
            </p>

            <h3
              className="text-2xl sm:text-3xl font-semibold text-[#5a121d] leading-tight mb-1"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {bride.family.parents}
            </h3>

            <p className="text-xs sm:text-sm text-[#78655d] mb-4">
              {bride.family.residence}
            </p>

            <hr className="w-36 h-[1px] bg-gradient-to-r from-transparent via-[#d4a755]/50 to-transparent border-0 mx-auto my-4" />

            <div className="bg-[#faf6f0]/70 border border-dashed border-[#d4a755]/30 rounded-lg p-3 sm:p-4 text-left">
              <p className="text-[0.72rem] font-semibold tracking-wider text-[#b98c39] mb-1.5 uppercase">
                With the loving memory and blessings of grandparents:
              </p>
              <p className="text-xs text-[#4e3c36] leading-relaxed">
                {bride.family.lineage}
              </p>
            </div>
          </motion.article>

          {/* Groom Family Card */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.85, delay: 0.2 }}
            className="relative bg-[#fffdfa]/90 border border-[#d4a755]/40 rounded-2xl p-6 sm:p-9 text-center shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="w-12 h-12 rounded-full border border-[#d4a755] flex items-center justify-center mx-auto mb-4 bg-[#faf6f0] shadow-sm">
              <span
                className="text-xl font-bold text-[#5a121d]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                S
              </span>
            </div>

            <p
              className="text-[0.68rem] tracking-[0.24em] text-[#b98c39] font-semibold mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              GROOM&apos;S FAMILY
            </p>

            <h3
              className="text-2xl sm:text-3xl font-semibold text-[#5a121d] leading-tight mb-1"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {groom.family.parents}
            </h3>

            <p className="text-xs sm:text-sm text-[#78655d] mb-4">
              {groom.family.residence}
            </p>

            <hr className="w-36 h-[1px] bg-gradient-to-r from-transparent via-[#d4a755]/50 to-transparent border-0 mx-auto my-4" />

            <div className="bg-[#faf6f0]/70 border border-dashed border-[#d4a755]/30 rounded-lg p-3 sm:p-4 text-left">
              <p className="text-[0.72rem] font-semibold tracking-wider text-[#b98c39] mb-1.5 uppercase">
                With the prayers &amp; blessings of family:
              </p>
              <p className="text-xs italic text-[#4e3c36] leading-relaxed">
                {groom.family.blessingNote}
              </p>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
