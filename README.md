# Aleena Siyad & Siyad T N — Luxury Muslim Wedding Invitation Website

A mobile-first, cinematic Muslim Nikah digital wedding invitation website crafted for **Aleena Siyad & Siyad T N**, designed under the creative studio banner **found.bin**.

The website delivers a tactile physical stationery experience: an authentic layered burgundy envelope, 3D flap opening, gold wax seal with monogram ("A & S"), floral botanical illustrations, background ambience, IST timezone-aware countdown, WhatsApp RSVP integration, calendar event download, and Google Maps venue navigation.

---

## ✨ Features & Highlights

- **Cinematic Envelope Opening**:
  - Full-screen mobile-first invitation cover with warm deckle-edge paper texture and watercolor rose corners.
  - Realistic 3D folding flap with genuine physics and perspective.
  - Antique gold wax seal featuring the custom "A & S" monogram.
  - Letter card rising out of the envelope pocket with smooth reveal.
  - One-tap "Skip animation" for accessibility and returning guests.
- **Authentic Islamic Elements**:
  - High-precision Arabic calligraphy for the Bismillah (*بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ*).
  - Elegant English translation: *“In the Name of Allah, the Most Beneficent, the Most Merciful.”*
  - Independently verified Hijri calendar date: **04 Rajab 1448 AH** (Sunday, 13 December 2026).
  - Traditional Dua for newlyweds (*بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ*).
- **Timezone-Aware Countdown (Asia/Kolkata)**:
  - Accurate countdown to 11:00 AM IST on 13 December 2026.
  - Graceful post-event state handling.
- **Event Schedule & Maps**:
  - **Nikah Ceremony**: 11:00 AM IST at **Kuthiathode Juma Masjid**.
  - **Wedding Reception**: Time to be confirmed at **The Palace Convention Centre, Chandiroor**.
  - Direct 1-click Google Maps search navigation.
- **WhatsApp RSVP Flow**:
  - Form capturing Guest Name, Attendance status, Number of Guests, and optional Dua.
  - Automatically formats and opens WhatsApp with a pre-composed message to the family.
- **Add to Calendar & Sharing**:
  - Generates and downloads an RFC 5545 standard `.ics` calendar file with reminder alarms.
  - Native mobile share sheet (`navigator.share`), 1-tap Copy Link with visual toast, and direct WhatsApp sharing.
- **Gentle Ambience**:
  - Sticky floating audio controller with sound wave animations and play/pause feedback.
  - Packaged with an ambient loop (`assets/wedding-ambient.wav`).

---

## 📁 Project Structure

```text
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD workflow
├── assets/
│   ├── gallery/                # Editorial wedding gallery images
│   │   ├── gallery-florals.jpg
│   │   ├── gallery-florals.webp
│   │   ├── gallery-stationery.jpg
│   │   ├── gallery-stationery.webp
│   │   ├── gallery-suite.jpg
│   │   └── gallery-suite.webp
│   ├── bismillah.svg           # Vector Arabic calligraphy
│   ├── favicon.svg             # Gold seal monogram favicon
│   ├── floral-corner.jpg       # Watercolor burgundy rose corner
│   ├── floral-corner.webp      # High-performance WebP version
│   ├── floral-divider.svg      # Gold filigree ornament divider
│   ├── islamic-pattern.svg     # Geometric arabesque star pattern
│   ├── paper-texture.jpg       # Handmade deckle edge paper texture
│   ├── paper-texture.webp      # High-performance WebP version
│   ├── wax-seal-gold.jpg       # 3D embossed gold wax seal
│   ├── wax-seal-gold.webp      # High-performance WebP version
│   ├── wax-seal.svg            # Vector seal crest
│   └── wedding-ambient.wav     # Ambient wedding soundscape
├── config.js                   # Centralized data model (names, dates, RSVP, venues)
├── index.html                  # Semantic, accessible HTML5 structure
├── script.js                   # Opening animations, countdown, RSVP, audio, calendar
├── style.css                   # Responsive typography, 3D envelope, color tokens
└── README.md                   # Documentation & publishing instructions
```

---

## 🛠️ Local Development & Testing

1. Clone or extract this repository into your local machine:
   ```bash
   cd "Aleena & Siyad"
   ```
2. Start any local static HTTP server (or open `index.html` directly):
   - **VS Code**: Right-click `index.html` and click **"Open with Live Server"**.
   - **Python**:
     ```bash
     python -m http.server 8000
     ```
     Then open `http://localhost:8000` in your browser.
   - **Node.js**:
     ```bash
     npx serve .
     ```

---

## ⚙️ Configuration (`config.js`)

All dynamic details are centralized in `config.js` for easy updating:

```javascript
const WEDDING_CONFIG = {
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
    nikahIsoTime: "2026-12-13T11:00:00+05:30", // IST (+05:30)
    hijriDateString: "04 Rajab 1448 AH"
  },
  rsvp: {
    // Replace with the family's WhatsApp phone number (country code + number, no '+' or spaces)
    whatsappNumber: "919876543210"
  }
};
```

---

## 🚀 Deployment to GitHub Pages

A ready-to-use GitHub Actions workflow is provided in `.github/workflows/deploy.yml`.

To deploy on GitHub Pages:
1. Push this repository to GitHub on the `main` branch:
   ```bash
   git add .
   git commit -m "feat: complete luxury wedding invitation experience"
   git push origin main
   ```
2. In your GitHub repository:
   - Navigate to **Settings** &rarr; **Pages**.
   - Under **Build and deployment** &rarr; **Source**, select **GitHub Actions**.
3. Every time you push changes to `main`, GitHub Actions will automatically deploy the site to:
   `https://<your-username>.github.io/<repository-name>/`

### Deploying to Netlify / Vercel
- **Netlify**: Drag and drop the project folder into Netlify Drop (or link the GitHub repository). Publish directory is `.` (root).
- **Vercel**: Run `vercel` or import the Git repository. Framework preset: **Other** / Static.

---

## 📋 Checklist Before Final Distribution

Before sharing the wedding invitation link publicly on WhatsApp:
- [ ] In `config.js`, replace `whatsappNumber: "919876543210"` with the family's verified WhatsApp number.
- [ ] Verify the exact reception timing with the family once confirmed and update `config.js` and `index.html`.
- [ ] Confirm the venue Google Maps search links and pins.
- [ ] If desired, swap or add personal couple/family photographs into `assets/gallery/`.
- [ ] Test the link preview on WhatsApp to verify Open Graph image and title.

---

## 🏷️ Credits & Studio

Designed with love by **[found.bin](https://instagram.com/found.bin)** — Bespoke Digital Invitation & Experience Studio.
