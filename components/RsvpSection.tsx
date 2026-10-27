"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/data/weddingConfig";
import { MessageSquareShare } from "lucide-react";

interface RsvpSectionProps {
  onShowToast: (msg: string) => void;
}

export default function RsvpSection({ onShowToast }: RsvpSectionProps) {
  const [guestName, setGuestName] = useState("");
  const [attendance, setAttendance] = useState("Joyfully accepts");
  const [guestCount, setGuestCount] = useState("2");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = guestName.trim();
    if (!trimmedName) {
      onShowToast("Please enter your name.");
      return;
    }

    const { bride, groom } = weddingConfig.couple;
    const whatsappLines = [
      "Assalamu Alaikum!",
      `RSVP for the Nikah of *${bride.fullName} & ${groom.fullName}*`,
      "",
      `👤 *Guest Name:* ${trimmedName}`,
      `✨ *Attendance:* ${attendance}`,
      `👥 *Number of Guests:* ${guestCount}`
    ];

    if (message.trim()) {
      whatsappLines.push(`💌 *Dua / Message:* ${message.trim()}`);
    }

    whatsappLines.push("");
    whatsappLines.push("Sent via Aleena & Siyad's Wedding Invitation Website");

    const encodedText = encodeURIComponent(whatsappLines.join("\n"));
    const phone = weddingConfig.rsvp.whatsappNumber;
    const targetUrl = `https://wa.me/${phone}?text=${encodedText}`;

    window.open(targetUrl, "_blank", "noopener,noreferrer");
    onShowToast("Opening WhatsApp... Tap 'Send' to submit your RSVP.");
  };

  return (
    <section className="section-padding" id="rsvp">
      <div className="container-standard">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.85 }}
          className="bg-[#fffdfa]/95 border border-[#d4a755]/50 rounded-3xl p-6 sm:p-12 max-w-[680px] mx-auto shadow-xl"
        >
          {/* Header */}
          <header className="text-center mb-8">
            <p
              className="text-xs tracking-[0.28em] text-[#b98c39] font-semibold mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              KINDLY REPLY
            </p>
            <h2
              className="text-3xl sm:text-5xl font-normal text-[#5a121d] leading-tight mb-2"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Will You Join Us?
            </h2>
            <div className="w-48 mx-auto my-2 opacity-85">
              <img
                src="/assets/floral-divider.svg"
                alt=""
                className="w-full h-auto"
              />
            </div>
            <p className="text-xs sm:text-sm text-[#78655d] leading-relaxed">
              Your prayers, warm smiles, and presence will make our union truly blessed.
              <br />
              Please send your RSVP to the family via WhatsApp.
            </p>
          </header>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="guestName"
                className="text-xs font-semibold text-[#4e3c36] tracking-wide"
              >
                Your Full Name <span className="text-[#8a222e]">*</span>
              </label>
              <input
                type="text"
                id="guestName"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Dr. Haris & Family"
                className="w-full p-3 sm:p-3.5 bg-white border border-[#d4a755]/40 rounded-lg text-sm text-[#2b1f1c] focus:outline-none focus:border-[#d4a755] focus:ring-2 focus:ring-[#d4a755]/20 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="attendance"
                  className="text-xs font-semibold text-[#4e3c36] tracking-wide"
                >
                  Your Attendance <span className="text-[#8a222e]">*</span>
                </label>
                <select
                  id="attendance"
                  value={attendance}
                  onChange={(e) => setAttendance(e.target.value)}
                  className="w-full p-3 sm:p-3.5 bg-white border border-[#d4a755]/40 rounded-lg text-sm text-[#2b1f1c] focus:outline-none focus:border-[#d4a755] focus:ring-2 focus:ring-[#d4a755]/20 transition-all"
                >
                  <option value="Joyfully accepts">✨ Joyfully accepts</option>
                  <option value="Regretfully declines">💌 Regretfully declines</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="guestCount"
                  className="text-xs font-semibold text-[#4e3c36] tracking-wide"
                >
                  Total Number of Guests
                </label>
                <select
                  id="guestCount"
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full p-3 sm:p-3.5 bg-white border border-[#d4a755]/40 rounded-lg text-sm text-[#2b1f1c] focus:outline-none focus:border-[#d4a755] focus:ring-2 focus:ring-[#d4a755]/20 transition-all"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5 Guests</option>
                  <option value="6+">6 or more Guests</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="guestMessage"
                className="text-xs font-semibold text-[#4e3c36] tracking-wide"
              >
                Dua / Warm Wishes for the Couple (Optional)
              </label>
              <textarea
                id="guestMessage"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a warm prayer or blessing for Aleena & Siyad..."
                className="w-full p-3 sm:p-3.5 bg-white border border-[#d4a755]/40 rounded-lg text-sm text-[#2b1f1c] focus:outline-none focus:border-[#d4a755] focus:ring-2 focus:ring-[#d4a755]/20 transition-all resize-y"
              />
            </div>

            <div className="mt-2">
              <button
                type="submit"
                className="btn btn-luxury-burgundy w-full py-3.5 text-sm"
              >
                <MessageSquareShare className="w-4 h-4 text-[#d4a755]" />
                <span>Send RSVP via WhatsApp</span>
              </button>
            </div>

            <p className="text-center text-xs text-[#78655d] leading-relaxed mt-1">
              WhatsApp will open with your customized message.{" "}
              <strong>Please tap Send in WhatsApp to complete your RSVP.</strong>
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
