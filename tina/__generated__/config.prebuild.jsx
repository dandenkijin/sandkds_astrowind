// tina/config.ts
import { defineSchema, defineConfig } from "tinacms";
var schema = defineSchema({
  collections: [
    {
      name: "post",
      label: "Posts",
      path: "src/content/posts",
      format: "mdx",
      fields: [
        {
          type: "string",
          name: "title",
          label: "Title",
          isTitle: true,
          required: true
        },
        {
          type: "string",
          name: "description",
          label: "Description",
          required: true
        },
        {
          type: "datetime",
          name: "pubDate",
          label: "Publication Date",
          required: true
        },
        {
          type: "boolean",
          name: "draft",
          label: "Draft",
          description: "If checked, this post will not be published"
        },
        {
          type: "rich-text",
          name: "body",
          label: "Body",
          isBody: true
        }
      ]
    }
  ]
});
var config = defineConfig({
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  branch: "main",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema
});
var config_default = config;
export {
  config_default as default
};
