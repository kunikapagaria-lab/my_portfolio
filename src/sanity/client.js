import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset:   import.meta.env.VITE_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(client);
export const urlFor = source => builder.image(source);

// ── Queries ────────────────────────────────────────────────────────────────

export const aboutQuery = `*[_type == "about"][0]{
  name, designation, bio, location,
  profileImage, resumeFile
}`;

export const projectsQuery = `*[_type == "project"] | order(order asc){
  _id, title, slug, description, problemStatement, image,
  techStack, liveUrl, githubUrl, featured
}`;

export const skillsQuery = `*[_type == "skill"] | order(order asc){
  _id, name, category, proficiency, icon
}`;

export const contactQuery = `*[_type == "contact"][0]{
  email, phone, github, linkedin, twitter, instagram
}`;
