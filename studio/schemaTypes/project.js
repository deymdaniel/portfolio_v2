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
      name: 'image',
      type: 'image',
      title: 'Project Screenshot (Cover)',
      options: {
        hotspot: true, // Enables UI for cropping and selecting focal point
      },
    },
    {
      name: 'landscapeImages',
      type: 'array',
      title: 'Landscape / Web Screenshots (Optional)',
      description: 'Screenshots of the desktop/website layout',
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
      name: 'portraitImages',
      type: 'array',
      title: 'Portrait / Mobile Screenshots (Optional)',
      description: 'Screenshots or mockups of the mobile layout',
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
