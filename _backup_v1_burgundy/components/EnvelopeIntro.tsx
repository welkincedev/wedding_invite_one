"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { weddingConfig } from "@/data/weddingConfig";
import { ArrowRight, Sparkles } from "lucide-react";

interface EnvelopeIntroProps {
  onOpened: () => void;
  isOpen: boolean;
}

export default function EnvelopeIntro({ onOpened, isOpen }: EnvelopeIntroProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const envelopeBoxRef = useRef<HTMLDivElement>(null);
  const flapHingeRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const letterCardRef = useRef<HTMLElement>(null);
  const cardBorderRef = useRef<HTMLDivElement>(null);
  const openBtnRef = useRef<HTMLButtonElement>(null);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    // If already open (e.g. state preserved or skip), hide stage
    if (isOpen && stageRef.current) {
      stageRef.current.style.display = "none";
    }
  }, [isOpen]);

  const handleOpenSequence = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      onOpened();
      return;
    }

    // Coordinated GSAP timeline for realistic envelope opening
    const tl = gsap.timeline({
      onComplete: () => {
        onOpened();
      }
    });

    // 1. Button tap feedback
    if (openBtnRef.current) {
      tl.to(openBtnRef.current, {
        scale: 0.94,
        duration: 0.14,
        ease: "power2.inOut"
      });
    }

    // 2. Wax seal separates and shrinks gracefully
    if (sealRef.current) {
      tl.to(sealRef.current, {
        scale: 0.45,
        opacity: 0,
        rotation: 12,
        duration: 0.45,
        ease: "back.in(1.6)"
      }, "+=0.05");
    }

    // 3. Envelope flap rotates open 180 degrees in 3D perspective
    if (flapHingeRef.current) {
      tl.to(flapHingeRef.current, {
        rotateX: 180,
        duration: 0.85,
        ease: "power3.inOut"
      }, "-=0.25");
    }

    // 4. Letter card rises smoothly from envelope pocket
    if (letterCardRef.current) {
      tl.to(letterCardRef.current, {
        y: -135,
        zIndex: 8,
        boxShadow: "0 20px 45px rgba(45, 6, 10, 0.3)",
        duration: 1.05,
        ease: "power2.out"
      }, "-=0.4");
    }

    // 5. Subtle micro-reveal of letter card content
    if (cardBorderRef.current) {
      tl.fromTo(
        cardBorderRef.current,
        { scale: 0.98, opacity: 0.85 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "power1.out" },
        "-=0.6"
      );
    }

    // 6. Smooth crossfade to main invitation page
    if (stageRef.current) {
      tl.to(stageRef.current, {
        opacity: 0,
        scale: 1.03,
        duration: 0.8,
        ease: "power2.inOut",
        delay: 0.25
      });
    }
  };

  const handleSkip = () => {
    onOpened();
  };

  if (isOpen) return null;

  return (
    <div
      ref={stageRef}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-between p-4 sm:p-6 overflow-hidden select-none"
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, #ffffff 0%, #faf4ee 55%, #eed8cb 100%)"
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Wedding Invitation Envelope"
    >
      {/* Corner Botanicals */}
      <div
        className="absolute top-[-10px] left-[-10px] w-36 sm:w-56 pointer-events-none opacity-90"
        aria-hidden="true"
      >
        <img
          src="/assets/floral-corner.webp"
          alt=""
          className="w-full h-auto drop-shadow-md"
        />
      </div>
      <div
        className="absolute bottom-[-10px] right-[-10px] w-36 sm:w-56 pointer-events-none opacity-90 rotate-180"
        aria-hidden="true"
      >
        <img
          src="/assets/floral-corner.webp"
          alt=""
          className="w-full h-auto drop-shadow-md"
        />
      </div>

      {/* Intro Header */}
      <header className="relative z-10 text-center mt-3 sm:mt-6">
        <p
          className="text-xs sm:text-sm tracking-[0.22em] text-[#5a121d] font-semibold mb-1"
          style={{ fontFamily: "var(--font-display)" }}
        >
          IN THE NAME OF ALLAH · THE MOST MERCIFUL
        </p>
        <p
          className="text-[0.68rem] sm:text-xs tracking-[0.28em] text-[#b98c39] font-medium"
          style={{ fontFamily: "var(--font-display)" }}
        >
          A SACRED WEDDING CELEBRATION
        </p>
      </header>

      {/* 3D Envelope Viewport */}
      <div
        className="relative my-auto flex items-center justify-center"
        style={{
          width: "min(88vw, 360px)",
          height: "260px",
          perspective: "1200px"
        }}
      >
        {/* The Invitation Letter inside the envelope */}
        <article
          ref={letterCardRef}
          className="absolute left-[6%] bottom-2 w-[88%] h-[235px] rounded border border-[#d4a755]/60 text-center p-3 sm:p-4 z-[2] transition-shadow"
          style={{
            background:
              "linear-gradient(145deg, #ffffff 0%, #fdf8f2 50%, #fbf3e9 100%), url('/assets/paper-texture.webp')",
            backgroundSize: "cover",
            boxShadow: "0 8px 25px rgba(45, 6, 10, 0.12)"
          }}
          aria-hidden="true"
        >
          <div
            ref={cardBorderRef}
            className="border border-[#d4a755]/30 h-full p-2 flex flex-col items-center justify-center"
          >
            <p
              className="text-[#5a121d] text-lg sm:text-xl font-bold leading-tight mb-1"
              style={{ fontFamily: "var(--font-arabic)" }}
              lang="ar"
            >
              {weddingConfig.islamic.bismillahArabic}
            </p>
            <p className="text-[0.58rem] tracking-[0.22em] text-[#78655d] font-medium">
              TOGETHER WITH THEIR FAMILIES
            </p>
            <h2
              className="text-[#5a121d] text-2xl sm:text-3xl font-normal leading-tight my-1"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              <span>{weddingConfig.couple.bride.firstName}</span>
              <em
                className="mx-1 text-[#b98c39] font-normal"
                style={{ fontFamily: "var(--font-script)" }}
              >
                &amp;
              </em>
              <span>{weddingConfig.couple.groom.firstName}</span>
            </h2>
            <div className="flex items-center gap-2 text-[#b98c39] text-xs my-1">
              <span className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#d4a755] to-transparent"></span>
              ✦
              <span className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#d4a755] to-transparent"></span>
            </div>
            <p
              className="text-[0.62rem] tracking-[0.2em] text-[#5a121d] font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              NIKAH CEREMONY
            </p>
            <p
              className="text-xs font-semibold tracking-wider text-[#2b1f1c] mt-0.5"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              SUNDAY · 13 DECEMBER 2026
            </p>
            <p className="text-[0.6rem] tracking-wider text-[#b98c39]">
              {weddingConfig.dateTime.hijriDateString}
            </p>
          </div>
        </article>

        {/* 3D Burgundy Envelope */}
        <div
          ref={envelopeBoxRef}
          onClick={handleOpenSequence}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleOpenSequence();
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="Tap to open wedding invitation"
          className="absolute inset-x-0 top-7 bottom-0 w-full h-[225px] z-[4] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d4a755] rounded-md"
          style={{ perspective: "1200px" }}
        >
          {/* Envelope Drop Shadow */}
          <div
            className="absolute inset-0 rounded-md pointer-events-none"
            style={{
              boxShadow:
                "0 24px 48px -10px rgba(45, 6, 10, 0.45), 0 8px 16px -4px rgba(45, 6, 10, 0.25)"
            }}
            aria-hidden="true"
          />

          {/* Envelope Back Plate */}
          <div
            className="absolute inset-0 rounded-md border border-[#d4a755]/20"
            style={{
              background:
                "linear-gradient(155deg, #741b27 0%, #540f17 50%, #3b080f 100%)"
            }}
            aria-hidden="true"
          />

          {/* Envelope Inner Lining with Islamic Star Pattern */}
          <div
            className="absolute inset-1 rounded opacity-35"
            style={{
              backgroundColor: "#460d14",
              backgroundImage: "url('/assets/islamic-pattern.svg')",
              backgroundSize: "60px 60px"
            }}
            aria-hidden="true"
          />

          {/* Lower Pocket Left Flap */}
          <div
            className="absolute inset-0 z-[3]"
            style={{
              background: "linear-gradient(135deg, #64151f 0%, #460d14 100%)",
              clipPath: "polygon(0 0, 50% 50%, 0 100%)",
              filter: "drop-shadow(2px 0 4px rgba(0, 0, 0, 0.15))"
            }}
            aria-hidden="true"
          />

          {/* Lower Pocket Right Flap */}
          <div
            className="absolute inset-0 z-[3]"
            style={{
              background: "linear-gradient(225deg, #64151f 0%, #460d14 100%)",
              clipPath: "polygon(100% 0, 50% 50%, 100% 100%)",
              filter: "drop-shadow(-2px 0 4px rgba(0, 0, 0, 0.15))"
            }}
            aria-hidden="true"
          />

          {/* Lower Pocket Bottom Flap */}
          <div
            className="absolute inset-0 z-[4]"
            style={{
              background:
                "linear-gradient(0deg, #500f16 0%, #5e131d 55%, #741b27 100%)",
              clipPath: "polygon(0 100%, 50% 48%, 100% 100%)",
              filter: "drop-shadow(0 -3px 6px rgba(0, 0, 0, 0.2))"
            }}
            aria-hidden="true"
          />

          {/* 3D Top Flap with Hinge */}
          <div
            ref={flapHingeRef}
            className="absolute top-0 left-0 right-0 h-[58%] z-[6]"
            style={{
              transformOrigin: "top center",
              transformStyle: "preserve-3d"
            }}
          >
            {/* Flap Outside */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, #7e1e2c 0%, #611620 65%, #4e0f17 100%)",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                filter: "drop-shadow(0 6px 8px rgba(45, 6, 10, 0.3))",
                backfaceVisibility: "hidden"
              }}
            >
              <div
                className="absolute inset-0 border-t-2 border-[#d4a755]"
                style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
              />
            </div>

            {/* Flap Inside (Patterned when folded back) */}
            <div
              className="absolute inset-0"
              style={{
                background: "#3e090f url('/assets/islamic-pattern.svg')",
                backgroundSize: "60px 60px",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                transform: "rotateX(180deg)",
                backfaceVisibility: "hidden"
              }}
            />
          </div>

          {/* Antique Gold Wax Seal with "A & S" Monogram */}
          <div
            ref={sealRef}
            className="absolute top-[54%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[8] w-16 h-16 pointer-events-none drop-shadow-xl"
            aria-hidden="true"
          >
            <img
              src="/assets/wax-seal-gold.webp"
              alt="A &amp; S Gold Wax Seal"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Intro Footer with Call-to-action */}
      <footer className="relative z-10 text-center w-full max-w-sm mb-2 sm:mb-4">
        <h1
          className="text-[#5a121d] text-2xl sm:text-3xl font-medium mb-3"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {weddingConfig.couple.bride.fullName}{" "}
          <span
            className="text-[#b98c39] italic font-normal"
            style={{ fontFamily: "var(--font-script)" }}
          >
            &amp;
          </span>{" "}
          {weddingConfig.couple.groom.fullName}
        </h1>

        <button
          ref={openBtnRef}
          type="button"
          onClick={handleOpenSequence}
          disabled={isOpening}
          className="group relative inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#f6dfb3] border border-[#d4a755] shadow-lg transition-all"
          style={{
            background:
              "linear-gradient(135deg, #5a121d 0%, #2d060a 100%)",
            boxShadow: "0 8px 24px rgba(70, 13, 20, 0.3)"
          }}
        >
          <Sparkles className="w-4 h-4 text-[#d4a755] animate-pulse" />
          <span>OPEN INVITATION</span>
          <ArrowRight className="w-4 h-4 text-[#d4a755] transition-transform group-hover:translate-x-1" />
        </button>

        <div className="mt-3 flex flex-col items-center gap-1">
          <button
            type="button"
            onClick={handleSkip}
            className="text-[0.7rem] tracking-wider text-[#78655d] underline underline-offset-4 hover:text-[#5a121d] transition-colors"
          >
            Skip animation &rarr;
          </button>
          <p
            className="text-xs italic text-[#78655d] mt-0.5"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            A blessed beginning, Insha&apos;Allah
          </p>
        </div>
      </footer>
    </div>
  );
}
