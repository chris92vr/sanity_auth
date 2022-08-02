export default {
  name: 'budget',
  title: 'Budget',
  type: 'document',
  liveEdit: 'true',
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
      name: 'totalAmount',
      title: 'Total Amount',
      type: 'number',
      initial: 0,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'createdBy',
      title: 'Created by',
      type: 'reference',
      to: { type: 'user' },

      validation: (Rule) => Rule.required(),
    },
  ],
};
