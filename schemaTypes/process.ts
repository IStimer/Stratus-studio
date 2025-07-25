import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'process',
  title: 'Processus',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Ordre',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Petite description',
      type: 'text',
      rows: 2,
      description: 'Description courte du processus',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'steps',
      title: 'Liste des étapes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Titre de l\'étape',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Texte alternatif',
              type: 'string',
              description: 'Important pour l\'accessibilité et le SEO',
            },
            {
              name: 'caption',
              title: 'Légende',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(3).error('Vous pouvez ajouter jusqu\'à 3 images maximum'),
      description: 'Vous pouvez ajouter entre 1 et 3 images',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
      media: 'images.0',
    },
    prepare(selection) {
      const { title, order, media } = selection;
      return {
        title: `${order.toString().padStart(2, '0')} - ${title}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Ordre',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});