export default {
  name: 'expense',
  title: 'Expense',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'amount',
      title: 'Amount',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'budget_id',
      title: 'Budget',
      type: 'reference',
      to: [{ type: 'budget' }],
    },
    {
      name: 'createdAt',
      title: 'CreatedAt',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
  ],
};
