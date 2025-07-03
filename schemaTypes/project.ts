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
      name: 'mainImage',
      title: 'Image principale',
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
      name: 'gallery',
      title: 'Galerie d\'images',
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
      ]
    }),
    defineField({
      name: 'description',
      title: 'Description courte',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'fullDescription',
      title: 'Description complète',
      type: 'array',
      of: [
        {
          title: 'Block',
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