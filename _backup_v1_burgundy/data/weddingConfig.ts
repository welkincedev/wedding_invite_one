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
  dateDisplay: string;
  timeDisplay: string;
  timeConfirmed: boolean;
  venueName: string;
  venueAddress: string;
  mapsSearchUrl: string;
  description: string;
}

export interface WeddingConfig {
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
    hijriDateString: string;
    nikahIsoTime: string; // ISO string with +05:30 IST offset
    timezone: string;
  };
  events: WeddingEvent[];
  rsvp: {
    // Flagged placeholder: replace with family WhatsApp number before final sharing
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
    monogram: "A & S",
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
    hijriDateString: "04 Rajab 1448 AH", // Independently verified
    nikahIsoTime: "2026-12-13T11:00:00+05:30",
    timezone: "Asia/Kolkata"
  },
  events: [
    {
      id: "nikah",
      category: "THE SACRED UNION",
      title: "Nikah Ceremony",
      dateDisplay: "Sunday, 13 December 2026",
      timeDisplay: "11:00 AM IST",
      timeConfirmed: true,
      venueName: "Kuthiathode Juma Masjid",
      venueAddress: "Kuthiathode, Alappuzha, Kerala",
      mapsSearchUrl: "https://www.google.com/maps/search/?api=1&query=Kuthiathode+Juma+Masjid+Alappuzha+Kerala",
      description: "The solemn Islamic marriage contract and prayers, surrounded by family, elders, and loved ones."
    },
    {
      id: "reception",
      category: "THE CELEBRATION",
      title: "Wedding Reception",
      dateDisplay: "Sunday, 13 December 2026",
      timeDisplay: "Time to be confirmed",
      timeConfirmed: false, // Explicitly awaiting confirmation
      venueName: "The Palace Convention Centre",
      venueAddress: "Chandiroor, Alappuzha, Kerala",
      mapsSearchUrl: "https://www.google.com/maps/search/?api=1&query=The+Palace+Convention+Centre+Chandiroor+Kerala",
      description: "A festive gathering of greetings and dining with family and friends. (Timing awaiting final confirmation)."
    }
  ],
  rsvp: {
    // IMPORTANT: Replace this placeholder phone number with the family's WhatsApp number before final sharing
    whatsappNumber: "919876543210",
    isPlaceholder: true,
    defaultAttendanceOptions: ["Joyfully accepts", "Regretfully declines"],
    maxGuests: 6
  },
  audio: {
    title: "Gentle Wedding Ambience",
    src: "/assets/wedding-ambient.wav",
    fallbackSrc: "/assets/wedding-audio.mp3"
  },
  brand: {
    name: "found.bin",
    tagline: "Bespoke Digital Invitations & Experiences",
    url: "https://instagram.com/found.bin"
  }
};
