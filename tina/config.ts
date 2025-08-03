// tina/config.ts
import { defineSchema, defineConfig } from 'tinacms';

const schema = defineSchema({
  collections: [
    {
      name: 'post',
      label: 'Posts',
      path: 'src/content/posts',
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
          name: 'description',
          label: 'Description',
          required: true,
        },
        {
          type: 'datetime',
          name: 'pubDate',
          label: 'Publication Date',
          required: true,
        },
        {
          type: 'boolean',
          name: 'draft',
          label: 'Draft',
          description: 'If checked, this post will not be published',
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
  branch: 'main',
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
