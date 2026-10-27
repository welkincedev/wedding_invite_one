# Aleena Siyad & Siyad T N — Premium Animated Wedding Invitation

An interactive, cinematic Muslim Nikah digital wedding invitation website built with **Next.js (App Router)**, **TypeScript**, **GSAP**, **Framer Motion**, and **Tailwind CSS**, designed under the creative studio banner **found.bin**.

---

## 🌹 Project Highlights & Features

- **Cinematic 3D Envelope Opening**:
  - Full-screen opening sequence coordinated via **GSAP timelines** with natural physical easing.
  - Layered burgundy envelope with 3D flap rotation (`rotateX: 180deg`) and authentic inner lining.
  - Realistic embossed antique gold wax seal featuring the custom **"A & S"** monogram.
  - Invitation card gracefully rises from the pocket revealing the Arabic Bismillah and couple names.
  - Accessible "Skip animation &rarr;" option for returning guests or reduced-motion preferences.
- **Authentic Islamic Context**:
  - Arabic calligraphy Bismillah (*بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ*).
  - English translation: *“In the Name of Allah, The most Beneficent & Most Merciful”*.
  - Verified Islamic calendar date: **04 Rajab 1448 AH** (matching Sunday, 13 December 2026).
  - Authentic closing Dua (*بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ*).
  - Sign-off: *“Best wishes, Dear & Near”*.
- **Timezone-Aware Countdown (Asia/Kolkata)**:
  - Accurate countdown to 11:00 AM IST on Sunday, 13 December 2026 with post-event states.
- **Event Schedule & Maps**:
  - **Nikah Ceremony**: 11:00 AM IST at Kuthiathode Juma Masjid.
  - **Wedding Reception**: The Palace Convention Centre, Chandiroor (*marked clearly as time awaiting confirmation*).
  - Direct 1-tap Google Maps search links.
- **Interactive WhatsApp RSVP**:
  - Guest Name, Attendance (Joyfully accepts / Regretfully declines), Guest count, and optional Dua.
  - Formats and opens WhatsApp with a pre-composed message to the family.
- **Calendar & Sharing**:
  - Generates and downloads RFC 5545 `.ics` file with reminders for Apple Calendar, Google Calendar, and Outlook.
  - Native Web Share API, Copy Link with visual toast notification, and WhatsApp direct share.
- **Background Ambience**:
  - Sticky floating audio dock with sound wave animations and play/pause controls.
- **Original Static Backup**:
  - The previous vanilla HTML/CSS/JS project is safely preserved in `_static_backup/`.

---

## 💻 How to Run Locally

You do not need GitHub or any online service. Everything runs directly on your computer:

### 1. Start the Development Server
Open your terminal (PowerShell, Command Prompt, or VS Code terminal) in this folder and run:
```bash
npm run dev
```
Then open your web browser to:
👉 **[http://localhost:3000](http://localhost:3000)**

### 2. Run a Production Build
To test the optimized production build:
```bash
npm run build
npm start
```

---

## ⚙️ Configuration (`data/weddingConfig.ts`)

All wedding data is centralized in `data/weddingConfig.ts` for simple, safe editing:

```typescript
export const weddingConfig = {
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
    hijriDateString: "04 Rajab 1448 AH"
  },
  rsvp: {
    // Replace with the family's WhatsApp phone number (country code first, digits only)
    whatsappNumber: "919876543210"
  }
};
```

---

## 📋 Checklist Before Final Distribution

- [ ] **Family WhatsApp Number**: In `data/weddingConfig.ts`, update `whatsappNumber` to the family's actual phone number.
- [ ] **Reception Timing**: Once confirmed by the family, update `timeDisplay` and set `timeConfirmed: true` in `data/weddingConfig.ts`.
- [ ] **Personal Photos (Optional)**: If personal photos are supplied, replace the placeholder images in `public/assets/gallery/`.
- [ ] **Background Music (Optional)**: You can place your own preferred instrumental file at `public/assets/wedding-ambient.wav` or `public/assets/wedding-audio.mp3`.

---

## 📦 How to Create a Static Export for Hosting Later

If you ever wish to deploy this website to any free static host (Netlify, Vercel, Cloudflare Pages, S3, or traditional cPanel):
1. In `next.config.js`, add `output: 'export'`:
   ```javascript
   const nextConfig = {
     output: 'export',
     images: { unoptimized: true }
   };
   ```
2. Run:
   ```bash
   npm run build
   ```
3. A standalone `out/` folder will be generated containing pure static HTML, CSS, and JS files that can be uploaded to any static web hosting provider without requiring a Node.js server.
