import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {scheduleType} from './scheduleType'
import {homePageType} from './homePageType'
import {aboutPageType} from './aboutPageType'
import {radioStationType} from './radioStationType'
import {legalPageType} from './legalPageType'
import {flashySectionType} from './flashySectionType'
import {googleAdsType} from './googleAdsType'
import {contactSubmissionType} from './contactSubmissionType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Content types
    blockContentType,
    categoryType,
    postType,
    authorType,

    // Page types
    homePageType,
    aboutPageType,

    // Configuration types
    scheduleType,
    radioStationType,
    legalPageType,

    // Component types
    flashySectionType,
    googleAdsType,

    // Form submissions
    contactSubmissionType,
  ],
}
