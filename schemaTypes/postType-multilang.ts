import { defineField, defineType } from 'sanity'
import { supportedLanguages, baseLanguage } from './locale'

export const postTypeMultilang = defineType({
  name: 'postMultilang',
  title: 'Article (Multilingue)',
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
      name: 'excerpt',
      title: 'Extrait',
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
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
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
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'object',
          fields: supportedLanguages.map(lang =>
            defineField({
              name: lang.id,
              title: lang.title,
              type: 'string',
            })
          )
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'object',
          fields: supportedLanguages.map(lang =>
            defineField({
              name: lang.id,
              title: lang.title,
              type: 'text',
            })
          )
        }
      ]
    })
  ],
  preview: {
    select: {
      title: `title.${baseLanguage?.id}`,
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, media } = selection
      return {
        title: title || 'Sans titre',
        media,
      }
    },
  },
})