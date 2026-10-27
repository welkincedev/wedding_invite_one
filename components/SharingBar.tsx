"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/data/weddingConfig";
import { Share2, Link as LinkIcon, Calendar, Send } from "lucide-react";

interface SharingBarProps {
  onShowToast: (msg: string) => void;
  onAddToCalendar: () => void;
}

export default function SharingBar({ onShowToast, onAddToCalendar }: SharingBarProps) {
  const { bride, groom } = weddingConfig.couple;

  const handleNativeShare = async () => {
    const shareData = {
      title: `${bride.fullName} & ${groom.fullName} — Wedding Invitation`,
      text: `You are cordially invited to celebrate the Nikah of ${bride.fullName} & ${groom.fullName} on Sunday, 13 December 2026.`,
      url: typeof window !== "undefined" ? window.location.href : ""
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url)
        .then(() => onShowToast("Invitation link copied to clipboard!"))
        .catch(() => fallbackCopy(url));
    } else {
      fallbackCopy(url);
    }
  };

  const fallbackCopy = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      onShowToast("Invitation link copied to clipboard!");
    } catch {
      onShowToast("Please copy the link directly from your browser.");
    }
    document.body.removeChild(textArea);
  };

  const shareText = `You are cordially invited to celebrate the Nikah of ${bride.fullName} & ${groom.fullName} on Sunday, 13 December 2026.`;
  const whatsappShareUrl = typeof window !== "undefined" 
    ? `https://wa.me/?text=${encodeURIComponent(shareText + "\n\n" + window.location.href)}`
    : "#";

  return (
    <section className="section-padding text-center" id="share">
      <div className="container-standard">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8 }}
          className="max-w-[620px] mx-auto"
        >
          <p
            className="text-xs tracking-[0.28em] text-[#C6AD76] font-semibold mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            SPREAD THE JOY
          </p>
          <h2
            className="text-3xl sm:text-5xl font-normal text-[#343C32] leading-tight mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Share this Invitation
          </h2>
          <p className="text-xs sm:text-sm text-[#817E72] mb-6">
            Pass along the celebration details with relatives, loved ones, and friends.
          </p>

          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <button
              type="button"
              onClick={handleNativeShare}
              className="btn btn-sage-primary"
            >
              <Share2 className="w-4 h-4 text-[#C6AD76]" />
              <span>Share Invitation</span>
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className="btn btn-ivory-outline"
            >
              <LinkIcon className="w-4 h-4 text-[#74866D]" />
              <span>Copy Link</span>
            </button>

            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-[#25d366] text-white hover:bg-[#20bd5a] border border-[#1ebc59] shadow-sm hover:shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>WhatsApp Share</span>
            </a>

            <button
              type="button"
              onClick={onAddToCalendar}
              className="btn btn-ivory-outline"
            >
              <Calendar className="w-4 h-4 text-[#C6AD76]" />
              <span>Add to Calendar</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
