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
      name: 'user_id',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }],
    },
  ],
};
