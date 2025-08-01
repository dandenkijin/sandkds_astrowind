# Decap CMS with Astro

This project uses [Decap CMS](https://decapcms.org/) (formerly Netlify CMS) for content management. This document provides setup and usage instructions.

## Setup

1. **Enable Git Gateway**
   - Go to your Netlify site settings
   - Navigate to "Identity" and enable it
   - Under "Registration" select "Invite only"
   - Go to "Services" and enable "Git Gateway"
   - Click "Enable Git Gateway" and authenticate with your Git provider

2. **Invite Users**
   - In Netlify, go to "Identity" > "Invite users"
   - Enter the email addresses of your content editors
   - They will receive an invitation to set up their account

## Local Development

1. **Install the Netlify CLI** (if not already installed):
   ```bash
   npm install -g netlify-cli
   ```

2. **Start the local development server with Netlify Dev**:
   ```bash
   netlify dev
   ```
   This will start both the Astro development server and the Netlify proxy server.

3. **Access the Admin Panel**:
   - Open http://localhost:8888/admin
   - You'll be prompted to log in with your Netlify Identity credentials

## Content Management

### Collections

Content is organized into collections defined in `static/admin/config.yml`. The default setup includes:

- **Pages**: Static pages like Home, About, etc.
- **Blog**: Blog posts with support for categories and tags

### Media Files

- Uploaded media is stored in `public/images/uploads`
- Reference media in your content using the path `/images/uploads/filename.jpg`

## Adding New Content Types

To add a new content type:

1. Edit `static/admin/config.yml`
2. Add a new collection following the existing pattern
3. The content will be available in the admin panel after saving

## Deployment

1. Push your changes to your Git repository
2. Netlify will automatically build and deploy your site
3. The admin panel will be available at `https://your-site.netlify.app/admin`

## Troubleshooting

- **Admin panel not loading**: Make sure you're logged in and have the correct permissions
- **Git Gateway errors**: Check your Netlify site settings and ensure Git Gateway is properly configured
- **Local development issues**: Try clearing your browser cache or running `netlify dev --clear`

## Resources

- [Decap CMS Documentation](https://decapcms.org/docs/intro/)
- [Netlify Identity](https://docs.netlify.com/visitor-access/identity/)
- [Git Gateway](https://docs.netlify.com/visitor-access/git-gateway/)
