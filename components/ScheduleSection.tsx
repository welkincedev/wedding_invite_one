"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/data/weddingConfig";
import { MapPin, Calendar, Clock, Navigation } from "lucide-react";

export default function ScheduleSection() {
  const { events } = weddingConfig;

  return (
    <section className="section-padding" id="events">
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
            SAVE THE DATE
          </p>
          <h2
            className="text-3xl sm:text-5xl font-normal text-[#5a121d] leading-tight mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Celebration Schedule
          </h2>
          <div className="w-48 mx-auto my-2 opacity-85">
            <img
              src="/assets/floral-divider.svg"
              alt=""
              className="w-full h-auto"
            />
          </div>
          <p className="text-xs sm:text-sm text-[#78655d] leading-relaxed">
            We look forward to celebrating each precious milestone of this joyous day with you.
          </p>
        </motion.header>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6">
          {events.map((event, idx) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.85, delay: idx * 0.15 }}
              className="relative bg-[#fffdfa]/90 border border-[#d4a755]/40 rounded-2xl p-6 sm:p-9 flex flex-col justify-between shadow-md hover:shadow-xl transition-shadow"
            >
              <div>
                {/* Status Badge */}
                <div className="absolute top-5 right-5">
                  {event.timeConfirmed ? (
                    <span className="text-[0.6rem] font-bold tracking-[0.16em] uppercase px-3 py-1 rounded-full bg-[#5a121d]/10 text-[#5a121d] border border-[#5a121d]/20">
                      CONFIRMED
                    </span>
                  ) : (
                    <span className="text-[0.6rem] font-bold tracking-[0.16em] uppercase px-3 py-1 rounded-full bg-[#b98c39]/15 text-[#936b23] border border-[#b98c39]/30">
                      TIME TO BE CONFIRMED
                    </span>
                  )}
                </div>

                <p
                  className="text-[0.65rem] tracking-[0.22em] text-[#b98c39] font-bold uppercase mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {event.category}
                </p>

                <h3
                  className="text-2xl sm:text-3xl font-semibold text-[#5a121d] mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {event.title}
                </h3>

                {/* Details Meta */}
                <div className="flex flex-col gap-3 py-4 my-2 border-y border-[#d4a755]/25">
                  <div className="flex items-start gap-3 text-xs sm:text-sm text-[#4e3c36]">
                    <Calendar className="w-4 h-4 text-[#b98c39] shrink-0 mt-0.5" />
                    <span>{event.dateDisplay}</span>
                  </div>

                  <div className="flex items-start gap-3 text-xs sm:text-sm text-[#4e3c36]">
                    <Clock className="w-4 h-4 text-[#b98c39] shrink-0 mt-0.5" />
                    <span className={event.timeConfirmed ? "font-bold text-[#5a121d]" : "font-semibold text-[#936b23]"}>
                      {event.timeDisplay}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 text-xs sm:text-sm text-[#4e3c36]">
                    <MapPin className="w-4 h-4 text-[#b98c39] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#5a121d] font-semibold">
                        {event.venueName}
                      </strong>
                      <span className="text-xs text-[#78655d]">
                        {event.venueAddress}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#78655d] leading-relaxed my-3">
                  {event.description}
                </p>
              </div>

              {/* Map Button */}
              <div className="mt-4 pt-2">
                <a
                  href={event.mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-card-map"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions (Google Maps)</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="text-center text-xs italic text-[#78655d] max-w-[550px] mx-auto">
          <em>Note:</em> The reception schedule will be finalized and confirmed with guests prior to the wedding date.
        </p>
      </div>
    </section>
  );
}
