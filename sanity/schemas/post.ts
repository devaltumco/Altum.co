import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    // --- CAMPOS DE CABECERA (Se mantienen igual) ---
    defineField({
      name: 'language',
      title: 'Idioma',
      type: 'string',
      options: { list: [{ title: 'Español', value: 'es' }, { title: 'Inglés', value: 'en' }] },
      initialValue: 'es',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'title', title: 'Título Principal', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'category', title: 'Categoría', type: 'string' }),
    defineField({ name: 'publishedAt', title: 'Fecha', type: 'datetime' }),
    defineField({ name: 'mainImage', title: 'Imagen Principal (Hero)', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'description', title: 'Resumen Corto', type: 'text', rows: 3 }),

    // --- AQUÍ ESTÁ LA MAGIA: CONTENIDO MIXTO ---
    defineField({
      name: 'content',
      title: 'Cuerpo del Artículo',
      type: 'array',
      of: [
        // 1. Texto
        { 
          type: 'block', 
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2 (Subtítulo)', value: 'h2'},
            {title: 'H3 (Sección)', value: 'h3'},
            {title: 'Cita', value: 'blockquote'},
          ]
        },
        // 2. Imagen (Insertable en cualquier lugar)
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', type: 'string', title: 'Leyenda de la foto', options: { isHighlighted: true } },
            { name: 'alt', type: 'string', title: 'Texto Alternativo (SEO)' }
          ]
        },
        // 3. Video YouTube
        {
          type: 'object',
          name: 'youtube',
          title: 'YouTube Embed',
          fields: [{ name: 'url', type: 'url', title: 'Link del video' }]
        },
        // 4. Tabla (Real, editable)
        {
          type: 'table',
          name: 'myTable',
          title: 'Tabla de Datos'
        },
        // 5. Cajas de Info (Callouts)
        {
          type: 'object',
          name: 'infoBox',
          title: 'Caja Destacada',
          fields: [
            { 
              name: 'variant', 
              title: 'Estilo', 
              type: 'string', 
              options: { list: [{title: 'Tip', value: 'tip'}, {title: 'Info', value: 'info'}, {title: 'Success', value: 'success'}] },
              initialValue: 'info'
            },
            { name: 'title', title: 'Título', type: 'string' },
            { name: 'content', title: 'Contenido', type: 'text' }
          ]
        },
        // 6. Audio/Podcast (Insertable en cualquier lugar)
        {
          type: 'object',
          name: 'podcast',
          title: 'Audio / Podcast Embed',
          fields: [
            { name: 'url', type: 'url', title: 'Link del archivo MP3 o Spotify' }
          ]
        }
      ],
    }),

    // --- AUTOR Y TRADUCCIÓN ---
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'object',
      fields: [
        { name: 'name', type: 'string' },
        { name: 'image', type: 'image' },
        { name: 'bio', type: 'text' }
      ]
    }),
    defineField({
      name: 'translation',
      title: 'Traducción',
      type: 'reference',
      to: [{ type: 'post' }]
    }),
  ],
})