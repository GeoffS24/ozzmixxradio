// Initial data for Sanity documents
export const initialHomePageData = {
  _id: 'homePage',
  _type: 'homePage',
  title: 'Home Page Content',
  heroSection: {
    enabled: true,
    title: 'Tune In to Your Favorite Radio Station',
    description: 'Welcome to our vibrant radio community, where music and news come alive. Join us for an unforgettable listening experience, tailored just for you!',
    primaryButton: {
      text: 'Listen',
      link: '#listen',
    },
    secondaryButton: {
      text: 'Join',
      link: '#join',
    },
  },
  musicSection: {
    enabled: true,
    badge: 'Listen',
    title: 'Your Favorite Music, Anytime, Anywhere',
    description: 'Tune in to our station for a diverse mix of music. Enjoy seamless listening with our easy-to-use radio player.',
    radioStreamUrl: 'https://stream.ozzmixxradio.com/hls/ozzmixxradio/live.m3u8',
    statusApiUrl: 'https://stream.ozzmixxradio.com/api/nowplaying',
  },
  scheduleSection: {
    enabled: true,
    badge: 'Schedule',
    title: 'Weekly Schedule',
    description: 'Tune in to our weekly schedule for engaging shows and insightful discussions that keep you entertained.',
    displayFormat: 'list',
    showCurrentTime: true,
  },
  blogSection: {
    enabled: true,
    badge: 'Blog',
    title: 'Latest Music Industry Insights',
    description: 'Stay updated with the latest in music and radio.',
    postsToShow: 3,
  },
  contactSection: {
    enabled: true,
    badge: 'Contact',
    title: 'Get in Touch',
    description: 'Have questions or want to get involved? We\'d love to hear from you!',
    emailRecipient: 'info@ozzradio.com',
  },

  // Flashy Sections
  flashySections: [
    {
      enabled: true,
      sectionId: 'hero-cta',
      style: 'cta',
      backgroundType: 'gradient',
      gradientColors: {
        from: { hex: '#ff6b35' },
        to: { hex: '#f7931e' },
        direction: 'to-br',
      },
      overlay: {
        enabled: false,
      },
      content: {
        badge: 'Join the Beat',
        title: 'Experience the Ultimate Dance Music Journey',
        subtitle: 'Discover new tracks, enjoy live DJ sets, and connect with fellow music lovers.',
        buttons: [
          {
            text: 'Listen Now',
            url: '#music',
            style: 'primary',
          },
          {
            text: 'View Schedule',
            url: '/schedule',
            style: 'outline',
          },
        ],
      },
      animation: {
        enabled: true,
        type: 'fadeIn',
        duration: 1000,
        delay: 200,
      },
    },
    {
      enabled: true,
      sectionId: 'stats-section',
      style: 'stats',
      backgroundType: 'image',
      overlay: {
        enabled: true,
        color: { hex: '#000000' },
        opacity: 60,
      },
      content: {
        badge: 'Our Impact',
        title: 'Broadcasting Excellence Since Day One',
        subtitle: 'Join thousands of listeners who trust us for the best dance music experience.',
      },
      animation: {
        enabled: true,
        type: 'slideUp',
        duration: 800,
        delay: 0,
      },
    },
  ],

  // Google Ads Configuration
  googleAds: {
    enabled: false, // Disabled by default
    adClient: '', // To be filled by user
    adSlots: [
      {
        name: 'Header Banner',
        slotId: '',
        format: 'leaderboard',
        placement: 'header',
        enabled: false,
        showOnMobile: false,
        showOnDesktop: true,
      },
      {
        name: 'Content Top',
        slotId: '',
        format: 'rectangle',
        placement: 'content-top',
        enabled: false,
        showOnMobile: true,
        showOnDesktop: true,
      },
      {
        name: 'Sidebar',
        slotId: '',
        format: 'skyscraper',
        placement: 'sidebar',
        enabled: false,
        showOnMobile: false,
        showOnDesktop: true,
      },
      {
        name: 'Content Bottom',
        slotId: '',
        format: 'large-rectangle',
        placement: 'content-bottom',
        enabled: false,
        showOnMobile: true,
        showOnDesktop: true,
      },
    ],
    settings: {
      lazyLoading: true,
      refreshInterval: 0,
      testMode: true, // Enable for development
      blockedCategories: ['gambling', 'adult'],
    },
    analytics: {
      trackClicks: true,
      trackImpressions: true,
      customEvents: [],
    },
  },
  appDownloadSection: {
    enabled: true,
    badge: 'Download App',
    title: 'Take OZZ Dance Radio With You',
    description: 'Download our mobile app and enjoy your favorite dance music anywhere, anytime. Available for both Android and iOS devices.',
    androidUrl: 'https://play.google.com/store/apps/details?id=com.ozzmix.radio&pcampaignid=web_share',
    iosUrl: 'https://apps.apple.com/us/app/ozzmixx-dance-radio/id6477762868?platform=iphone',
  },
}

