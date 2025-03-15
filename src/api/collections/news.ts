import type { CollectionConfig } from 'payload';

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'titleRU',
  },

  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'titleRU',
      label: 'Title (Russian)',
      type: 'text',
      required: true,
    },
    {
      name: 'titleEN',
      label: 'Title (English)',
      type: 'text',
      required: true,
    },

    {
      name: 'descriptionEN',
      label: 'Description (English)',
      type: 'text',
      required: true,
    },
    {
      name: 'descriptionRU',
      label: 'Description (Russian)',
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
      name: 'contentRU',
      label: 'Content (Russian)',
      type: 'richText',
      required: true,
    },
    {
      name: 'contentEN',
      label: 'Content (English)',
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
