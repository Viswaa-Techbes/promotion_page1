// lib/seoConfig.js - Centralized SEO configuration

export const siteConfig = {
  name: "TechBes",
  baseUrl: "https://members.techbes.co.in",
  logo: "https://members.techbes.co.in/logo.png",
  ogImage: "https://members.techbes.co.in/og-image.jpg",
  defaultTitle: "TechBes | IT Infrastructure Solutions Bangalore",
  defaultDescription: "Leading IT infrastructure solutions provider in Bangalore. Network, Data Centre, Cyber Security, CCTV, Collaboration & System Sales.",
};

export const pages = {
  home: {
    title: "TechBes | IT Infrastructure Solutions Bangalore | Enterprise IT Services",
    description: "Leading IT infrastructure solutions provider in Bangalore. Network infrastructure, Data Centre, Cyber Security, CCTV, Collaboration solutions, and System Sales for enterprises.",
    keywords: "IT infrastructure solutions Bangalore, network infrastructure, data centre solutions, cyber security, CCTV surveillance, collaboration solutions, server sales, enterprise IT",
    ogTitle: "TechBes | IT Infrastructure Solutions Bangalore",
    ogDescription: "Enterprise IT infrastructure solutions in Bangalore. Network, Data Centre, Cyber Security, CCTV, Collaboration & System Sales.",
    ogImage: "https://members.techbes.co.in/og-home.jpg",
    h1: "IT Infrastructure Solutions for Enterprise Businesses in Bangalore",
    h2: [
      "Network Infrastructure Solutions (LAN, WAN, SD-WAN)",
      "Data Centre Solutions",
      "Cyber Security Solutions",
      "CCTV & Surveillance Systems",
      "Collaboration Solutions",
      "System Sales & Support"
    ],
  },
  
  about: {
    title: "About TechBes | IT Infrastructure Partner Bangalore",
    description: "Learn about TechBes, a trusted IT infrastructure solutions provider in Bangalore serving enterprises with network, data centre, and cyber security solutions since establishment.",
    keywords: "about TechBes, IT infrastructure company Bangalore, network infrastructure provider, trusted IT partner",
    ogTitle: "About TechBes | IT Infrastructure Expert",
    ogDescription: "TechBes is a leading IT infrastructure solutions provider in Bangalore with expertise in network, data centre, and enterprise IT solutions.",
    ogImage: "https://members.techbes.co.in/og-about.jpg",
    h1: "About TechBes - Your IT Infrastructure Partner in Bangalore",
    h2: [
      "Our Mission",
      "Our Expertise",
      "Why Choose TechBes",
      "Our Track Record"
    ],
  },

  services: {
    title: "IT Infrastructure Services | Network, Data Centre, Cyber Security Bangalore",
    description: "Comprehensive IT infrastructure services in Bangalore: Network Solutions, Data Centre, Cyber Security, CCTV Surveillance, Collaboration Tools, System Sales & AMC support.",
    keywords: "IT infrastructure services Bangalore, network solutions, data centre services, cyber security services, surveillance systems, collaboration solutions, system sales",
    ogTitle: "IT Infrastructure Services | TechBes Bangalore",
    ogDescription: "Complete IT infrastructure services including networking, data centre, cyber security, surveillance, collaboration, and system sales in Bangalore.",
    ogImage: "https://members.techbes.co.in/og-services.jpg",
    h1: "IT Infrastructure Services for Enterprises in Bangalore",
    h2: [
      "Network Infrastructure (LAN, WAN, SD-WAN)",
      "Data Centre Solutions",
      "Cyber Security Solutions",
      "CCTV & Surveillance Systems",
      "Collaboration Solutions",
      "System Sales & Distribution",
      "Annual Maintenance Contracts (AMC)",
      "Fire Alarm Systems"
    ],
  },

  clients: {
    title: "Our Clients | TechBes IT Infrastructure Solutions Bangalore",
    description: "TechBes serves leading enterprises and businesses in Bangalore with trusted IT infrastructure solutions. View our client portfolio and case studies.",
    keywords: "TechBes clients, IT infrastructure clients Bangalore, enterprise clients, case studies",
    ogTitle: "Our Clients | TechBes Enterprise Solutions",
    ogDescription: "TechBes partners with leading enterprises in Bangalore for IT infrastructure solutions.",
    ogImage: "https://members.techbes.co.in/og-clients.jpg",
    h1: "Enterprise Clients We Serve in Bangalore",
    h2: [
      "Client Portfolio",
      "Success Stories",
      "Industry Expertise",
      "Client Testimonials"
    ],
  },

  contact: {
    title: "Contact TechBes | IT Infrastructure Solutions Bangalore",
    description: "Get in touch with TechBes for IT infrastructure solutions in Bangalore. Contact our team for network, data centre, cyber security, and more services.",
    keywords: "contact TechBes, IT infrastructure support Bangalore, get quote, contact IT solutions provider",
    ogTitle: "Contact TechBes | IT Infrastructure Support Bangalore",
    ogDescription: "Contact TechBes in Bangalore for IT infrastructure services, quotes, and technical support.",
    ogImage: "https://members.techbes.co.in/og-contact.jpg",
    h1: "Contact TechBes - IT Infrastructure Solutions Support",
    h2: [
      "Get in Touch",
      "Send us a Message",
      "Call Our Team",
      "Visit Our Office"
    ],
  },
};

export const keywords = {
  primary: [
    "IT infrastructure solutions Bangalore",
    "network infrastructure provider",
    "data centre solutions",
    "cyber security solutions",
    "CCTV surveillance systems",
    "collaboration solutions",
    "system sales Bangalore",
    "LAN WAN SD-WAN solutions",
    "enterprise IT services",
    "IT infrastructure company Bangalore",
    "network infrastructure Bangalore",
    "cyber security Bangalore",
    "data centre Bangalore",
    "IT services Bangalore",
    "infrastructure management"
  ],

  secondary: [
    "server sales Bangalore",
    "network equipment supplier",
    "surveillance camera systems",
    "video conferencing solutions",
    "firewall and security",
    "network maintenance services",
    "IT infrastructure consulting",
    "storage solutions",
    "networking devices",
    "communication tools",
    "annual maintenance contracts",
    "fire alarm systems",
    "IT support services",
    "enterprise network solutions",
    "bandwidth management"
  ],

  localSEO: [
    "IT infrastructure solutions Bangalore India",
    "network solutions near me",
    "cyber security Bangalore",
    "data centre Bangalore",
    "CCTV systems Bangalore",
    "IT services Karnataka",
    "network infrastructure Karnataka",
    "business IT solutions Bangalore",
    "enterprise IT Bangalore",
    "IT infrastructure Whitefield",
    "IT services Indiranagar",
    "network solutions Koramangala",
    "cyber security consulting Bangalore"
  ],
};

export const structuredData = {
  service: (serviceName, description, price = null, rating = null) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "TechBes",
      "url": "https://members.techbes.co.in"
    },
    ...(rating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": rating,
        "ratingCount": 50
      }
    }),
    ...(price && { "price": price }),
    "areaServed": {
      "@type": "City",
      "name": "Bangalore"
    },
    "serviceArea": "IN"
  }),

  product: (productName, image, description, price = null) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": productName,
    "image": image,
    "description": description,
    "brand": {
      "@type": "Brand",
      "name": "TechBes"
    },
    ...(price && {
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "price": price
      }
    })
  }),

  breadcrumb: (items) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }),

  faq: (questions) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  })
};
