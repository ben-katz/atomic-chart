import { MetadataRoute } from 'next'

// Import the element data
import elementData from "@/data/elements.json"

export default function sitemap(): MetadataRoute.Sitemap {

  // Will use the production URL when deployed
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'localhost:3000'

  // Generate sitemap entries for /elements/[slug] pages
  const elementsPages = elementData.elements.map((element) => ({
    url: `${baseUrl}/elements/${element.name.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    // Home page - we'll update this page later
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    // Elements pages
    ...elementsPages
  ]
}