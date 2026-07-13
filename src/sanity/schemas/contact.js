export default {
  name: 'contact',
  title: 'Contact',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: R => R.required().email(),
    },
    {
      name: 'phone',
      title: 'Phone (optional)',
      type: 'string',
    },
    {
      name: 'github',
      title: 'GitHub URL',
      type: 'url',
    },
    {
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
    },
    {
      name: 'twitter',
      title: 'Twitter / X URL',
      type: 'url',
    },
    {
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    },
  ],
};
