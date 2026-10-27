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
      title: "Sage Botanicals & Candlelight Ambience",
      category: "BOTANICALS",
      src: "/assets/gallery/gallery-florals.webp",
      alt: "Romantic Sage Botanicals and Candlelight Wedding Decor"
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
            className="text-xs tracking-[0.28em] text-[#C6AD76] font-semibold mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            MOMENTS &amp; ELEGANCE
          </p>
          <h2
            className="text-3xl sm:text-5xl font-normal text-[#343C32] leading-tight mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Invitation Highlights
          </h2>
          <div className="w-48 mx-auto my-3 opacity-90">
            <img
              src="/assets/sage-divider.svg"
              alt=""
              className="w-full h-auto"
            />
          </div>
          <p className="text-xs sm:text-sm text-[#817E72] leading-relaxed">
            A glimpse into the thoughtful aesthetics and organic botanical touches of this heirloom celebration.
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
              className="group bg-[#FFFEFA] border border-[#C6AD76]/35 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              <div className="overflow-hidden aspect-[4/3] bg-[#F7F3E9]">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <figcaption className="p-4 sm:p-5 text-left">
                <span
                  className="block text-[0.6rem] font-bold tracking-[0.2em] text-[#C6AD76] mb-1 uppercase"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.category}
                </span>
                <h4
                  className="text-base sm:text-lg font-semibold text-[#343C32] leading-snug"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {item.title}
                </h4>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <p className="text-center text-xs italic text-[#817E72]">
          Family and couple photo memories will be updated here as the wedding day approaches.
        </p>
      </div>
    </section>
  );
}
