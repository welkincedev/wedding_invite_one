"use client";

import React, { useState } from "react";
import EnvelopeIntro from "@/components/EnvelopeIntro";
import Hero from "@/components/Hero";
import FamilySection from "@/components/FamilySection";
import Countdown from "@/components/Countdown";
import ScheduleSection from "@/components/ScheduleSection";
import GallerySection from "@/components/GallerySection";
import RsvpSection from "@/components/RsvpSection";
import SharingBar from "@/components/SharingBar";
import ClosingSection from "@/components/ClosingSection";
import AudioPlayer from "@/components/AudioPlayer";
import PetalsLayer from "@/components/PetalsLayer";
import { weddingConfig } from "@/data/weddingConfig";

export default function WeddingPage() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const handleAddToCalendar = () => {
    const { bride, groom } = weddingConfig.couple;
    const title = `Nikah: ${bride.fullName} & ${groom.fullName}`;
    const location = "Kuthiathode Juma Masjid, Kuthiathode, Alappuzha, Kerala";
    const description = `We cordially invite you to celebrate the Nikah of ${bride.fullName} and ${groom.fullName} on Sunday, 13 December 2026. Reception at The Palace Convention Centre, Chandiroor.`;

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//found.bin//Aleena and Siyad Wedding//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:aleena-siyad-nikah-20261213@foundbin.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
      "DTSTART:20261213T053000Z", // 11:00 AM IST = 05:30 UTC
      "DTEND:20261213T083000Z",
      `SUMMARY:${title}`,
      `LOCATION:${location}`,
      `DESCRIPTION:${description}`,
      "STATUS:CONFIRMED",
      "BEGIN:VALARM",
      "TRIGGER:-PT24H",
      "ACTION:DISPLAY",
      "DESCRIPTION:Reminder: Nikah of Aleena & Siyad tomorrow at 11:00 AM",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "Aleena-Siyad-Nikah.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);

    showToast("Calendar event downloaded! Tap to add to calendar.");
  };

  return (
    <>
      {/* Falling Rose Petals Layer */}
      <PetalsLayer />

      {/* Cinematic 3D Envelope Opening Intro (Full-Screen) */}
      <EnvelopeIntro
        isOpen={isEnvelopeOpen}
        onOpened={() => setIsEnvelopeOpen(true)}
      />

      {/* Floating Audio Controller */}
      <AudioPlayer
        onShowToast={showToast}
        autoPlayTrigger={isEnvelopeOpen}
      />

      {/* Continuous Wedding Invitation Page */}
      <main
        className={`w-full transition-opacity duration-700 ${
          isEnvelopeOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isEnvelopeOpen}
      >
        <Hero onAddToCalendar={handleAddToCalendar} />
        <FamilySection />
        <Countdown />
        <ScheduleSection />
        <GallerySection />
        <RsvpSection onShowToast={showToast} />
        <SharingBar
          onShowToast={showToast}
          onAddToCalendar={handleAddToCalendar}
        />
        <ClosingSection />
      </main>

      {/* Toast Notification Pill */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-7 left-1/2 -translate-x-1/2 z-[10000] px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium text-white border border-[#C6AD76] shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-300"
          style={{ background: "rgba(52, 60, 50, 0.96)" }}
        >
          {toastMessage}
        </div>
      )}
    </>
  );
}
