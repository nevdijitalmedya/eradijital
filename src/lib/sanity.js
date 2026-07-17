import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  perspective: 'published',
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  if (!source) return '';
  return builder.image(source);
}
