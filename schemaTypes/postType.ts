import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    // ✅ NOUVEAU CHAMP DESCRIPTION
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Courte description de l\'article (apparaît sur la page d\'accueil)',
      validation: (rule) => rule.max(200).warning('Idéalement moins de 200 caractères'),
    }),
    defineField({
      name: 'image',
      title: 'Image principale',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif',
          description: 'Description de l\'image pour l\'accessibilité',
          validation: (rule) => rule.required()
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Légende',
          description: 'Légende optionnelle pour l\'image'
        }
      ]
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          {title: 'Actualités', value: 'news'},
          {title: 'Tutoriels', value: 'tutorials'},
          {title: 'Projets', value: 'projects'},
          {title: 'Insights', value: 'insights'},
          {title: 'Autre', value: 'other'}
        ]
      },
      initialValue: 'news'
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'featured',
      title: 'Article mis en avant',
      type: 'boolean',
      initialValue: false,
      description: 'Cochez pour mettre en avant cet article'
    }),
    defineField({
      name: 'readingTime',
      title: 'Temps de lecture (minutes)',
      type: 'number',
      validation: (rule) => rule.min(1).max(60)
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      category: 'category',
      featured: 'featured',
      publishedAt: 'publishedAt'
    },
    prepare(selection) {
      const {title, category, featured, publishedAt} = selection
      const categoryLabels = {
        news: '📰',
        tutorials: '🎓',
        projects: '🚀',
        insights: '💡',
        other: '📝'
      }
      const categoryEmoji = categoryLabels[category] || '📝'
      const featuredFlag = featured ? ' ⭐' : ''
      const dateFormatted = new Date(publishedAt).toLocaleDateString('fr-FR')
      
      return {
        ...selection,
        title: `${categoryEmoji} ${title}${featuredFlag}`,
        subtitle: `${dateFormatted} - ${category || 'Non catégorisé'}`
      }
    }
  }
})
