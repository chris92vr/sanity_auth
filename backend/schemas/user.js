export default {
  name: 'user',
  title: 'User',
  type: 'document',
  liveEdit: 'true',
  fields: [
    {
      name: 'userName',
      title: 'UserName',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'string',
    },
    {
      name: 'totalMax',
      title: 'Total Max',
      initial: 0,
      type: 'number',
    },
    {
      name: 'totalAmount',
      title: 'Total Amount',
      initial: 0,
      type: 'number',
    },
    {
      name: 'dayOfSalary',
      title: 'Day Of Salary',
      initial: 23,
      type: 'number',
    },
  ],
};
