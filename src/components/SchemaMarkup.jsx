// components/SchemaMarkup.jsx - Reusable schema markup component

export function ServiceSchema({ serviceName, description, image, areaServed = "Bangalore" }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": serviceName,
          "description": description,
          "image": image,
          "provider": {
            "@type": "Organization",
            "name": "TechBes",
            "url": "https://members.techbes.co.in",
            "logo": "https://members.techbes.co.in/logo.png"
          },
          "serviceArea": {
            "@type": "City",
            "name": areaServed
          },
          "availableLanguage": "en"
        })
      }}
    />
  );
}

export function LocalBusinessSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "TechBes",
          "image": "https://members.techbes.co.in/logo.png",
          "description": "IT infrastructure solutions provider in Bangalore",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bangalore",
            "addressRegion": "Karnataka",
            "postalCode": "560001",
            "addressCountry": "IN"
          },
          "telephone": "+91-XXXXXXXXXX",
          "email": "contact@techbes.com",
          "url": "https://members.techbes.co.in",
          "priceRange": "$$",
          "sameAs": [
            "https://www.linkedin.com/company/techbes",
            "https://www.facebook.com/techbes",
            "https://twitter.com/techbes"
          ],
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
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 12.9716,
            "longitude": 77.5946
          }
        })
      }}
    />
  );
}

export function BreadcrumbSchema({ items }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          }))
        })
      }}
    />
  );
}

export function FAQSchema({ questions }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
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
      }}
    />
  );
}

export function ProductSchema({ name, description, image, price = null, manufacturer = "TechBes" }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": name,
          "description": description,
          "image": image,
          "brand": {
            "@type": "Brand",
            "name": manufacturer
          },
          ...(price && {
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "INR",
              "price": price
            }
          })
        })
      }}
    />
  );
}

export function ReviewSchema({ serviceOrProduct, rating, reviewCount, description }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Thing",
          "name": serviceOrProduct,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": rating,
            "ratingCount": reviewCount,
            "bestRating": 5,
            "worstRating": 1
          }
        })
      }}
    />
  );
}
