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

      // About Page Section
      S.listItem()
        .title('ℹ️ About Page')
        .child(
          S.list()
            .title('About Page Content')
            .items([
              S.documentTypeListItem('aboutPage')
                .title('Page Content')
                .child(
                  S.document()
                    .schemaType('aboutPage')
                    .documentId('aboutPage')
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

      // Legal Pages Section
      S.listItem()
        .title('⚖️ Legal Pages')
        .child(
          S.list()
            .title('Legal Documents')
            .items([
              S.documentTypeListItem('legalPage')
                .title('All Legal Pages'),
              S.divider(),
              S.listItem()
                .title('Privacy Policy')
                .child(
                  S.documentList()
                    .title('Privacy Policy')
                    .filter('_type == "legalPage" && pageType == "privacy"')
                ),
              S.listItem()
                .title('Terms of Service')
                .child(
                  S.documentList()
                    .title('Terms of Service')
                    .filter('_type == "legalPage" && pageType == "terms"')
                ),
              S.listItem()
                .title('Cookie Policy')
                .child(
                  S.documentList()
                    .title('Cookie Policy')
                    .filter('_type == "legalPage" && pageType == "cookies"')
                ),
            ])
        ),

      S.divider(),

      // Other document types (if any)
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['post', 'category', 'author', 'homePage', 'schedule', 'radioStation', 'legalPage'].includes(item.getId()!),
      ),
    ])
