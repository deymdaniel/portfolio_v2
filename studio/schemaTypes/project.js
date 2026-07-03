export default {
  name: 'project',
  type: 'document',
  title: 'Showcase Projects',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Project Title',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
    },
    {
      name: 'images',
      type: 'array',
      title: 'Project Screenshots',
      description: 'Upload landscape screenshots for this project (recommended 1920x1080p)',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'technologies',
      type: 'array',
      title: 'Technologies Used',
      of: [{ type: 'string' }],
    },
    {
      name: 'liveUrl',
      type: 'url',
      title: 'Live Website URL',
    },
    {
      name: 'githubUrl',
      type: 'url',
      title: 'GitHub Repository URL',
    },
    {
      name: 'videoUrl',
      type: 'url',
      title: 'YouTube Video Walkthrough URL',
      description: 'Optional link to a video walkthrough of the project (e.g., an unlisted YouTube video)',
    },
    {
      name: 'order',
      type: 'number',
      title: 'Display Order',
      description: 'Lower numbers will be displayed first',
    },
  ],
}
