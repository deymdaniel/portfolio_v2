import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: 'k9sjfd4b',
  dataset: 'production',
  apiVersion: '2024-03-11',
  useCdn: true, // Use CDN for fast response times and cached API responses
})

const builder = createImageUrlBuilder(client)

export function urlFor(source) {
  if (!source) return ''
  return builder.image(source)
}
