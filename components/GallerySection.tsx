"use client";

import React from "react";
import { motion } from "framer-motion";

export default function GallerySection() {
  const highlights = [
    {
      id: "suite",
      title: "Artisan Wedding Suite & Wax Seal",
      category: "STATIONERY",
      src: "/assets/gallery/gallery-suite.webp",
      alt: "Fine Art Wedding Invitation Suite with Gold Script and Wax Seal"
    },
    {
      id: "florals",
      title: "Burgundy Roses & Candlelight Ambience",
      category: "BOTANICALS",
      src: "/assets/gallery/gallery-florals.webp",
      alt: "Romantic Burgundy Roses and Candlelight Wedding Decor"
    },
    {
      id: "paper",
      title: "Deckle Edge Paper Craftsmanship",
      category: "CRAFTSMANSHIP",
      src: "/assets/gallery/gallery-stationery.webp",
      alt: "Handmade Deckle Edge Cotton Paper Wedding Stationery"
    }
  ];

  return (
    <section className="section-padding" id="gallery">
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
            MOMENTS &amp; ELEGANCE
          </p>
          <h2
            className="text-3xl sm:text-5xl font-normal text-[#5a121d] leading-tight mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Invitation Highlights
          </h2>
          <div className="w-48 mx-auto my-2 opacity-85">
            <img
              src="/assets/floral-divider.svg"
              alt=""
              className="w-full h-auto"
            />
          </div>
          <p className="text-xs sm:text-sm text-[#78655d] leading-relaxed">
            A glimpse into the thoughtful aesthetics and romantic botanical touches of this celebration.
          </p>
        </motion.header>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          {highlights.map((item, idx) => (
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.85, delay: idx * 0.15 }}
              className="group bg-white border border-[#d4a755]/40 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              <div className="overflow-hidden aspect-[4/3] bg-[#faf6f0]">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <figcaption className="p-4 sm:p-5 text-left">
                <span
                  className="block text-[0.6rem] font-bold tracking-[0.2em] text-[#b98c39] mb-1 uppercase"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.category}
                </span>
                <h4
                  className="text-base sm:text-lg font-semibold text-[#5a121d] leading-snug"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {item.title}
                </h4>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <p className="text-center text-xs italic text-[#78655d]">
          Family and couple photo memories will be updated here as the wedding day approaches.
        </p>
      </div>
    </section>
  );
}
