import type { CollectionConfig } from 'payload';

export const FAQ: CollectionConfig = {
  slug: 'faq',
  admin: {
    useAsTitle: 'title',
  },

  fields: [
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
  ],
};
