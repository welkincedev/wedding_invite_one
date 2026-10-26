# Aleena Siyad & Siyad T N — Nikah Invitation

A responsive static wedding invitation website with burgundy rose-inspired styling, gold accents, animations, countdown, Google Maps links, WhatsApp RSVP, and optional audio.

## Run locally
1. Extract the ZIP.
2. Open `index.html` in a browser, or use VS Code with the Live Server extension.
3. Internet is needed for Google Fonts, Maps, WhatsApp, and sharing links.

## Before publishing
- In `script.js`, replace `whatsappNumber` with the family's real WhatsApp number, country code first, digits only.
- Confirm the Nikah date/time and venue map pin.
- Confirm the reception time and address.
- Add a music file you have permission to use as `assets/wedding-audio.mp3`. No copyrighted song is included.
- The RSVP opens WhatsApp with a prepared message; it does not store a guest list automatically.
- The countdown interprets the wedding time in the visitor's local timezone. For this Kerala wedding, guests should generally view it from India; for robust global timezone handling, set an explicit timezone.

## Publish free
Netlify: create an account, then use its manual deploy/drag-and-drop workflow to upload the project contents with `index.html` at the published root.
GitHub Pages: upload the files to a repository, then open Settings → Pages and deploy from the main branch/root.

Venue map links are Google Maps searches based on the names supplied; verify the exact pins before sharing publicly.
