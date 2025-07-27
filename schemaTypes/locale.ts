import { defineType, defineField } from 'sanity'

export const supportedLanguages = [
  { id: 'fr', title: 'Français' },
  { id: 'en', title: 'English' },
]

export const baseLanguage = supportedLanguages.find(l => l.id === 'fr')

// Helper pour créer des champs multilingues
export const localeString = defineType({
  title: 'Localized string',
  name: 'localeString',
  type: 'object',
  fields: supportedLanguages.map(lang =>
    defineField({
      title: lang.title,
      name: lang.id,
      type: 'string',
      validation: lang.id === baseLanguage?.id ? (Rule: any) => Rule.required() : undefined
    })
  )
})

export const localeText = defineType({
  title: 'Localized text',
  name: 'localeText',
  type: 'object',
  fields: supportedLanguages.map(lang =>
    defineField({
      title: lang.title,
      name: lang.id,
      type: 'text',
      validation: lang.id === baseLanguage?.id ? (Rule: any) => Rule.required() : undefined
    })
  )
})

export const localeBlockContent = defineType({
  title: 'Localized block content',
  name: 'localeBlockContent',
  type: 'object',
  fields: supportedLanguages.map(lang =>
    defineField({
      title: lang.title,
      name: lang.id,
      type: 'array',
      of: [{ type: 'block' }],
      validation: lang.id === baseLanguage?.id ? (Rule: any) => Rule.required() : undefined
    })
  )
})