import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projets',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre du projet',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'catchPhrase',
      title: 'Phrase d\'accroche',
      type: 'string',
      description: 'Petite phrase en gras sous le titre',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'projectType',
      title: 'Type de projet',
      type: 'string',
      options: {
        list: [
          {title: 'Lancement de collection', value: 'collection-launch'},
          {title: 'Scénographie événementielle', value: 'event-scenography'},
          {title: 'Installation permanente', value: 'permanent-installation'},
          {title: 'Pop-up store', value: 'popup-store'},
          {title: 'Décoration de façade', value: 'facade-decoration'},
          {title: 'Autre', value: 'other'}
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'showBadge',
      title: 'Afficher le bandeau CRÉATION CONCEPTION PRODUCTION',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'mainImage',
      title: 'Image principale (fullscreen)',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif',
        }
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Tagline qui apparaît entre les deux premiers blocs de texte'
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
                  styles: [{title: 'Normal', value: 'normal'}],
                  lists: [],
                  marks: {
                    decorators: [
                      {title: 'Strong', value: 'strong'},
                      {title: 'Emphasis', value: 'em'}
                    ],
                    annotations: []
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
                  {title: 'Une image', value: 'single'},
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
            }
          ],
          preview: {
            select: {
              poster: 'poster',
              videoUrl: 'videoUrl'
            },
            prepare({poster, videoUrl}) {
              return {
                title: 'Bloc vidéo',
                subtitle: videoUrl || 'Fichier vidéo',
                media: poster
              }
            }
          }
        }
      ]
    }),
    defineField({
      name: 'date',
      title: 'Date du projet',
      type: 'date',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'featured',
      title: 'Projet mis en avant',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      initialValue: 0
    })
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
      media: 'mainImage',
      featured: 'featured'
    },
    prepare(selection) {
      const {title, client, featured} = selection
      return {
        ...selection,
        title: `${title}${featured ? ' ⭐' : ''}`,
        subtitle: client
      }
    }
  }
})