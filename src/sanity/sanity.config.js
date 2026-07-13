import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'sky-portfolio',
  title: 'Sky Portfolio CMS',

  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset:   import.meta.env.VITE_SANITY_DATASET ?? 'production',

  plugins: [
    structureTool({
      structure: S =>
        S.list()
          .title('Content')
          .items([
            S.documentTypeListItem('project').title('Projects'),
            S.documentTypeListItem('skill').title('Skills'),
            S.divider(),
            S.documentTypeListItem('about').title('About Me'),
            S.documentTypeListItem('contact').title('Contact'),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
});