export const initialScheduleData = {
  _id: 'weeklySchedule',
  _type: 'schedule',
  title: 'Weekly Radio Schedule',
  timezone: 'Australia/Melbourne',
  weeklySchedule: [
    {
      dayOfWeek: 'monday',
      timeSlots: [
        {
          startTime: '06:00',
          endTime: '09:00',
          showName: 'Morning Energy',
          hostName: 'DJ Mike',
          description: 'Start your week with high-energy dance music and the latest hits.',
          genre: 'dance',
          isLive: true,
        },
        {
          startTime: '09:00',
          endTime: '12:00',
          showName: 'Electronic Vibes',
          hostName: 'Sarah Electronic',
          description: 'Deep electronic beats and underground tracks.',
          genre: 'electronic',
          isLive: true,
        },
        {
          startTime: '12:00',
          endTime: '15:00',
          showName: 'Lunch Mix',
          hostName: 'Auto DJ',
          description: 'Continuous mix of popular dance tracks.',
          genre: 'mixed',
          isLive: false,
        },
        {
          startTime: '15:00',
          endTime: '18:00',
          showName: 'Afternoon Beats',
          hostName: 'DJ Alex',
          description: 'Uplifting beats to power through your afternoon.',
          genre: 'dance',
          isLive: true,
        },
        {
          startTime: '18:00',
          endTime: '21:00',
          showName: 'Prime Time Dance',
          hostName: 'DJ Luna',
          description: 'The hottest dance tracks for your evening commute.',
          genre: 'dance',
          isLive: true,
        },
        {
          startTime: '21:00',
          endTime: '00:00',
          showName: 'Night Sessions',
          hostName: 'DJ Shadow',
          description: 'Deep house and progressive tracks for the night owls.',
          genre: 'electronic',
          isLive: true,
        },
      ],
    },
    {
      dayOfWeek: 'tuesday',
      timeSlots: [
        {
          startTime: '06:00',
          endTime: '09:00',
          showName: 'Tuesday Takeover',
          hostName: 'DJ Emma',
          description: 'Fresh tracks and exclusive mixes to start your Tuesday.',
          genre: 'dance',
          isLive: true,
        },
        {
          startTime: '09:00',
          endTime: '12:00',
          showName: 'Tech House Tuesday',
          hostName: 'DJ Tech',
          description: 'The best in tech house and minimal techno.',
          genre: 'electronic',
          isLive: true,
        },
      ],
    },
    {
      dayOfWeek: 'wednesday',
      timeSlots: [
        {
          startTime: '06:00',
          endTime: '09:00',
          showName: 'Midweek Motivation',
          hostName: 'DJ Power',
          description: 'Energizing tracks to get you through the middle of the week.',
          genre: 'dance',
          isLive: true,
        },
      ],
    },
    {
      dayOfWeek: 'thursday',
      timeSlots: [
        {
          startTime: '06:00',
          endTime: '09:00',
          showName: 'Thursday Throwback',
          hostName: 'DJ Retro',
          description: 'Classic dance hits and nostalgic electronic tracks.',
          genre: 'dance',
          isLive: true,
        },
      ],
    },
    {
      dayOfWeek: 'friday',
      timeSlots: [
        {
          startTime: '06:00',
          endTime: '09:00',
          showName: 'Friday Feeling',
          hostName: 'DJ Weekend',
          description: 'Get ready for the weekend with uplifting dance music.',
          genre: 'dance',
          isLive: true,
        },
        {
          startTime: '18:00',
          endTime: '22:00',
          showName: 'Friday Night Live',
          hostName: 'DJ Party',
          description: 'The biggest dance anthems to kick off your weekend.',
          genre: 'dance',
          isLive: true,
        },
      ],
    },
    {
      dayOfWeek: 'saturday',
      timeSlots: [
        {
          startTime: '10:00',
          endTime: '14:00',
          showName: 'Saturday Sessions',
          hostName: 'DJ Weekend',
          description: 'Extended mixes and special guest DJs.',
          genre: 'mixed',
          isLive: true,
        },
        {
          startTime: '20:00',
          endTime: '02:00',
          showName: 'Saturday Night Fever',
          hostName: 'DJ Fever',
          description: 'Non-stop dance music for your Saturday night.',
          genre: 'dance',
          isLive: true,
        },
      ],
    },
    {
      dayOfWeek: 'sunday',
      timeSlots: [
        {
          startTime: '12:00',
          endTime: '16:00',
          showName: 'Sunday Chill',
          hostName: 'DJ Relax',
          description: 'Downtempo and chilled electronic music for your Sunday.',
          genre: 'electronic',
          isLive: true,
        },
      ],
    },
  ],
}

