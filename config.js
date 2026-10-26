/**
 * ====================================================================
 * WEDDING INVITATION CONFIGURATION
 * Creative Studio: found.bin
 * Couple: Aleena Siyad & Siyad T N
 * ====================================================================
 * This centralized configuration object allows easy customization
 * for future invitations under the found.bin wedding studio platform.
 */

const WEDDING_CONFIG = {
  // Couple Identity
  couple: {
    bride: {
      firstName: "Aleena",
      fullName: "Aleena Siyad",
      family: {
        parents: "Mr. Siyad Ommerkutty & Mrs. Shamla",
        residence: "Pozhiyil House, Kodamthuruth",
        lineage: "Granddaughter of Ms. Amina & the late Abdul Karim; granddaughter of the late Beevi & the late Ommerkutty."
      }
    },
    groom: {
      firstName: "Siyad",
      fullName: "Siyad T N",
      family: {
        parents: "Son of Mr. Nazar T M & Mrs. Jumailath",
        residence: "Thankichira, CMC 33, Cherthala."
      }
    },
    monogram: "A & S",
    hashtag: "#AleenaWedsSiyad"
  },

  // Islamic Context & Duas
  islamic: {
    bismillahArabic: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    bismillahEnglish: "In the Name of Allah, the Most Beneficent, the Most Merciful.",
    invitationNote: "We cordially invite you to celebrate the Nikah of our beloved daughter",
    familyBlessing: "With the blessings of Allah and the love of our families, we would be honoured to have you with us as we begin this beautiful journey together.",
    dua: "May Allah bless this union with love, mercy and barakah.",
    closingWish: "Best wishes, Dear & Near"
  },

  // Date, Time & Astronomical / Hijri Info
  dateTime: {
    gregorianDateString: "Sunday, 13 December 2026",
    shortDate: "13 · 12 · 2026",
    hijriDateString: "04 Rajab 1448 AH", // Independently verified
    dayOfWeek: "Sunday",
    // ISO string with India Standard Time (UTC+05:30)
    nikahIsoTime: "2026-12-13T11:00:00+05:30",
    timezone: "Asia/Kolkata",
    timezoneOffsetMinutes: 330
  },

  // Event Schedule & Locations
  events: [
    {
      id: "nikah",
      type: "THE CEREMONY",
      title: "Nikah Ceremony",
      dayDate: "Sunday, 13 December 2026",
      time: "11:00 AM IST",
      venueName: "Kuthiathode Juma Masjid",
      venueAddress: "Kuthiathode, Alappuzha, Kerala",
      mapsQueryUrl: "https://www.google.com/maps/search/?api=1&query=Kuthiathode+Juma+Masjid+Alappuzha+Kerala",
      verifiedPinUrl: "https://maps.app.goo.gl/XvaavKV2g1hdbXNE6",
      note: "Formal Nikah solemnisation followed by blessings."
    },
    {
      id: "reception",
      type: "THE CELEBRATION",
      title: "Wedding Reception",
      dayDate: "Sunday, 13 December 2026",
      time: "Time to be confirmed", // Explicit note per requirement: reception time must be confirmed
      timePendingConfirmation: true,
      venueName: "The Palace Convention Centre",
      venueAddress: "Chandiroor, Alappuzha, Kerala",
      mapsQueryUrl: "https://www.google.com/maps/search/?api=1&query=The+Palace+Convention+Centre+Chandiroor+Kerala",
      verifiedPinUrl: "https://maps.app.goo.gl/m61EvuA77oWhduVW6",
      note: "Please confirm reception timing with the family before final publishing."
    }
  ],

  // RSVP Configuration
  rsvp: {
    // Family WhatsApp contact number (format: country code + digits, no + or spaces).
    // IMPORTANT: Replace this placeholder with the family's verified phone number before public distribution.
    whatsappNumber: "919876543210",
    defaultOptions: [
      "Joyfully accepts",
      "Regretfully declines"
    ],
    maxGuests: 6
  },

  // Audio / Ambience Configuration
  audio: {
    title: "Gentle Wedding Ambience",
    src: "assets/wedding-ambient.wav",
    fallbackSrc: "assets/wedding-audio.mp3",
    loop: true,
    volume: 0.65
  },

  // Brand Watermark
  brand: {
    name: "found.bin",
    tagline: "Bespoke Digital Invitations & Experiences",
    url: "https://instagram.com/found.bin"
  }
};

// Freeze configuration to prevent accidental mutations
if (typeof Object.freeze === "function") {
  Object.freeze(WEDDING_CONFIG);
}
