export default {
  name: 'personalInfo',
  type: 'document',
  title: 'Personal Info',
  fields: [
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
    {
      name: 'web3FormsKey',
      type: 'string',
      title: 'Web3Forms Access Key',
      description: 'Get a free key from web3forms.com to enable background email submissions',
    },
  ],
}
