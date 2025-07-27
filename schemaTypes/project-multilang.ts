import { defineField, defineType } from 'sanity'
import { supportedLanguages, baseLanguage } from './locale'

export const projectMultilang = defineType({
  name: 'projectMultilang',
  title: 'Projet (Multilingue)',
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
      validation: (Rule) => Rule.required(),
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
      name: 'client',
      title: 'Client',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'projectType',
      title: 'Type de projet',
      type: 'object',
      fields: supportedLanguages.map(lang =>
        defineField({
          name: lang.id,
          title: lang.title,
          type: 'string',
        })
      )
    }),
    defineField({
      name: 'catchPhrase',
      title: 'Phrase d\'accroche',
      type: 'object',
      fields: supportedLanguages.map(lang =>
        defineField({
          name: lang.id,
          title: lang.title,
          type: 'string',
        })
      )
    }),
    defineField({
      name: 'mainImage',
      title: 'Image principale (hero)',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date du projet',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Projet mis en avant',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contentBlocks',
      title: 'Blocs de contenu',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'textBlock',
          title: 'Bloc de texte',
          fields: [
            {
              name: 'content',
              title: 'Contenu',
              type: 'object',
              fields: supportedLanguages.map(lang =>
                defineField({
                  name: lang.id,
                  title: lang.title,
                  type: 'array',
                  of: [{ type: 'block' }],
                })
              )
            }
          ]
        },
        {
          type: 'object',
          name: 'imageBlock',
          title: 'Bloc d\'image',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true }
            },
            {
              name: 'caption',
              title: 'Légende',
              type: 'object',
              fields: supportedLanguages.map(lang =>
                defineField({
                  name: lang.id,
                  title: lang.title,
                  type: 'string',
                })
              )
            }
          ]
        }
      ]
    })
  ],
  preview: {
    select: {
      title: `title.${baseLanguage?.id}`,
      client: 'client',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, client, media } = selection
      return {
        title: `${client} - ${title || 'Sans titre'}`,
        media,
      }
    },
  },
})