const wedding = {
  bride: "Aleena Siyad",
  groom: "Siyad T N",
  date: new Date(2026, 11, 13, 11, 0, 0),
  // Replace with the family's WhatsApp number: country code + number, no + or spaces.
  whatsappNumber: "919876543210"
};

const $ = (id) => document.getElementById(id);

// Countdown uses the visitor's local timezone. Set the date/time for Kerala when sharing.
function updateCountdown() {
  const remaining = wedding.date.getTime() - Date.now();
  if (remaining <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach(id => $(id).textContent = "00");
    $("countdown-message").textContent =
      remaining > -86400000
        ? "Today is the special day. Alhamdulillah!"
        : "The wedding date has passed. May Allah bless the couple.";
    return;
  }
  const values = {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining % 86400000) / 3600000),
    minutes: Math.floor((remaining % 3600000) / 60000),
    seconds: Math.floor((remaining % 60000) / 1000)
  };
  Object.entries(values).forEach(([id, value]) => $(id).textContent = String(value).padStart(2, "0"));
  $("countdown-message").textContent = "Every moment brings us closer.";
}
updateCountdown();
setInterval(updateCountdown, 1000);
$("footer-year").textContent = new Date().getFullYear();

// RSVP: opens WhatsApp with a prepared message; guest must press Send.
// Replace the sample number above before publishing.
$("rsvp-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = $("guest-name").value.trim();
  if (!name) return;
  const response = $("attendance").value;
  const guests = $("guest-count").value;
  const message = [
    `Assalamu Alaikum! RSVP for ${wedding.bride} & ${wedding.groom}'s Nikah.`,
    `Name: ${name}`,
    `Response: ${response}`,
    `Number of guests: ${guests}`
  ].join("\\n");
  const url = `https://wa.me/${wedding.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});

// Optional music. Add a licensed/authorized audio file at assets/wedding-audio.mp3.
// Browsers require a user gesture before audio can play.
const audio = $("wedding-audio");
const musicButton = $("music-toggle");
const musicStatus = $("music-status");
musicButton.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      await audio.play();
      musicButton.textContent = "Ⅱ Pause audio";
      musicButton.setAttribute("aria-pressed", "true");
      musicStatus.textContent = "Audio is playing.";
    } catch {
      musicStatus.textContent = "Audio could not play. Add assets/wedding-audio.mp3 and try again.";
    }
  } else {
    audio.pause();
    musicButton.textContent = "▶ Play audio";
    musicButton.setAttribute("aria-pressed", "false");
    musicStatus.textContent = "Audio paused.";
  }
});
audio.addEventListener("ended", () => {
  musicButton.textContent = "▶ Play audio";
  musicButton.setAttribute("aria-pressed", "false");
});
audio.addEventListener("pause", () => {
  musicButton.textContent = "▶ Play audio";
  musicButton.setAttribute("aria-pressed", "false");
});
audio.addEventListener("play", () => {
  musicButton.textContent = "Ⅱ Pause audio";
  musicButton.setAttribute("aria-pressed", "true");
});

// Native share sheet on supported phones; WhatsApp fallback elsewhere.
$("share-button").addEventListener("click", async () => {
  const data = {
    title: `${wedding.bride} & ${wedding.groom} — Nikah Invitation`,
    text: `You're invited to the Nikah of ${wedding.bride} & ${wedding.groom}.`,
    url: window.location.href
  };
  if (navigator.share) {
    try { await navigator.share(data); }
    catch (error) {
      if (error.name !== "AbortError") shareToWhatsApp(data);
    }
  } else {
    shareToWhatsApp(data);
  }
});
function shareToWhatsApp(data) {
  const message = `${data.text} ${data.url}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}

// Reveal sections as they enter view.
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}

// Gentle falling rose petals. Reduced-motion preference is respected.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduceMotion) {
  const layer = document.querySelector(".petal-layer");
  function createPetal() {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.setProperty("--drift", `${Math.random() * 160 - 80}px`);
    petal.style.animationDuration = `${7 + Math.random() * 7}s`;
    petal.style.opacity = `${0.2 + Math.random() * 0.35}`;
    petal.style.transform = `rotate(${Math.random() * 180}deg)`;
    layer.appendChild(petal);
    petal.addEventListener("animationend", () => petal.remove());
  }
  for (let i = 0; i < 9; i++) setTimeout(createPetal, i * 350);
  setInterval(createPetal, 950);
}
