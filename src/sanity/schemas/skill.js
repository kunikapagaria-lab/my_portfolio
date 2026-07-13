export default {
  name: 'skill',
  title: 'Skills',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      validation: R => R.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend', value: 'Frontend' },
          { title: 'Backend', value: 'Backend' },
          { title: 'AI / ML', value: 'AI/ML' },
          { title: 'Tools & DevOps', value: 'Tools' },
          { title: 'Languages', value: 'Languages' },
        ],
      },
      validation: R => R.required(),
    },
    {
      name: 'proficiency',
      title: 'Proficiency (1–5)',
      type: 'number',
      validation: R => R.required().min(1).max(5),
    },
    {
      name: 'icon',
      title: 'Icon (emoji or text label)',
      type: 'string',
      description: 'e.g. ⚛️ or "React"',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    },
  ],
};
