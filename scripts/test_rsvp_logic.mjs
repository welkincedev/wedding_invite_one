import { weddingConfig } from '../data/weddingConfig.ts';

console.log('=== Testing RSVP Form Choices & WhatsApp URL Generation ===');

const bride = weddingConfig.couple.bride.fullName;
const groom = weddingConfig.couple.groom.fullName;
const phone = weddingConfig.rsvp.whatsappNumber.replace(/\D/g, "");

function buildWhatsAppUrl(attendance, guestName, guestCount, message) {
  const trimmedName = guestName.trim();
  if (!trimmedName) {
    throw new Error('Name is required');
  }
  if (!phone || phone.length < 8) {
    throw new Error('Invalid or missing WhatsApp phone number');
  }

  const lines = [
    "Assalamu Alaikum!",
    `RSVP for the Nikah of *${bride} & ${groom}*`,
    "",
    `👤 *Guest Name:* ${trimmedName}`,
    `✨ *Attendance:* ${attendance}`
  ];

  if (attendance === "Joyfully Yes!") {
    lines.push(`👥 *Number of Guests (including me):* ${guestCount}`);
  }

  if (message && message.trim()) {
    lines.push(`💌 *Dua / Message:* ${message.trim()}`);
  }

  lines.push("");
  lines.push("Sent via Aleena & Siyad's Wedding Invitation Website");

  const encoded = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${phone}?text=${encoded}`;
}

// Test Case 1: Joyfully Yes!
console.log('\n--- Test 1: Joyfully Yes! ---');
const urlYes = buildWhatsAppUrl("Joyfully Yes!", "Dr. Haris & Family", 4, "May Allah bless the couple with abundant barakah!");
console.log('✔ URL Generated:', urlYes);
if (urlYes.includes('Number+of+Guests') || urlYes.includes('Number%20of%20Guests')) {
  console.log('✔ PASS: Guest count included for Joyfully Yes!');
} else {
  console.error('✖ FAIL: Guest count missing for Joyfully Yes!');
  process.exit(1);
}

// Test Case 2: Maybe
console.log('\n--- Test 2: Maybe ---');
const urlMaybe = buildWhatsAppUrl("Maybe", "Ibrahim & Family", 2, "Hoping to make it, insha'Allah");
console.log('✔ URL Generated:', urlMaybe);
if (urlMaybe.includes('Number+of+Guests') || urlMaybe.includes('Number%20of%20Guests')) {
  console.error('✖ FAIL: Guest count should NOT be in Maybe RSVP!');
  process.exit(1);
} else {
  console.log('✔ PASS: Guest count correctly excluded for Maybe response');
}

// Test Case 3: Respectfully No!
console.log('\n--- Test 3: Respectfully No! ---');
const urlNo = buildWhatsAppUrl("Respectfully No!", "Amina Kareem", 1, "Warmest wishes from Dubai.");
console.log('✔ URL Generated:', urlNo);
if (urlNo.includes('Number+of+Guests') || urlNo.includes('Number%20of%20Guests')) {
  console.error('✖ FAIL: Guest count should NOT be in Respectfully No RSVP!');
  process.exit(1);
} else {
  console.log('✔ PASS: Guest count correctly excluded for Respectfully No response');
}

// Test Case 4: Validation (Empty Name)
console.log('\n--- Test 4: Validation for Empty Name ---');
try {
  buildWhatsAppUrl("Joyfully Yes!", "   ", 2, "");
  console.error('✖ FAIL: Allowed empty name!');
  process.exit(1);
} catch (e) {
  console.log('✔ PASS: Successfully blocked empty name with validation error:', e.message);
}

console.log('\n=== All RSVP logic tests PASSED successfully! ===');
