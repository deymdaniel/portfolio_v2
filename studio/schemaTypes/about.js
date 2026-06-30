export default {
  name: 'about',
  type: 'document',
  title: 'About Me',
  fields: [
    {
      name: 'description',
      type: 'text',
      title: 'Description',
    },
    {
      name: 'skills',
      type: 'array',
      title: 'Skills',
      of: [{ type: 'string' }],
    },
  ],
}
