# Aleena Siyad × Siyad T N — The Sage Heirloom Wedding Invitation

An interactive, cinematic digital wedding invitation crafted with **The Sage Heirloom** design direction. Built with **Next.js 14 (App Router)**, **TypeScript**, **GSAP**, **Framer Motion**, and **Tailwind CSS**, designed under the bespoke studio identity **found.bin**.

---

## 🌿 The Sage Heirloom Creative Direction

The website is designed to evoke a bespoke invitation suite printed on warm, heavyweight deckle-edge cotton paper, brought to life with restrained, cinematic physical motion.

### Design Tokens & Palette
- **Primary Sage** (`#74866D`): Refined foliage green for primary call-to-actions, badge accents, and botanical ornamentation.
- **Deep Olive** (`#343C32`): High-contrast editorial ink color for headings, titles, and text readability.
- **Warm Ivory** (`#F7F3E9`): Soft, natural stationery canvas background.
- **Champagne Gold** (`#C6AD76`): Restrained foil accents for borders, monograms, star filigree, and fine dividers.
- **Soft Secondary Green** (`#DCE3D5`): Gentle tint for inner folio linings, sub-cards, and card borders.
- **Muted Neutral** (`#817E72`): Editorial body text, dates, and secondary labels.
- **White Paper** (`#FFFEFA`): Crisp card stock for inner stationery layers.

---

## ✨ Features & Architecture

### 1. The Folded Folio Stationery Opening
- Coordinated via **GSAP timelines** with natural physical easing (`power2.inOut`, `back.out`).
- Features a warm ivory linen backdrop with subtle botanical corners.
- An embossed antique gold wax seal featuring the intertwined **"A × S"** monogram.
- **Micro-interaction sequence**:
  1. Primary "Open Invitation" press with gentle micro-scale feedback.
  2. Wax seal dissolves and separates smoothly.
  3. Left and right sage folio flaps rotate open in 3D (`transform-origin: left / right`, `perspective: 1400px`).
  4. Inner warm ivory letterpress card expands forward with realistic paper depth and drop shadows.
  5. Sequential reveal of the deep olive Arabic Bismillah and couple names.
  6. Smooth transition into the main editorial invitation page.
- Accessible **"Skip intro →"** control and complete support for `prefers-reduced-motion`.

### 2. Open Editorial Letterpress Storytelling
- **Hero & Invocation**:
  - Vector Arabic Bismillah calligraphy in deep olive (`#343C32`).
  - English translation: *“In the Name of Allah, The most Beneficent & Most Merciful”*.
  - Couple title: **Aleena Siyad × Siyad T N**.
  - Confirmed Gregorian Nikah date: **Sunday, 13 December 2026** at **11:00 AM IST**.
  - Hijri date unverified status preserved internally (`displayHijriDate: false`) without inventing details.
- **Parents & Family Spread**:
  - Open editorial two-column layout with generous whitespace and vertical champagne divider.
  - Bride's family: Daughter of Mrs. Jaseentha & Mr. Siyad.
  - Groom's family: Son of Mrs. Zeenath & Mr. Nazar T M.
- **Timezone-Aware Countdown (Asia/Kolkata)**:
  - Accurate countdown to 11:00 AM IST on 13 December 2026.
  - Tabular numbers to prevent layout shift.
  - Clear post-event handling ("Alhamdulillah, The Wedding Has Taken Place!").
- **Ceremony & Reception Details**:
  - **Nikah Ceremony**: 11:00 AM IST at Kuthiathode Juma Masjid (*Confirmed*).
  - **Wedding Reception**: The Palace Convention Centre, Chandiroor (*Marked clearly with "Time to be announced / awaiting family confirmation"*).
  - Direct 1-tap Google Maps search links for both venues.
- **Curated Gallery & Stationery Suite**:
  - Highlighting artisan deckle-edge paper, sage botanicals, and gold script details.
- **Interactive WhatsApp RSVP**:
  - Allows guests to submit their name, attendance, guest count, and optional Dua.
  - Generates a pre-formatted WhatsApp message directly to the family's phone number.
- **Calendar & Social Sharing**:
  - 1-click download of RFC 5545 `.ics` calendar file with reminder alarm (Asia/Kolkata timezone).
  - Native Web Share API, clipboard copy with visual toast pill, and WhatsApp direct share.
- **Closing & Monogram Crest**:
  - Deep olive/forest gradient footer with vector **"A × S"** botanical monogram crest.
  - Authentic Nikah blessing in Arabic (*Barakallahu laka wa baraka 'alayka wa jama'a baynakuma fee khayr*).
  - Sign-off: *“Best wishes, Dear & Near”*.
- **Floating Audio Ambience Controller**:
  - Floating pill dock with animated sound wave equalizer and play/pause controls.
- **No Distracting Floating Particles**:
  - Adheres strictly to editorial stationery guidelines by avoiding constant floating emojis or particle spam.

---

## 💻 How to Run Locally

You do not need GitHub or any online connection. Everything runs locally on your computer:

### 1. Start the Development Server
Open PowerShell or your preferred terminal in this folder:
```powershell
npm run dev
```
Then open your web browser to:
👉 **[http://localhost:3000](http://localhost:3000)**

### 2. Test the Optimized Production Build
```powershell
npm run build
npm start
```

---

## ⚙️ Centralized Configuration (`data/weddingConfig.ts`)

All wedding data, contact details, and theme tokens are centralized in `data/weddingConfig.ts`:

```typescript
export const weddingConfig = {
  theme: {
    primarySage: "#74866D",
    deepOlive: "#343C32",
    warmIvory: "#F7F3E9",
    champagneGold: "#C6AD76",
    softGreen: "#DCE3D5",
    mutedNeutral: "#817E72",
    whitePaper: "#FFFEFA"
  },
  couple: {
    bride: {
      fullName: "Aleena Siyad",
      family: { ... }
    },
    groom: {
      fullName: "Siyad T N",
      family: { ... }
    }
  },
  dateTime: {
    nikahIsoTime: "2026-12-13T11:00:00+05:30", // Asia/Kolkata
    gregorianDateString: "Sunday, 13 December 2026",
    displayHijriDate: false, // Set to true once the family officially verifies the lunar date
    hijriDateUnverified: "04 Rajab 1448 AH"
  },
  rsvp: {
    // Replace with the family's confirmed WhatsApp phone number (country code first, digits only)
    whatsappNumber: "919876543210"
  }
};
```

---

## 📋 Checklist Before Final Distribution

- [ ] **Family WhatsApp Number**: Update `whatsappNumber` in `data/weddingConfig.ts` with the actual number (digits only, e.g., `919846000000`).
- [ ] **Reception Timing**: Once the family confirms the reception schedule, set `timeDisplay` (e.g. `1:00 PM – 4:00 PM`) and `timeConfirmed: true` in `data/weddingConfig.ts`.
- [ ] **Hijri Date Verification**: If the family confirms the Islamic lunar calendar date, set `displayHijriDate: true` in `data/weddingConfig.ts`.
- [ ] **Couple Photography (Optional)**: If couple photographs are provided, place `.webp` or `.jpg` assets in `public/assets/gallery/`.
- [ ] **Custom Audio Track (Optional)**: Place your preferred instrumental audio file at `public/assets/wedding-ambient.wav`.

---

## 🔒 Preserved Safe Backups

1. `_backup_v1_burgundy/`: Complete backup of the previous burgundy envelope Next.js application.
2. `_static_backup/`: Complete backup of the original vanilla HTML, CSS, and JS website.