export const initialAboutPageData = {
  _id: 'aboutPage',
  _type: 'aboutPage',
  title: 'About OZZ Dance Radio',
  slug: { current: 'about' },
  heroSection: {
    enabled: true,
    title: 'About OZZ Dance Radio',
    description: 'Learn more about our station, our mission, and the team behind the music that keeps you dancing.',
  },
  content: [
    {
      _type: 'block',
      style: 'h2',
      children: [{ _type: 'span', text: 'Our Story' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'OZZ Dance Radio was born from a passion for electronic dance music and a desire to bring the best beats to listeners around the world. Since our inception, we have been dedicated to showcasing both established and emerging artists in the dance music scene.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h2',
      children: [{ _type: 'span', text: 'Our Mission' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'We believe that music has the power to unite people and create unforgettable moments. Our mission is to provide a platform where dance music lovers can discover new tracks, enjoy their favorites, and connect with a community that shares their passion.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h2',
      children: [{ _type: 'span', text: 'What We Offer' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• 24/7 streaming of the latest dance, electronic, and house music\n• Live DJ sets and exclusive mixes\n• Interviews with artists and industry professionals\n• Music news and updates from the dance music world\n• Interactive shows where listeners can request their favorite tracks',
        },
      ],
    },
  ],
  teamSection: {
    enabled: true,
    title: 'Meet Our Team',
    description: 'Get to know the passionate people behind OZZ Dance Radio.',
    teamMembers: [
      {
        name: 'DJ Mike',
        role: 'Station Manager & Head DJ',
        bio: 'With over 10 years of experience in the dance music industry, Mike brings energy and expertise to every show.',
      },
      {
        name: 'Sarah Electronic',
        role: 'Music Director',
        bio: 'Sarah curates our playlist and discovers the hottest new tracks in electronic music.',
      },
      {
        name: 'Alex Beats',
        role: 'Technical Director',
        bio: 'Alex ensures our stream quality is always top-notch and our technology stays cutting-edge.',
      },
    ],
  },
  seoSettings: {
    metaTitle: 'About OZZ Dance Radio - Your Favorite Dance Music Station',
    metaDescription: 'Learn about OZZ Dance Radio, our mission to bring you the best dance music 24/7, and meet the passionate team behind the beats.',
    keywords: ['about', 'OZZ Dance Radio', 'dance music', 'electronic music', 'radio station', 'team'],
  },
}

export const initialRadioStationData = {
  _id: 'radioStationSettings',
  _type: 'radioStation',
  title: 'OZZ Dance Radio',
  tagline: 'Your favorite dance music station',
  description: 'Broadcasting the best in dance, electronic, and house music 24/7. Join our community of music lovers and discover your new favorite tracks.',
  radioConfig: {
    streamUrl: 'https://stream.ozzmixxradio.com/hls/ozzmixxradio/live.m3u8',
    statusApiUrl: 'https://stream.ozzmixxradio.com/api/nowplaying',
    defaultVolume: 50,
    autoPlay: false,
    showListenerCount: true,
  },
  contactInfo: {
    address: 'Level 1, 12 Sample St, Sydney NSW 2000',
    phone: '1800 123 4567',
    email: 'info@ozzradio.com',
    businessHours: 'Mon-Fri: 9AM-6PM, Sat-Sun: 10AM-4PM',
  },
  socialMedia: {
    facebook: 'https://facebook.com/ozzradio',
    instagram: 'https://instagram.com/ozzradio',
    twitter: 'https://twitter.com/ozzradio',
    youtube: 'https://youtube.com/ozzradio',
  },
  seoSettings: {
    metaTitle: 'OZZ Dance Radio - Your Favorite Dance Music Station',
    metaDescription: 'Listen to the best dance, electronic, and house music 24/7. Join OZZ Dance Radio for non-stop beats and the latest hits.',
    keywords: ['dance music', 'electronic music', 'house music', 'radio station', 'live DJ', 'music streaming'],
  },
}
