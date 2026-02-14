# Website Template

A modern, customizable Next.js website template built with TypeScript and Tailwind CSS. Perfect for businesses offering services like transportation, painting, decorating, and more.

## Features

- 🎨 **Easy Theme Customization** - Change the entire website theme by adjusting CSS variables
- 📱 **Fully Responsive** - Works beautifully on all devices
- 🚀 **Next.js 16** - Built with the latest Next.js App Router
- ⚡ **TypeScript** - Fully typed for better development experience
- 🎯 **SEO Friendly** - Optimized for search engines
- 🎭 **Sticky Header** - Navigation that stays visible while scrolling
- 📧 **Contact Form** - Ready-to-use contact form
- 🔗 **Social Media Links** - Footer with social media integration

## Pages

- **Homepage** - Welcome page with hero section, features, and service previews
- **Services** - Listing page showing all available services
- **Service Details** - Dynamic pages for each individual service
- **About** - Business information and company story
- **Contact** - Contact form and business information

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Theme Customization

The entire website theme can be customized by editing CSS variables in `app/globals.css`. Simply modify the `:root` variables to change colors throughout the site:

### Primary Colors
- `--primary`: Main brand color (default: #2563eb - blue)
- `--primary-dark`: Darker shade for hover states
- `--primary-light`: Lighter shade for accents

### Secondary Colors
- `--secondary`: Secondary brand color (default: #10b981 - green)
- `--secondary-dark`: Darker shade
- `--secondary-light`: Lighter shade

### Accent Colors
- `--accent`: Accent color (default: #f59e0b - amber)
- `--accent-dark`: Darker shade
- `--accent-light`: Lighter shade

### Neutral Colors
- `--background`: Page background color
- `--foreground`: Main text color
- `--muted`: Muted background color
- `--muted-foreground`: Muted text color
- `--border`: Border color

### Text Colors
- `--text-primary`: Primary text color
- `--text-secondary`: Secondary text color
- `--text-muted`: Muted text color

### Header/Footer
- `--header-bg`: Header background color
- `--footer-bg`: Footer background color
- `--footer-text`: Footer text color

### Example Theme Change

To change the primary color to purple, edit `app/globals.css`:

```css
:root {
  --primary: #9333ea;
  --primary-dark: #7e22ce;
  --primary-light: #a855f7;
  /* ... other variables */
}
```

All components using the primary color will automatically update!

## Project Structure

```
website-template/
├── app/
│   ├── about/          # About page
│   ├── contact/        # Contact page with form
│   ├── services/       # Services pages
│   │   ├── page.tsx    # Services listing
│   │   └── [id]/       # Dynamic service detail pages
│   ├── globals.css     # Global styles and theme variables
│   ├── layout.tsx      # Root layout with Header/Footer
│   └── page.tsx        # Homepage
├── components/
│   ├── Header.tsx      # Sticky navigation header
│   └── Footer.tsx     # Footer with social links
├── data/
│   └── services.ts    # Service data and types
└── public/             # Static assets (images, etc.)
```

## Adding Images

To add images for services:

1. Place images in `public/images/` directory
2. Update the `image` property in `data/services.ts` to match your image filenames
3. The service detail pages will automatically display the images

Example:
```typescript
{
  id: 'school-transport',
  image: '/images/school-transport.jpg',
  // ...
}
```

## Customizing Services

Edit `data/services.ts` to add, remove, or modify services. Each service includes:
- `id`: Unique identifier (used in URLs)
- `title`: Service name
- `description`: Short description for listings
- `fullDescription`: Detailed description for service pages
- `image`: Path to service image
- `features`: Array of feature points

## Social Media Links

Update social media links in `components/Footer.tsx`. The footer includes:
- Facebook
- Twitter/X
- Instagram
- LinkedIn

Simply update the `href` values in the `socialLinks` array.

## Contact and Enquiry Forms (Email)

The contact form (`/contact`) and reservation enquiry form (`/reservation`) send emails via [Resend](https://resend.com). The APIs are `app/api/contact/route.ts` and `app/api/enquiry/route.ts`.

To send real emails (instead of the dev fallback that only logs to the console):

1. Sign up at [resend.com](https://resend.com) and create an API key.
2. Copy `.env.example` to `.env.local` and set:
   - `RESEND_API_KEY` – your Resend API key
   - `EMAIL_TO` – address that receives enquiries and contact messages
   - `EMAIL_FROM` – sender address (must be a [verified domain](https://resend.com/docs/dashboard/domains/introduction) or use Resend’s sandbox, e.g. `onboarding@resend.dev`)
3. Restart the dev server after changing `.env.local`.

In production (e.g. Vercel), set the same variables in the host’s environment.

## Technologies Used

- [Next.js 16](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS 4](https://tailwindcss.com/) - Styling
- [React 19](https://react.dev/) - UI library

## License

This project is open source and available for use in your projects.

## Support

For questions or issues, please open an issue on the repository or contact the development team.
