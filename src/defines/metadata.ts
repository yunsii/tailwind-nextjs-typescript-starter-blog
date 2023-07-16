export interface Metadata {
  title: string
  author: string
  headerTitle: string
  description: string
  /**
   * ref: https://lingohub.com/developers/supported-locales/language-designators-with-regions
   */
  language: string
  /** absolute full path */
  siteUrl: string
  /** relative path under public */
  siteLogo: string
  /** absolute full path */
  siteRepo?: string
  theme?: 'system' | 'dark' | 'light'
  /** relative path under public */
  image: string
  /** relative path under public */
  socialBanner?: string
  email?: string
  /** absolute full path */
  github?: string
  /** absolute full path */
  juejin?: string
  /** absolute full path */
  twitter?: string
  /** absolute full path */
  facebook?: string
  /** absolute full path */
  youtube?: string
  /** absolute full path */
  linkedin?: string
  /**
   * ref: https://lingohub.com/developers/supported-locales/language-designators-with-regions
   */
  locale: string
  analytics?: {
    // supports plausible, simpleAnalytics, umami or googleAnalytics
    // e.g. tailwind-nextjs-starter-blog.vercel.app
    plausibleDataDomain?: string
    /** true or false */
    simpleAnalytics?: boolean
    /** e.g. 123e4567-e89b-12d3-a456-426614174000 */
    umamiWebsiteId?: string
    /** e.g. UA-000000-2 or G-XXXXXXX */
    googleAnalyticsId?: string
  }
  newsletter?: {
    // Please add your .env file and modify it according to your selection
    provider?: 'buttondown' | 'mailchimp' | 'convertkit' | 'klaviyo'
  }
  comment?: {
    /**
     * Select a provider and use the environment variables associated to it
     *
     * ref: https://vercel.com/docs/environment-variables
     */
    provider?: 'giscus' | 'utterances' | 'disqus'
    /**
     * Visit the link below, and follow the steps in the 'configuration' section
     *
     * https://giscus.app/
     */
    giscusConfig?: {
      repo: string
      repositoryId: string
      category: string
      categoryId: string
      mapping: 'pathname' | 'url' | 'title'
      /** Emoji reactions: 1 = enable / 0 = disable */
      reactions?: 1 | 0
      /** Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable */
      metadata?: 1 | 0
      /**
       * theme example: light, dark, dark_dimmed, dark_high_contrast,
       * transparent_dark, preferred_color_scheme, custom
       */
      theme?: string
      /** theme when dark mode */
      darkTheme?: string
      /**
       * If the theme option above is set to 'custom`
       * please provide a link below to your custom theme css file.
       * example: https://giscus.app/themes/custom_example.css
       */
      themeURL?: string
      /** Place the comment box above the comments. */
      inputPosition?: 'bottom' | 'top'
      /** Choose the language giscus will be displayed in. options: en, es, zh-CN, zh-TW, ko, ja etc */
      lang?: string
    }
    /**
     * Visit the link below, and follow the steps in the 'configuration' section
     * https://utteranc.es/
     */
    utterancesConfig?: {
      repo: string
      issueTerm: 'pathname' | 'url' | 'title'
      /** label (optional): Comment 💬 */
      label?: string
      /**
       * theme example: github-light, github-dark, preferred-color-scheme,
       * github-dark-orange, icy-dark, dark-blue, photon-dark, boxy-light
       */
      theme?: string
      /** theme when dark mode */
      darkTheme?: string
    }
    disqusConfig?: {
      /** https://help.disqus.com/en/articles/1717111-what-s-a-shortname */
      shortname: string
    }
  }
}

export function defineMetadata(metadata: Metadata) {
  return metadata
}
