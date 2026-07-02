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
      name: 'images',
      type: 'array',
      title: 'Project Gallery (Optional)',
      description: 'Additional screenshots to showcase this project',
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
