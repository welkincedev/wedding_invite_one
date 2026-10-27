"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/data/weddingConfig";
import {
  CheckCircle2,
  HelpCircle,
  XCircle,
  ArrowLeft,
  Send,
  AlertCircle,
  Users,
  User,
  MessageSquare
} from "lucide-react";

interface RsvpSectionProps {
  onShowToast: (msg: string) => void;
}

type AttendanceOption = "Joyfully Yes!" | "Maybe" | "Respectfully No!";

export default function RsvpSection({ onShowToast }: RsvpSectionProps) {
  const [selectedAttendance, setSelectedAttendance] = useState<AttendanceOption | null>(null);
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState<number>(1);
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const attendanceOptions: {
    label: AttendanceOption;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    accentClass: string;
  }[] = [
    {
      label: "Joyfully Yes!",
      description: "Delighted to attend and celebrate with you",
      icon: CheckCircle2,
      accentClass: "text-[#74866D]"
    },
    {
      label: "Maybe",
      description: "Hoping to attend, will confirm soon",
      icon: HelpCircle,
      accentClass: "text-[#C6AD76]"
    },
    {
      label: "Respectfully No!",
      description: "Sending our warm prayers and best wishes from afar",
      icon: XCircle,
      accentClass: "text-[#817E72]"
    }
  ];

  const handleSelectAttendance = (option: AttendanceOption) => {
    setSelectedAttendance(option);
    // Smooth scroll if card header is partially scrolled past
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      if (rect.top < 60) {
        cardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleBackToOptions = () => {
    setSelectedAttendance(null);
    setNameError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = guestName.trim();
    if (!trimmedName) {
      setNameError("Please enter your name to proceed.");
      onShowToast("Please enter your name.");
      return;
    }
    setNameError("");

    const phone = weddingConfig.rsvp.whatsappNumber?.replace(/\D/g, "");
    if (!phone || phone.length < 8) {
      onShowToast("Configuration Error: Missing or invalid WhatsApp recipient number in weddingConfig.ts.");
      return;
    }

    setIsSubmitting(true);

    const { bride, groom } = weddingConfig.couple;
    const whatsappLines: string[] = [
      "Assalamu Alaikum!",
      `RSVP for the Nikah of *${bride.fullName} & ${groom.fullName}*`,
      "",
      `👤 *Guest Name:* ${trimmedName}`,
      `✨ *Attendance:* ${selectedAttendance}`
    ];

    // Include guest count only for "Joyfully Yes!"
    if (selectedAttendance === "Joyfully Yes!") {
      whatsappLines.push(`👥 *Number of Guests (including me):* ${guestCount}`);
    }

    if (message.trim()) {
      whatsappLines.push(`💌 *Dua / Message:* ${message.trim()}`);
    }

    whatsappLines.push("");
    whatsappLines.push("Sent via Aleena & Siyad's Wedding Invitation Website");

    const encodedText = encodeURIComponent(whatsappLines.join("\n"));
    const targetUrl = `https://wa.me/${phone}?text=${encodedText}`;

    window.open(targetUrl, "_blank", "noopener,noreferrer");
    onShowToast("Opening WhatsApp... Please tap 'Send' to submit your RSVP.");

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="section-padding" id="rsvp">
      <div className="container-standard">
        <div
          ref={cardRef}
          className="bg-[#FFFEFA] border border-[#C6AD76]/45 rounded-3xl p-6 sm:p-10 md:p-12 max-w-[640px] mx-auto shadow-md"
        >
          {/* Section Header */}
          <header className="text-center mb-7 sm:mb-9">
            <p
              className="text-xs tracking-[0.28em] text-[#C6AD76] font-semibold mb-2 uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              KINDLY REPLY
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#343C32] leading-tight mb-2 tracking-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Will You Join Us?
            </h2>
            <div className="w-44 sm:w-48 mx-auto my-3 opacity-85" aria-hidden="true">
              <img
                src="/assets/sage-divider.svg"
                alt=""
                className="w-full h-auto"
              />
            </div>
            <p className="text-xs sm:text-sm text-[#817E72] leading-relaxed max-w-[480px] mx-auto">
              Your prayers, warm presence, and blessings will make our union truly memorable.
              Please let us know if you can join our celebration.
            </p>
          </header>

          <AnimatePresence mode="wait">
            {!selectedAttendance ? (
              /* STEP A: Attendance Selection */
              <motion.div
                key="step-a"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col gap-3.5 sm:gap-4 max-w-[500px] mx-auto"
              >
                {attendanceOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => handleSelectAttendance(opt.label)}
                      className="group w-full p-4 sm:p-5 rounded-2xl bg-white border border-[#C6AD76]/40 hover:border-[#74866D] hover:bg-[#F7F3E9]/40 active:scale-[0.985] transition-all duration-200 shadow-sm hover:shadow text-left flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5">
                        <span className={`w-8 h-8 rounded-full bg-[#F7F3E9] flex items-center justify-center shrink-0 ${opt.accentClass} group-hover:scale-110 transition-transform`}>
                          <Icon className="w-5 h-5" />
                        </span>
                        <div>
                          <strong
                            className="block text-base sm:text-lg text-[#343C32] font-semibold tracking-wide"
                            style={{ fontFamily: "var(--font-serif)" }}
                          >
                            {opt.label}
                          </strong>
                          <span className="text-xs text-[#817E72] block">
                            {opt.description}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-[#C6AD76] font-semibold shrink-0 group-hover:translate-x-1 transition-transform">
                        Select &rarr;
                      </span>
                    </button>
                  );
                })}

                {weddingConfig.rsvp.isPlaceholder && (
                  <p className="text-[0.72rem] text-[#817E72] italic text-center mt-3">
                    Note: WhatsApp RSVP number will open with the family&apos;s contact.
                  </p>
                )}
              </motion.div>
            ) : (
              /* STEP B: Show Form After Selection */
              <motion.form
                key="step-b"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-5 text-left"
              >
                {/* Selected Option Banner & "Change Answer" Control */}
                <div className="flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl bg-[#F7F3E9] border border-[#C6AD76]/40">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs uppercase tracking-wider text-[#74866D] font-bold">
                      Your Response:
                    </span>
                    <strong
                      className="text-sm sm:text-base text-[#343C32]"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {selectedAttendance}
                    </strong>
                  </div>
                  <button
                    type="button"
                    onClick={handleBackToOptions}
                    className="inline-flex items-center gap-1.5 text-xs text-[#74866D] hover:text-[#343C32] font-semibold underline underline-offset-2 transition-colors py-1 px-2"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Change answer</span>
                  </button>
                </div>

                {/* Warm Feedback Message for "Maybe" */}
                {selectedAttendance === "Maybe" && (
                  <div className="text-center py-3 px-4 bg-[#F7F3E9]/80 border border-[#C6AD76]/35 rounded-xl shadow-sm">
                    <h4
                      className="text-lg sm:text-xl font-normal text-[#343C32] leading-snug"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      We hope you can join us!
                    </h4>
                    <p className="text-xs sm:text-sm italic text-[#4A5547] mt-1 font-medium leading-relaxed">
                      It would mean so much to celebrate this special day with you.
                    </p>
                  </div>
                )}

                {/* Gentle Message for "Respectfully No!" */}
                {selectedAttendance === "Respectfully No!" && (
                  <div className="text-center py-3 px-4 bg-[#F7F3E9]/80 border border-[#C6AD76]/35 rounded-xl shadow-sm">
                    <p
                      className="text-base sm:text-lg font-normal text-[#343C32] leading-snug italic"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      “You’ll be missed, and you’ll be in our thoughts.”
                    </p>
                  </div>
                )}

                {/* 1. YOUR NAME * */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="guestName"
                    className="text-xs font-bold tracking-[0.14em] text-[#343C32] uppercase flex items-center gap-1.5"
                  >
                    <User className="w-3.5 h-3.5 text-[#74866D]" />
                    <span>YOUR NAME <span className="text-[#74866D]">*</span></span>
                  </label>
                  <input
                    type="text"
                    id="guestName"
                    required
                    value={guestName}
                    onChange={(e) => {
                      setGuestName(e.target.value);
                      if (nameError) setNameError("");
                    }}
                    placeholder="Guest name (e.g. Dr. Haris & Family)"
                    className={`w-full p-3.5 bg-white border ${
                      nameError ? "border-red-500 ring-2 ring-red-100" : "border-[#74866D]/35"
                    } rounded-xl text-sm text-[#343C32] placeholder:text-[#817E72]/60 focus:outline-none focus:border-[#74866D] focus:ring-2 focus:ring-[#74866D]/20 transition-all`}
                  />
                  {nameError && (
                    <span className="text-xs text-red-600 flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3 h-3" />
                      {nameError}
                    </span>
                  )}
                </div>

                {/* 2. NUMBER OF GUESTS (INCLUDING YOU) - ONLY SHOWN FOR "Joyfully Yes!" */}
                {selectedAttendance === "Joyfully Yes!" && (
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="guestCount"
                      className="text-xs font-bold tracking-[0.14em] text-[#343C32] uppercase flex items-center gap-1.5"
                    >
                      <Users className="w-3.5 h-3.5 text-[#74866D]" />
                      <span>NUMBER OF GUESTS (INCLUDING YOU)</span>
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        id="guestCount"
                        min={1}
                        max={12}
                        value={guestCount}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          setGuestCount(isNaN(val) ? 1 : Math.max(1, Math.min(val, 12)));
                        }}
                        className="w-28 p-3.5 bg-white border border-[#74866D]/35 rounded-xl text-sm font-semibold text-[#343C32] focus:outline-none focus:border-[#74866D] focus:ring-2 focus:ring-[#74866D]/20 text-center transition-all"
                      />
                      <span className="text-xs text-[#817E72]">
                        {guestCount === 1 ? "Guest attending" : "Guests attending"}
                      </span>
                    </div>
                  </div>
                )}

                {/* 3. MESSAGE FOR THE COUPLE */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="guestMessage"
                    className="text-xs font-bold tracking-[0.14em] text-[#343C32] uppercase flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#74866D]" />
                    <span>MESSAGE FOR THE COUPLE (OPTIONAL)</span>
                  </label>
                  <textarea
                    id="guestMessage"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Leave a wish for the couple..."
                    className="w-full p-3.5 bg-white border border-[#74866D]/35 rounded-xl text-sm text-[#343C32] placeholder:text-[#817E72]/60 focus:outline-none focus:border-[#74866D] focus:ring-2 focus:ring-[#74866D]/20 transition-all resize-y"
                  />
                </div>

                {/* 4. SEND MESSAGE BUTTON */}
                <div className="mt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-sage-primary w-full py-4 text-sm font-semibold tracking-wider uppercase shadow-md hover:shadow-lg disabled:opacity-60"
                  >
                    <Send className="w-4 h-4 text-[#F7F3E9]" />
                    <span>{isSubmitting ? "Opening WhatsApp..." : "Send Message"}</span>
                  </button>
                </div>

                {/* Helper Clarification Note */}
                <div className="text-center text-xs text-[#817E72] leading-relaxed space-y-1">
                  <p>
                    WhatsApp will open with your pre-formatted response.
                  </p>
                  <p className="font-semibold text-[#343C32]">
                    Please tap &ldquo;Send&rdquo; inside WhatsApp to deliver your RSVP to the family.
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
