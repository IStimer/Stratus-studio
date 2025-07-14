import {defineField, defineType} from 'sanity'

export const contactImages = defineType({
  name: 'contactImages',
  title: 'Images Contact',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      description: 'Titre pour identifier ce set d\'images',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{
        type: 'image',
        options: {
          hotspot: true
        },
        fields: [
          {
            name: 'alt',
            type: 'string',
            title: 'Texte alternatif',
            description: 'Important pour l\'accessibilité et le SEO'
          }
        ]
      }],
      validation: Rule => Rule.required().min(1).max(20)
    }),
    defineField({
      name: 'isActive',
      title: 'Actif',
      type: 'boolean',
      description: 'Définir si ce set d\'images est actif',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'title',
      imageCount: 'images.length',
      isActive: 'isActive'
    },
    prepare({title, imageCount, isActive}) {
      return {
        title: title || 'Sans titre',
        subtitle: `${imageCount || 0} images ${isActive ? '(Actif)' : '(Inactif)'}`
      }
    }
  }
})