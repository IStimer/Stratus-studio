import { defineType, defineField } from 'sanity'

export const heroBannerConfig = defineType({
  name: 'heroBannerConfig',
  title: 'Configuration Hero Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nom de la configuration',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'isActive',
      title: 'Configuration active',
      type: 'boolean',
      initialValue: false,
      description: 'Une seule configuration peut être active à la fois'
    }),
    defineField({
      name: 'selectionType',
      title: 'Type de sélection',
      type: 'string',
      options: {
        list: [
          { title: 'Vidéo unique', value: 'single' },
          { title: 'Rotation aléatoire', value: 'random' },
          { title: 'Rotation séquentielle', value: 'sequential' },
          { title: 'Programmée (par date)', value: 'scheduled' },
          { title: 'Conditionnelle (A/B test)', value: 'conditional' }
        ]
      },
      initialValue: 'single',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'videos',
      title: 'Vidéos disponibles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Nom de la vidéo',
              type: 'string',
              validation: Rule => Rule.required()
            },
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
              title: 'URL vidéo (alternative)',
              type: 'url',
              description: 'Utilisé si aucun fichier n\'est uploadé'
            },
            {
              name: 'weight',
              title: 'Poids (pour rotation aléatoire)',
              type: 'number',
              initialValue: 1,
              validation: Rule => Rule.min(1).max(100),
              hidden: ({ document }) => document?.selectionType !== 'random'
            },
            {
              name: 'startDate',
              title: 'Date de début',
              type: 'datetime',
              hidden: ({ document }) => document?.selectionType !== 'scheduled'
            },
            {
              name: 'endDate',
              title: 'Date de fin',
              type: 'datetime',
              hidden: ({ document }) => document?.selectionType !== 'scheduled'
            },
            {
              name: 'conditions',
              title: 'Conditions d\'affichage',
              type: 'object',
              hidden: ({ document }) => document?.selectionType !== 'conditional',
              fields: [
                {
                  name: 'userAgent',
                  title: 'Device',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Tous', value: 'all' },
                      { title: 'Mobile uniquement', value: 'mobile' },
                      { title: 'Desktop uniquement', value: 'desktop' }
                    ]
                  },
                  initialValue: 'all'
                },
                {
                  name: 'language',
                  title: 'Langue (code ISO)',
                  type: 'string',
                  description: 'Ex: fr, en, es...'
                }
              ]
            },
            {
              name: 'fallbackImage',
              title: 'Image de fallback',
              type: 'image',
              description: 'Affichée si la vidéo ne peut pas se charger',
              options: {
                hotspot: true
              }
            }
          ],
          preview: {
            select: {
              title: 'name',
              media: 'fallbackImage'
            }
          }
        }
      ],
      validation: Rule => Rule.min(1).error('Au moins une vidéo est requise')
    }),
    defineField({
      name: 'videoSettings',
      title: 'Paramètres vidéo',
      type: 'object',
      fields: [
        {
          name: 'autoplay',
          title: 'Lecture automatique',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'loop',
          title: 'Lecture en boucle',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'muted',
          title: 'Son coupé',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'controls',
          title: 'Afficher les contrôles',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'preload',
          title: 'Préchargement',
          type: 'string',
          options: {
            list: [
              { title: 'Aucun', value: 'none' },
              { title: 'Métadonnées', value: 'metadata' },
              { title: 'Automatique', value: 'auto' }
            ]
          },
          initialValue: 'metadata'
        }
      ]
    }),
    defineField({
      name: 'rotationInterval',
      title: 'Intervalle de rotation (minutes)',
      type: 'number',
      hidden: ({ document }) => !['random', 'sequential'].includes(document?.selectionType),
      initialValue: 60,
      validation: Rule => Rule.min(1).max(1440),
      description: 'Temps entre chaque changement de vidéo (1-1440 minutes)'
    })
  ],
  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
      selectionType: 'selectionType',
      videoCount: 'videos.length'
    },
    prepare(selection) {
      const { title, isActive, selectionType, videoCount } = selection
      const statusEmoji = isActive ? '🟢' : '🔴'
      const typeLabels = {
        single: 'Unique',
        random: 'Aléatoire',
        sequential: 'Séquentielle',
        scheduled: 'Programmée',
        conditional: 'Conditionnelle'
      }
      
      return {
        title: title,
        subtitle: `${statusEmoji} ${typeLabels[selectionType]} • ${videoCount || 0} vidéo(s)`
      }
    }
  }
})