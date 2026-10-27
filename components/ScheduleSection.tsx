"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingConfig, assetPath } from "@/data/weddingConfig";
import { MapPin, Calendar, Clock, ExternalLink } from "lucide-react";

export default function ScheduleSection() {
  const { events } = weddingConfig;

  return (
    <section className="section-padding" id="events">
      <div className="container-standard">
        {/* Section Header */}
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-[640px] mx-auto mb-10 sm:mb-14"
        >
          <p
            className="text-xs tracking-[0.28em] text-[#74866D] font-semibold mb-2 uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            CELEBRATION DETAILS
          </p>
          <h2
            className="text-3xl sm:text-5xl font-normal text-[#343C32] leading-tight mb-2 tracking-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Wedding Events
          </h2>
          <div className="w-48 mx-auto my-3 opacity-90" aria-hidden="true">
            <img
              src={assetPath("/assets/sage-divider.svg")}
              alt=""
              className="w-full h-auto"
            />
          </div>
          <p className="text-xs sm:text-sm text-[#817E72] leading-relaxed">
            We warmly invite you to join us at each milestone of this blessed union.
          </p>
        </motion.header>

        {/* Premium Glassmorphic Event Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-9 mb-8 items-stretch">
          {events.map((event, idx) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.85, delay: idx * 0.15 }}
              className="event-glass-card group flex flex-col h-full"
            >
              {/* Photo Area */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#F7F3E9]">
                <img
                  src={event.imageSrc}
                  alt={event.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Cinematic Vignette Overlay for High Contrast */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#273026]/85 via-[#273026]/25 to-black/30 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Top Floating Glass Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                  <span className="event-glass-badge">
                    {event.category}
                  </span>

                  {event.timeConfirmed ? (
                    <span className="event-glass-status bg-[#74866D]/90 text-[#FFFEFA] border border-[#C6AD76]/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFFEFA] animate-pulse" />
                      Confirmed
                    </span>
                  ) : (
                    <span className="event-glass-status bg-[#FFFEFA]/90 text-[#343C32] border border-[#C6AD76]/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C6AD76]" />
                      Schedule to be announced
                    </span>
                  )}
                </div>

                {/* Subtle Ambiance Caption */}
                {event.imageCaption && (
                  <div className="absolute bottom-3 right-4 z-10 text-[0.62rem] tracking-wider text-white/80 bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                    {event.imageCaption}
                  </div>
                )}
              </div>

              {/* Translucent Glass Content Panel */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <h3
                    className="text-2xl sm:text-3xl font-normal text-[#343C32] leading-tight mb-2.5"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {event.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#817E72] leading-relaxed mb-5">
                    {event.description}
                  </p>

                  {/* Structured Details Box */}
                  <div className="rounded-2xl bg-white/75 border border-[#C6AD76]/35 p-4 sm:p-5 flex flex-col gap-3.5 mb-6 backdrop-blur-sm shadow-sm">
                    {/* Date & Time Row */}
                    {event.timeConfirmed && event.dateDisplay ? (
                      <div className="flex items-start gap-3 text-xs sm:text-sm">
                        <Calendar className="w-4 h-4 text-[#74866D] shrink-0 mt-0.5" />
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 text-[#343C32]">
                          <strong className="font-semibold">{event.dateDisplay}</strong>
                          <span className="hidden sm:inline text-[#C6AD76]">&middot;</span>
                          <span className="flex items-center gap-1.5 text-[#4A5547] font-medium">
                            <Clock className="w-3.5 h-3.5 text-[#74866D]" />
                            {event.timeDisplay}
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* Graceful Handling of Unconfirmed Reception Schedule */
                      <div className="flex items-start gap-3 text-xs sm:text-sm text-[#817E72]">
                        <Clock className="w-4 h-4 text-[#C6AD76] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-[#343C32]">
                            Date &amp; Timing
                          </span>
                          <span className="block text-[0.76rem] text-[#817E72] mt-0.5">
                            To be announced by the family once confirmed
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="w-full h-[1px] bg-[#C6AD76]/20" aria-hidden="true" />

                    {/* Venue & Location Row */}
                    <div className="flex items-start gap-3 text-xs sm:text-sm">
                      <MapPin className="w-4 h-4 text-[#74866D] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[#343C32] font-semibold text-sm sm:text-base">
                          {event.venueName}
                        </strong>
                        <span className="text-xs text-[#817E72] block mt-0.5">
                          {event.venueAddress}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Get Directions Button */}
                <div className="pt-2">
                  <a
                    href={event.mapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sage-primary w-full py-3.5 text-xs sm:text-sm font-semibold tracking-wider flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all"
                  >
                    <MapPin className="w-4 h-4 text-[#C6AD76]" />
                    <span>Get Directions</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-75 ml-0.5" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="text-center text-xs italic text-[#817E72] max-w-[550px] mx-auto">
          <em>Note:</em> The reception schedule will be finalized and shared with guests before the celebration.
        </p>
      </div>
    </section>
  );
}
