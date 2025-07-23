import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('OZZ Radio Station')
    .items([
      // Home Page Section
      S.listItem()
        .title('🏠 Home Page')
        .child(
          S.list()
            .title('Home Page Content')
            .items([
              S.documentTypeListItem('homePage')
                .title('Page Content')
                .child(
                  S.document()
                    .schemaType('homePage')
                    .documentId('homePage')
                ),
            ])
        ),

      S.divider(),

      // Schedule Section
      S.listItem()
        .title('📅 Schedule')
        .child(
          S.list()
            .title('Radio Schedule')
            .items([
              S.documentTypeListItem('schedule')
                .title('Weekly Schedule')
                .child(
                  S.document()
                    .schemaType('schedule')
                    .documentId('weeklySchedule')
                ),
            ])
        ),

      S.divider(),

      // News & Blog Section
      S.listItem()
        .title('📰 News & Blog')
        .child(
          S.list()
            .title('News & Blog Content')
            .items([
              S.documentTypeListItem('post').title('Blog Posts'),
              S.documentTypeListItem('category').title('Categories'),
              S.documentTypeListItem('author').title('Authors'),
            ])
        ),

      S.divider(),

      // Station Settings
      S.listItem()
        .title('⚙️ Station Settings')
        .child(
          S.list()
            .title('Station Configuration')
            .items([
              S.documentTypeListItem('radioStation')
                .title('Radio Station Settings')
                .child(
                  S.document()
                    .schemaType('radioStation')
                    .documentId('radioStationSettings')
                ),
            ])
        ),

      S.divider(),

      // Other document types (if any)
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['post', 'category', 'author', 'homePage', 'schedule', 'radioStation'].includes(item.getId()!),
      ),
    ])
