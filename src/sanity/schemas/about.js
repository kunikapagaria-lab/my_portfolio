export default {
  name: 'about',
  title: 'About',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: R => R.required(),
    },
    {
      name: 'designation',
      title: 'Designation / Role',
      type: 'string',
      description: 'e.g. AI Assisted Developer',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 6,
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'resumeFile',
      title: 'Resume (PDF)',
      type: 'file',
      options: { accept: '.pdf' },
    },
  ],
};
