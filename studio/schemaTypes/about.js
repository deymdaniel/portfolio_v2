export default {
  name: 'about',
  type: 'document',
  title: 'About Me',
  fields: [
    {
      name: 'skills',
      type: 'array',
      title: 'Skills',
      of: [{ type: 'string' }],
    },
  ],
}
