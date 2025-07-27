import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Articles',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de l\'article',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Titre en anglais',
      type: 'string',
      description: 'Version anglaise du titre',
    }),
    defineField({
      name: 'catchPhrase',
      title: 'Phrase d\'accroche',
      type: 'string',
      description: 'Petite phrase en gras sous le titre',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'catchPhraseEn',
      title: 'Phrase d\'accroche en anglais',
      type: 'string',
      description: 'Version anglaise de la phrase d\'accroche',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'string',
      initialValue: 'Stratus',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          {title: 'Actualités', value: 'news'},
          {title: 'Insights', value: 'insights'},
          {title: 'Projets', value: 'projects'},
          {title: 'Tutoriels', value: 'tutorials'},
          {title: 'Design', value: 'design'},
          {title: 'Scénographie', value: 'scenography'},
          {title: 'Autre', value: 'other'}
        ]
      },
      validation: Rule => Rule.required(),
      initialValue: 'news'
    }),
    defineField({
      name: 'mainImage',
      title: 'Image principale (hero)',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif',
          validation: Rule => Rule.required()
        }
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'excerpt',
      title: 'Extrait / Description',
      type: 'text',
      rows: 3,
      description: 'Courte description qui apparaît sur la page de listing',
      validation: Rule => Rule.required().max(200).warning('Idéalement moins de 200 caractères'),
    }),
    defineField({
      name: 'excerptEn',
      title: 'Extrait en anglais',
      type: 'text',
      rows: 3,
      description: 'Version anglaise de l\'extrait',
      validation: Rule => Rule.max(200).warning('Idéalement moins de 200 caractères'),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Tagline qui apparaît entre les blocs de contenu'
    }),
    defineField({
      name: 'taglineEn',
      title: 'Tagline en anglais',
      type: 'string',
      description: 'Version anglaise du tagline'
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
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    {title: 'Normal', value: 'normal'},
                    {title: 'H2', value: 'h2'},
                    {title: 'H3', value: 'h3'},
                    {title: 'Citation', value: 'blockquote'}
                  ],
                  lists: [
                    {title: 'Bullet', value: 'bullet'},
                    {title: 'Number', value: 'number'}
                  ],
                  marks: {
                    decorators: [
                      {title: 'Strong', value: 'strong'},
                      {title: 'Emphasis', value: 'em'},
                      {title: 'Underline', value: 'underline'},
                      {title: 'Code', value: 'code'}
                    ],
                    annotations: [
                      {
                        title: 'URL',
                        name: 'link',
                        type: 'object',
                        fields: [
                          {
                            title: 'URL',
                            name: 'href',
                            type: 'url'
                          }
                        ]
                      }
                    ]
                  }
                }
              ]
            }
          ],
          preview: {
            select: {
              content: 'content'
            },
            prepare({content}) {
              const text = content?.[0]?.children?.[0]?.text || ''
              return {
                title: 'Bloc de texte',
                subtitle: text.slice(0, 50) + (text.length > 50 ? '...' : '')
              }
            }
          }
        },
        {
          type: 'object',
          name: 'imageBlock',
          title: 'Bloc d\'image(s)',
          fields: [
            {
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
                      type: 'string',
                      title: 'Texte alternatif',
                      validation: Rule => Rule.required()
                    },
                    {
                      name: 'caption',
                      type: 'string',
                      title: 'Légende',
                    }
                  ]
                }
              ],
              validation: Rule => Rule.min(1).max(3)
            },
            {
              name: 'layout',
              title: 'Disposition',
              type: 'string',
              options: {
                list: [
                  {title: 'Une image pleine largeur', value: 'single'},
                  {title: 'Deux images côte à côte', value: 'double'},
                  {title: 'Trois images', value: 'triple'}
                ]
              },
              initialValue: 'single'
            }
          ],
          preview: {
            select: {
              images: 'images',
              layout: 'layout'
            },
            prepare({images, layout}) {
              const count = images?.length || 0
              return {
                title: 'Bloc d\'image(s)',
                subtitle: `${count} image(s) - Disposition: ${layout}`,
                media: images?.[0]
              }
            }
          }
        },
        {
          type: 'object',
          name: 'videoBlock',
          title: 'Bloc vidéo',
          fields: [
            {
              name: 'video',
              title: 'Fichier vidéo',
              type: 'file',
              options: {
                accept: 'video/*'
              }
            },
            {
              name: 'videoUrl',
              title: 'URL de la vidéo (YouTube, Vimeo)',
              type: 'url'
            },
            {
              name: 'poster',
              title: 'Image de couverture',
              type: 'image',
              options: {
                hotspot: true
              }
            },
            {
              name: 'caption',
              title: 'Légende',
              type: 'string'
            }
          ],
          preview: {
            select: {
              poster: 'poster',
              videoUrl: 'videoUrl',
              caption: 'caption'
            },
            prepare({poster, videoUrl, caption}) {
              return {
                title: 'Bloc vidéo',
                subtitle: caption || videoUrl || 'Fichier vidéo',
                media: poster
              }
            }
          }
        },
        {
          type: 'object',
          name: 'quoteBlock',
          title: 'Bloc citation',
          fields: [
            {
              name: 'quote',
              title: 'Citation',
              type: 'text',
              rows: 3,
              validation: Rule => Rule.required()
            },
            {
              name: 'author',
              title: 'Auteur',
              type: 'string'
            },
            {
              name: 'role',
              title: 'Rôle / Fonction',
              type: 'string'
            }
          ],
          preview: {
            select: {
              quote: 'quote',
              author: 'author'
            },
            prepare({quote, author}) {
              return {
                title: 'Citation',
                subtitle: `"${quote?.slice(0, 50)}..." - ${author || 'Anonyme'}`
              }
            }
          }
        }
      ]
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
      name: 'relatedPosts',
      title: 'Articles liés',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'post'}]
        }
      ],
      validation: Rule => Rule.max(3).unique()
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Article mis en avant',
      type: 'boolean',
      initialValue: false,
      description: 'Mettre en avant sur la page d\'accueil'
    }),
    defineField({
      name: 'readingTime',
      title: 'Temps de lecture (minutes)',
      type: 'number',
      validation: (rule) => rule.min(1).max(60)
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: Rule => Rule.max(60).warning('Idéalement moins de 60 caractères')
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: Rule => Rule.max(160).warning('Idéalement moins de 160 caractères')
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      category: 'category',
      featured: 'featured',
      publishedAt: 'publishedAt'
    },
    prepare(selection) {
      const {title, category, featured, publishedAt} = selection
      const categoryLabels = {
        news: '📰 Actualités',
        insights: '💡 Insights',
        projects: '🚀 Projets',
        tutorials: '🎓 Tutoriels',
        design: '🎨 Design',
        scenography: '🏛️ Scénographie',
        other: '📝 Autre'
      }
      const categoryLabel = categoryLabels[category] || '📝 Autre'
      const featuredFlag = featured ? ' ⭐' : ''
      const dateFormatted = new Date(publishedAt).toLocaleDateString('fr-FR')
      
      return {
        ...selection,
        title: `${title}${featuredFlag}`,
        subtitle: `${categoryLabel} - ${dateFormatted}`
      }
    }
  },
  orderings: [
    {
      title: 'Date de publication, Récent',
      name: 'publishedAtDesc',
      by: [
        {field: 'publishedAt', direction: 'desc'}
      ]
    },
    {
      title: 'Date de publication, Ancien',
      name: 'publishedAtAsc',
      by: [
        {field: 'publishedAt', direction: 'asc'}
      ]
    },
    {
      title: 'Titre, A-Z',
      name: 'titleAsc',
      by: [
        {field: 'title', direction: 'asc'}
      ]
    }
  ]
})