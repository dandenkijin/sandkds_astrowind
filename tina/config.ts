// tina/config.ts
import { defineSchema, defineConfig } from 'tinacms';

const schema = defineSchema({
  collections: [
    {
      name: 'post',
      label: 'Posts',
      path: 'src/data/post',
      format: 'mdx',
      fields: [
        {
          type: 'string',
          name: 'title',
          label: 'Title',
          isTitle: true,
          required: true,
        },
        {
          type: 'string',
          name: 'excerpt',
          label: 'Excerpt',
          required: true,
        },
        {
          type: 'datetime',
          name: 'publishDate',
          label: 'Publish Date',
          required: true,
        },
        {
          type: 'datetime',
          name: 'updateDate',
          label: 'Update Date',
        },
        {
          type: 'boolean',
          name: 'draft',
          label: 'Draft',
          description: 'If checked, this post will not be published',
        },
        {
          type: 'string',
          name: 'image',
          label: 'Image',
        },
        {
          type: 'string',
          name: 'category',
          label: 'Category',
        },
        {
          type: 'string',
          name: 'author',
          label: 'Author',
        },
        {
          type: 'string',
          name: 'tags',
          label: 'Tags',
          list: true,
        },
        {
          type: 'rich-text',
          name: 'body',
          label: 'Body',
          isBody: true,
        },
      ],
    },
    {
      name: 'page',
      label: 'Pages',
      path: 'src/content/pages',
      format: 'md',
      fields: [
        {
          type: 'string',
          name: 'title',
          label: 'Title',
          isTitle: true,
          required: true,
        },
        {
          type: 'string',
          name: 'description',
          label: 'Description',
        },
        {
          type: 'image',
          name: 'hero_image',
          label: 'Hero Image',
        },
        {
          type: 'rich-text',
          name: 'body',
          label: 'Body',
          isBody: true,
        },
      ],
    },
  ],
});

// Your tina config
const config = defineConfig({
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  branch: 'master',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'uploads',
      publicFolder: 'public',
    },
  },
  schema,
});

export default config;
