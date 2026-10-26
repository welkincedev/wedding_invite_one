/**
 * ====================================================================
 * WEDDING INVITATION INTERACTION & LOGIC
 * Creative Studio: found.bin
 * Couple: Aleena Siyad & Siyad T N
 * ====================================================================
 */

(function () {
  "use strict";

  // Safe fallback if WEDDING_CONFIG was somehow not loaded
  const config = window.WEDDING_CONFIG || {
    couple: {
      bride: { fullName: "Aleena Siyad" },
      groom: { fullName: "Siyad T N" },
      monogram: "A & S"
    },
    dateTime: {
      nikahIsoTime: "2026-12-13T11:00:00+05:30",
      gregorianDateString: "Sunday, 13 December 2026",
      timezone: "Asia/Kolkata"
    },
    rsvp: {
      whatsappNumber: "919876543210"
    },
    audio: {
      volume: 0.65
    }
  };

  // DOM Elements
  const body = document.body;
  const envelopeStage = document.getElementById("envelopeIntroStage");
  const envelopeInteractive = document.getElementById("envelopeInteractive");
  const ctaOpenEnvelope = document.getElementById("ctaOpenEnvelope");
  const skipIntroBtn = document.getElementById("skipIntroBtn");
  const mainPageWrapper = document.getElementById("mainPageWrapper");

  const audioEl = document.getElementById("weddingAudio");
  const audioToggleBtn = document.getElementById("audioToggleBtn");
  const audioLabel = document.getElementById("audioLabel");

  const countDays = document.getElementById("countDays");
  const countHours = document.getElementById("countHours");
  const countMinutes = document.getElementById("countMinutes");
  const countSeconds = document.getElementById("countSeconds");
  const countdownStatusMsg = document.getElementById("countdownStatusMsg");

  const rsvpForm = document.getElementById("rsvpForm");
  const btnAddToCalendar = document.getElementById("btnAddToCalendar");
  const btnShareNative = document.getElementById("btnShareNative");
  const btnCopyLink = document.getElementById("btnCopyLink");
  const btnShareWhatsApp = document.getElementById("btnShareWhatsApp");
  const toastNotification = document.getElementById("toastNotification");
  const footerYear = document.getElementById("footerYear");

  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }


  // ===================================================================
  // 1. CINEMATIC INVITATION OPENING EXPERIENCE
  // ===================================================================
  let isEnvelopeOpened = false;

  function openEnvelopeSequence() {
    if (isEnvelopeOpened) return;
    isEnvelopeOpened = true;

    // Trigger 3D flap rotation and letter card elevation
    envelopeStage.classList.add("is-opening");

    // Attempt soft music start on user gesture
    startBackgroundMusic(true);

    // After realistic opening animation, transition smoothly to main page
    window.setTimeout(() => {
      envelopeStage.classList.add("is-unlocked");
      body.classList.remove("is-intro-active");
      if (mainPageWrapper) {
        mainPageWrapper.setAttribute("aria-hidden", "false");
      }

      // Trigger hero reveal
      const heroContent = document.querySelector(".hero-container");
      if (heroContent) {
        heroContent.classList.add("is-visible");
      }
    }, 1100);
  }

  function skipEnvelopeImmediately() {
    isEnvelopeOpened = true;
    envelopeStage.classList.add("is-unlocked");
    body.classList.remove("is-intro-active");
    if (mainPageWrapper) {
      mainPageWrapper.setAttribute("aria-hidden", "false");
    }
    const heroContent = document.querySelector(".hero-container");
    if (heroContent) {
      heroContent.classList.add("is-visible");
    }
  }

  if (envelopeInteractive) {
    envelopeInteractive.addEventListener("click", openEnvelopeSequence);
    envelopeInteractive.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openEnvelopeSequence();
      }
    });
  }

  if (ctaOpenEnvelope) {
    ctaOpenEnvelope.addEventListener("click", openEnvelopeSequence);
  }

  if (skipIntroBtn) {
    skipIntroBtn.addEventListener("click", skipEnvelopeImmediately);
  }


  // ===================================================================
  // 2. BACKGROUND AMBIENCE & MUSIC CONTROLS
  // ===================================================================
  let isAudioPlaying = false;

  if (audioEl) {
    audioEl.volume = config.audio.volume || 0.65;
  }

  async function startBackgroundMusic(soft = false) {
    if (!audioEl) return;
    try {
      await audioEl.play();
      isAudioPlaying = true;
      audioToggleBtn.classList.add("is-playing");
      audioToggleBtn.setAttribute("aria-pressed", "true");
      audioLabel.textContent = "Pause Ambience";
    } catch (err) {
      // Audio autoplay may be prevented without interaction
      if (!soft) {
        showToast("Audio unavailable or muted by browser.");
      }
      isAudioPlaying = false;
      audioToggleBtn.classList.remove("is-playing");
      audioToggleBtn.setAttribute("aria-pressed", "false");
      audioLabel.textContent = "Play Ambience";
    }
  }

  function pauseBackgroundMusic() {
    if (!audioEl) return;
    audioEl.pause();
    isAudioPlaying = false;
    audioToggleBtn.classList.remove("is-playing");
    audioToggleBtn.setAttribute("aria-pressed", "false");
    audioLabel.textContent = "Play Ambience";
  }

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener("click", () => {
      if (isAudioPlaying) {
        pauseBackgroundMusic();
      } else {
        startBackgroundMusic(false);
      }
    });
  }


  // ===================================================================
  // 3. TIMEZONE-AWARE COUNTDOWN (ASIA/KOLKATA)
  // ===================================================================
  // Target: 2026-12-13T11:00:00+05:30
  const targetNikahTime = new Date(config.dateTime.nikahIsoTime).getTime();

  function updateNikahCountdown() {
    if (!countDays || !countHours || !countMinutes || !countSeconds) return;

    const now = Date.now();
    const remainingDistance = targetNikahTime - now;

    if (remainingDistance <= 0) {
      countDays.textContent = "00";
      countHours.textContent = "00";
      countMinutes.textContent = "00";
      countSeconds.textContent = "00";

      if (remainingDistance > -86400000) {
        countdownStatusMsg.textContent = "Today is the blessed wedding day. Alhamdulillah!";
      } else {
        countdownStatusMsg.textContent = "The Nikah has taken place. May Allah shower the couple with endless barakah.";
      }
      return;
    }

    const days = Math.floor(remainingDistance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingDistance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingDistance % (1000 * 60)) / 1000);

    countDays.textContent = String(days).padStart(2, "0");
    countHours.textContent = String(hours).padStart(2, "0");
    countMinutes.textContent = String(minutes).padStart(2, "0");
    countSeconds.textContent = String(seconds).padStart(2, "0");

    countdownStatusMsg.textContent = "Until our beautiful beginning, Insha'Allah";
  }

  updateNikahCountdown();
  window.setInterval(updateNikahCountdown, 1000);


  // ===================================================================
  // 4. RSVP SUBMISSION VIA WHATSAPP
  // ===================================================================
  if (rsvpForm) {
    rsvpForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const guestNameInput = document.getElementById("guestName");
      const attendanceInput = document.getElementById("rsvpAttendance");
      const guestCountInput = document.getElementById("guestCount");
      const guestMessageInput = document.getElementById("guestMessage");

      const name = guestNameInput ? guestNameInput.value.trim() : "";
      if (!name) {
        showToast("Please enter your name.");
        if (guestNameInput) guestNameInput.focus();
        return;
      }

      const attendance = attendanceInput ? attendanceInput.value : "Joyfully accepts";
      const guests = guestCountInput ? guestCountInput.value : "2";
      const userMessage = guestMessageInput ? guestMessageInput.value.trim() : "";

      const whatsappLines = [
        "Assalamu Alaikum!",
        `RSVP for the Nikah of *${config.couple.bride.fullName} & ${config.couple.groom.fullName}*`,
        "",
        `👤 *Guest Name:* ${name}`,
        `✨ *Attendance:* ${attendance}`,
        `👥 *Number of Guests:* ${guests}`
      ];

      if (userMessage) {
        whatsappLines.push(`💌 *Dua / Message:* ${userMessage}`);
      }

      whatsappLines.push("");
      whatsappLines.push("Sent via Aleena & Siyad's Wedding Invitation Website");

      const whatsappText = encodeURIComponent(whatsappLines.join("\n"));
      const whatsappNumber = config.rsvp.whatsappNumber || "919876543210";
      const targetUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

      // Open WhatsApp in new tab/app
      window.open(targetUrl, "_blank", "noopener,noreferrer");
      showToast("Opening WhatsApp... Tap 'Send' to complete RSVP.");
    });
  }


  // ===================================================================
  // 5. ADD TO CALENDAR (.ICS FILE GENERATION)
  // ===================================================================
  function generateIcsCalendarFile() {
    // 13 Dec 2026, 11:00 AM IST = 05:30 UTC
    // DTSTART: 20261213T053000Z
    // DTEND: 20261213T083000Z (approx 3 hours)
    const title = `Nikah: ${config.couple.bride.fullName} & ${config.couple.groom.fullName}`;
    const location = "Kuthiathode Juma Masjid, Kuthiathode, Alappuzha, Kerala";
    const description = `We cordially invite you to celebrate the Nikah of ${config.couple.bride.fullName} and ${config.couple.groom.fullName} on Sunday, 13 December 2026. Reception at The Palace Convention Centre, Chandiroor.`;

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//found.bin//Aleena and Siyad Wedding//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:aleena-siyad-nikah-20261213@foundbin.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
      "DTSTART:20261213T053000Z",
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
  }

  if (btnAddToCalendar) {
    btnAddToCalendar.addEventListener("click", generateIcsCalendarFile);
  }


  // ===================================================================
  // 6. SHARING & LINK COPYING
  // ===================================================================
  const sharePayload = {
    title: `${config.couple.bride.fullName} & ${config.couple.groom.fullName} — Wedding Invitation`,
    text: `You are cordially invited to the Nikah ceremony of ${config.couple.bride.fullName} & ${config.couple.groom.fullName} on Sunday, 13 December 2026.`,
    url: window.location.href
  };

  if (btnShareNative) {
    btnShareNative.addEventListener("click", async () => {
      if (navigator.share) {
        try {
          await navigator.share(sharePayload);
        } catch (err) {
          if (err.name !== "AbortError") {
            copyUrlToClipboard();
          }
        }
      } else {
        copyUrlToClipboard();
      }
    });
  }

  function copyUrlToClipboard() {
    const url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url)
        .then(() => showToast("Invitation link copied to clipboard!"))
        .catch(() => fallbackCopy(url));
    } else {
      fallbackCopy(url);
    }
  }

  function fallbackCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      showToast("Invitation link copied to clipboard!");
    } catch {
      showToast("Please copy the browser link manually.");
    }
    document.body.removeChild(textArea);
  }

  if (btnCopyLink) {
    btnCopyLink.addEventListener("click", copyUrlToClipboard);
  }

  if (btnShareWhatsApp) {
    const msg = `${sharePayload.text}\n\nView the invitation: ${window.location.href}`;
    btnShareWhatsApp.href = `https://wa.me/?text=${encodeURIComponent(msg)}`;
  }


  // ===================================================================
  // 7. TOAST NOTIFICATION UTILITY
  // ===================================================================
  let toastTimer = null;
  function showToast(message) {
    if (!toastNotification) return;
    toastNotification.textContent = message;
    toastNotification.classList.add("is-visible");

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toastNotification.classList.remove("is-visible");
    }, 3500);
  }


  // ===================================================================
  // 8. INTERSECTION OBSERVER FOR SCROLL REVEALS
  // ===================================================================
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }


  // ===================================================================
  // 9. ORGANIC FALLING ROSE PETALS GENERATOR
  // ===================================================================
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReducedMotion) {
    const petalCanvas = document.querySelector(".petal-canvas-layer");
    if (petalCanvas) {
      function spawnPetal() {
        const petal = document.createElement("span");
        petal.className = "petal-element";
        const startX = Math.random() * 100;
        const driftX = (Math.random() * 140 - 70) + "px";
        const sizeW = Math.floor(10 + Math.random() * 12);
        const sizeH = Math.floor(sizeW * 1.35);
        const duration = (8 + Math.random() * 7).toFixed(1);
        const rotation = Math.floor(Math.random() * 360) + "deg";

        petal.style.left = `${startX}%`;
        petal.style.width = `${sizeW}px`;
        petal.style.height = `${sizeH}px`;
        petal.style.setProperty("--drift-x", driftX);
        petal.style.setProperty("--rot", rotation);
        petal.style.animationDuration = `${duration}s`;

        petalCanvas.appendChild(petal);

        petal.addEventListener("animationend", () => {
          petal.remove();
        });
      }

      // Initial scatter
      for (let i = 0; i < 7; i++) {
        window.setTimeout(spawnPetal, i * 400);
      }

      // Continuous gentle drift
      window.setInterval(spawnPetal, 1100);
    }
  }

})();
