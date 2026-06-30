export default {
  name: 'personalInfo',
  type: 'document',
  title: 'Personal Info',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email',
    },
    {
      name: 'location',
      type: 'string',
      title: 'Location',
    },
    {
      name: 'resume',
      type: 'file',
      title: 'Resume PDF',
      options: {
        accept: '.pdf',
      },
    },
  ],
}
