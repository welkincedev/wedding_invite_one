/**
 * ====================================================================
 * THE SAGE HEIRLOOM — WEDDING CONFIGURATION
 * Creative Studio: found.bin
 * Couple: Aleena Siyad × Siyad T N
 * ====================================================================
 * Clean architectural separation between:
 * 1. Theme Design Tokens (Sage, Deep Olive, Warm Ivory, Champagne Gold)
 * 2. Wedding Content (Couple, Families, Verified Schedule, RSVP)
 * ====================================================================
 */

export interface ThemeTokens {
  primarySage: string;
  deepOlive: string;
  warmIvory: string;
  champagneGold: string;
  softSecondaryGreen: string;
  mutedNeutral: string;
  whitePaper: string;
}

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function assetPath(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (!BASE_PATH) {
    return clean;
  }
  if (clean === BASE_PATH || clean.startsWith(`${BASE_PATH}/`)) {
    return clean;
  }
  return `${BASE_PATH}${clean}`;
}

export interface FamilyDetails {
  parents: string;
  residence: string;
  lineage?: string;
  blessingNote?: string;
}

export interface WeddingEvent {
  id: string;
  category: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  imageCaption?: string;
  dateDisplay?: string;
  dateConfirmed?: boolean;
  timeDisplay?: string;
  timeConfirmed: boolean;
  venueName: string;
  venueAddress: string;
  mapsSearchUrl: string;
  description: string;
}

export interface WeddingConfig {
  theme: ThemeTokens;
  couple: {
    bride: {
      firstName: string;
      fullName: string;
      family: FamilyDetails;
    };
    groom: {
      firstName: string;
      fullName: string;
      family: FamilyDetails;
    };
    monogram: string;
    hashtag: string;
  };
  islamic: {
    bismillahArabic: string;
    bismillahEnglish: string;
    duaArabic: string;
    duaEnglish: string;
    closingWish: string;
  };
  dateTime: {
    gregorianDateString: string;
    shortDate: string;
    /**
     * Note on Hijri Date: The artwork mentioned "04 Rajab 1448", which is recorded
     * here as unverified per project instructions and omitted from confirmed customer display.
     */
    hijriDateUnverified: string;
    displayHijriDate: boolean;
    nikahIsoTime: string; // ISO string with Asia/Kolkata (+05:30) offset
    timezone: string;
  };
  events: WeddingEvent[];
  rsvp: {
    /**
     * Placeholder flagged: replace with family's confirmed WhatsApp phone number before live distribution.
     */
    whatsappNumber: string;
    isPlaceholder: boolean;
    defaultAttendanceOptions: string[];
    maxGuests: number;
  };
  audio: {
    title: string;
    src: string;
    fallbackSrc?: string;
  };
  brand: {
    name: string;
    tagline: string;
    url: string;
  };
}

export const weddingConfig: WeddingConfig = {
  theme: {
    primarySage: "#74866D",
    deepOlive: "#343C32",
    warmIvory: "#F7F3E9",
    champagneGold: "#C6AD76",
    softSecondaryGreen: "#DCE3D5",
    mutedNeutral: "#817E72",
    whitePaper: "#FFFEFA"
  },
  couple: {
    bride: {
      firstName: "Aleena",
      fullName: "Aleena Siyad",
      family: {
        parents: "Mr. Siyad Ommerkutty & Mrs. Shamla",
        residence: "Pozhiyil House, Kodamthuruth",
        lineage: "Granddaughter of Ms. Amina & the late Abdul Karim; Granddaughter of the late Beevi & the late Ommerkutty."
      }
    },
    groom: {
      firstName: "Siyad",
      fullName: "Siyad T N",
      family: {
        parents: "S/o Mr. Nazar T M & Mrs. Jumailath",
        residence: "Thankichira, CMC 33, Cherthala",
        blessingNote: "Cherishing the lifelong guidance, prayers, and deep affection of loved ones near and dear as we welcome our new daughter into our hearts."
      }
    },
    monogram: "A × S",
    hashtag: "#AleenaWedsSiyad"
  },
  islamic: {
    bismillahArabic: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    bismillahEnglish: "In the Name of Allah, The most Beneficent & Most Merciful",
    duaArabic: "بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
    duaEnglish: "May Allah bless this union with love, mercy, and barakah.",
    closingWish: "Best wishes, Dear & Near"
  },
  dateTime: {
    gregorianDateString: "Sunday, 13 December 2026",
    shortDate: "13 · 12 · 2026",
    hijriDateUnverified: "04 Rajab 1448 AH (Unverified)",
    displayHijriDate: false, // Intentionally omitted to protect date integrity
    nikahIsoTime: "2026-12-13T11:00:00+05:30",
    timezone: "Asia/Kolkata"
  },
  events: [
    {
      id: "nikah",
      category: "THE NIKAH",
      title: "Nikah Ceremony",
      imageSrc: assetPath("/assets/events/event-nikah.jpg"),
      imageAlt: "Atmospheric architectural view of an elegant Islamic arched courtyard with morning sunlight and sage florals",
      imageCaption: "Ceremony Ambiance",
      dateDisplay: "Sunday, 13 December 2026",
      dateConfirmed: true,
      timeDisplay: "11:00 AM IST",
      timeConfirmed: true,
      venueName: "Kuthiathode Juma Masjid",
      venueAddress: "Kuthiathode, Alappuzha, Kerala",
      mapsSearchUrl: "https://www.google.com/maps/search/?api=1&query=Kuthiathode+Juma+Masjid+Alappuzha+Kerala",
      description: "The sacred Islamic marriage contract and prayers, surrounded by family, elders, and loved ones."
    },
    {
      id: "reception",
      category: "THE RECEPTION",
      title: "Wedding Reception",
      imageSrc: assetPath("/assets/events/event-reception.jpg"),
      imageAlt: "Atmospheric view of an elegant candlelit wedding banquet hall adorned with sage botanicals and champagne gold accents",
      imageCaption: "Celebration Ambiance",
      // Unconfirmed: Date & time not invented per strict project instructions
      dateConfirmed: false,
      timeConfirmed: false,
      venueName: "The Palace Convention Centre",
      venueAddress: "Chandiroor, Alappuzha, Kerala",
      mapsSearchUrl: "https://www.google.com/maps/search/?api=1&query=The+Palace+Convention+Centre+Chandiroor+Kerala",
      description: "A celebratory banquet gathering of greetings and dinner with loved ones, relatives, and friends. Schedule to be announced."
    }
  ],
  rsvp: {
    // Flagged placeholder: replace with family WhatsApp number before final sharing
    whatsappNumber: "919876543210",
    isPlaceholder: true,
    defaultAttendanceOptions: ["Joyfully accepts", "Regretfully declines"],
    maxGuests: 6
  },
  audio: {
    title: "Gentle Wedding Ambience",
    src: assetPath("/assets/wedding-ambient.wav"),
    fallbackSrc: assetPath("/assets/wedding-audio.mp3")
  },
  brand: {
    name: "found.bin",
    tagline: "Bespoke Digital Invitations & Experiences",
    url: "https://instagram.com/found.bin"
  }
};
