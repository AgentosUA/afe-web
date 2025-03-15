import type { CollectionConfig } from 'payload';

export const FAQ: CollectionConfig = {
  slug: 'faq',
  admin: {
    useAsTitle: 'titleRU',
  },

  fields: [
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
      name: 'descriptionRU',
      label: 'Description (Russian)',
      type: 'text',
      required: true,
    },
    {
      name: 'descriptionEN',
      label: 'Description (English)',
      type: 'text',
      required: true,
    },
  ],
};
