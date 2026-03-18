import "./globals.css";

export const metadata = {
  title: "TechBes | IT Infrastructure Solutions Bangalore",
  description: "Leading IT infrastructure solutions provider in Bangalore. Network, Data Centre, Cyber Security, CCTV, Collaboration & System Sales. Enterprise solutions for businesses.",
  keywords: "IT infrastructure Bangalore, network solutions, data centre, cyber security, CCTV surveillance, collaboration solutions, server sales",
  
  // Open Graph
  openGraph: {
    title: "TechBes | IT Infrastructure Solutions Bangalore",
    description: "Leading IT infrastructure solutions provider in Bangalore. Network, Data Centre, Cyber Security, CCTV, Collaboration & System Sales.",
    url: "https://members.techbes.co.in",
    siteName: "TechBes",
    images: [
      {
        url: "https://members.techbes.co.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TechBes - IT Infrastructure Solutions",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "TechBes | IT Infrastructure Solutions Bangalore",
    description: "Leading IT infrastructure solutions provider in Bangalore.",
    images: ["https://members.techbes.co.in/og-image.jpg"],
  },

  // Additional Meta Tags
  metadataBase: new URL("https://members.techbes.co.in"),
  canonical: "https://members.techbes.co.in",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  
  // Local Business
  alternates: {
    canonical: "https://techbes.com",
  },

  // Verification
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="https://cdn.example.com" />
        
        {/* Mobile optimizations */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#ffffff" />
        
        {/* Additional SEO meta tags */}
        <meta name="language" content="en-IN" />
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bangalore" />
        <meta name="geo.position" content="12.9716;77.5946" />
        <meta name="ICBM" content="12.9716, 77.5946" />
        
        {/* Structured Data - Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "TechBes",
              "url": "https://members.techbes.co.in",
              "logo": "https://members.techbes.co.in/logo.png",
              "description": "Leading IT infrastructure solutions provider in Bangalore offering network infrastructure, data centre solutions, cyber security, and more.",
              "sameAs": [
                "https://www.linkedin.com/company/techbes",
                "https://www.facebook.com/techbes",
                "https://twitter.com/techbes"
              ],
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "contactType": "Sales",
                  "telephone": "+91-XXXXXXXXXX",
                  "email": "sales@techbes.com",
                  "areaServed": ["IN"],
                  "availableLanguage": "en"
                },
                {
                  "@type": "ContactPoint",
                  "contactType": "Support",
                  "telephone": "+91-XXXXXXXXXX",
                  "email": "support@techbes.com",
                  "areaServed": ["IN"]
                }
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Bangalore",
                "addressLocality": "Bangalore",
                "addressRegion": "Karnataka",
                "postalCode": "560001",
                "addressCountry": "IN"
              }
            })
          }}
        />

        {/* Structured Data - Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "TechBes",
              "image": "https://members.techbes.co.in/logo.png",
              "description": "IT infrastructure solutions provider",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Bangalore",
                "addressLocality": "Bangalore",
                "addressRegion": "Karnataka",
                "postalCode": "560001",
                "addressCountry": "IN"
              },
              "telephone": "+91-XXXXXXXXXX",
              "email": "contact@techbes.com",
              "url": "https://members.techbes.co.in",
              "priceRange": "$$",
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Bangalore"
                },
                {
                  "@type": "State",
                  "name": "Karnataka"
                },
                {
                  "@type": "Country",
                  "name": "India"
                }
              ],
              "serviceArea": "IN",
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 12.9716,
                "longitude": 77.5946
              }
            })
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
