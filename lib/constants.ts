export const companyName = "Atlantic Drive Tours";
export const baseUrl = "https://www.atlanticdrivetours.ie";
export const phone = "+353 87 986 3470";
export const whatsappNumber = "+353 87 986 3470";
export const serviceArea =
  "Cork, Kerry, Clare, Limerick, Galway and Dublin";
export const primaryAudience = "International leisure tourists";

export const whatsappPrefill =
  "Hi Atlantic Drive Tours, I'd like to request availability. My dates are: ";

/**
 * Builds the pre-filled WhatsApp message for "Get more info" on tour detail pages.
 * Use the tour title from your tour data (e.g. tour.title).
 */
export function getTourWhatsAppMessage(tourTitle: string): string {
  return `Hi Atlantic Drive Tours, I am looking for more information about ${tourTitle}. My dates are: `;
}

/** Social links for footer. Update with real URLs when available. */
export const socialLinks = {
  facebook: "https://www.facebook.com/atlanticdrivetours",
  instagram: "https://www.instagram.com/atlanticdrivetours",
  whatsapp: `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappPrefill)}`,
};

export const navLinks = [
  { href: "/tours", label: "Tours" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];
