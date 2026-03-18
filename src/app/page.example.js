// app/page.example.js - Example of how to use SEO config in your routes

import { pages, structuredData } from "@/lib/seoConfig";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";

export const metadata = {
  title: pages.home.title,
  description: pages.home.description,
  keywords: pages.home.keywords,
  openGraph: {
    title: pages.home.ogTitle,
    description: pages.home.ogDescription,
    url: "https://members.techbes.co.in",
    images: [{
      url: pages.home.ogImage,
      width: 1200,
      height: 630,
      alt: "TechBes Home"
    }],
  }
};

export default function Home() {
  const breadcrumbItems = [
    { name: "Home", url: "https://members.techbes.co.in" }
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      
      <main>
        <h1>{pages.home.h1}</h1>
        
        {/* Your page content */}
        
        {pages.home.h2.map((heading, idx) => (
          <h2 key={idx}>{heading}</h2>
        ))}
      </main>
    </>
  );
}
