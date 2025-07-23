import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {scheduleType} from './scheduleType'
import {homePageType} from './homePageType'
import {radioStationType} from './radioStationType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Content types
    blockContentType,
    categoryType,
    postType,
    authorType,

    // Page types
    homePageType,

    // Configuration types
    scheduleType,
    radioStationType,
  ],
}
