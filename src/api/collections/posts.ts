import type { CollectionConfig } from 'payload';

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },

  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      required: true,
    },
    {
      name: 'preview',
      label: 'Preview',
      type: 'upload',
      relationTo: 'media',
      displayPreview: true,
    },
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
      required: true,
    },
    {
      name: 'date',
      label: 'Date',
      type: 'date',
      defaultValue: () => new Date(),
      required: true,
    },
  ],
};
