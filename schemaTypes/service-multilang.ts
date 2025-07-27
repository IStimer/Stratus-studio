import { defineField, defineType } from 'sanity'
import { supportedLanguages, baseLanguage } from './locale'

export const serviceMultilang = defineType({
  name: 'serviceMultilang',
  title: 'Service (Multilingue)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'object',
      fields: supportedLanguages.map(lang =>
        defineField({
          name: lang.id,
          title: lang.title,
          type: 'string',
          validation: lang.id === baseLanguage?.id ? (Rule: any) => Rule.required() : undefined
        })
      ),
      preview: {
        select: {
          fr: 'fr',
          en: 'en'
        },
        prepare: ({ fr, en }) => ({
          title: fr || en || 'Sans titre'
        })
      }
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: `title.${baseLanguage?.id}`,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Description courte',
      type: 'object',
      fields: supportedLanguages.map(lang =>
        defineField({
          name: lang.id,
          title: lang.title,
          type: 'text',
          rows: 3,
        })
      )
    }),
    defineField({
      name: 'services',
      title: 'Liste des services',
      type: 'object',
      fields: supportedLanguages.map(lang =>
        defineField({
          name: lang.id,
          title: lang.title,
          type: 'array',
          of: [{ type: 'string' }],
        })
      )
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: `title.${baseLanguage?.id}`,
      media: 'image',
      order: 'order',
    },
    prepare(selection) {
      const { title, media, order } = selection
      return {
        title: `${order}. ${title || 'Sans titre'}`,
        media,
      }
    },
  },
})