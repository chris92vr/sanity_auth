export default {
  name: 'budget',
  title: 'Budget',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'max',
      title: 'Max',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'createdBy',
      title: 'Created by',
      type: 'reference',
      to: { type: 'user' },
    },
  ],
  preview: {
    select: {
      title: 'title',
      max: 'max',
      user_id: 'user_id',
    },
  },
};
