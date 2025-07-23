'use client'

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { previewOrigin } from '@/sanity/config/environment'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: apiVersion}),
     presentationTool({
      previewUrl: {
        origin: previewOrigin,
        preview: "/",
        previewMode: {
          enable: previewOrigin+"/api/draft-mode/enable",
          disable: previewOrigin+"/api/draft-mode/disable",
        },
      },
    }),
  ],
})
