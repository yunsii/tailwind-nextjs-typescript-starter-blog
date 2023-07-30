interface Window {
  disqus_config: () => void
  DISQUS: any
  analytics: import('analytics').AnalyticsInstance
}

declare module 'heti/js/heti-addon' {
  class Heti {
    constructor(rootSelector: string) {}

    autoSpacing() {}
  }

  export default Heti
}

declare module '~svg-sprite/symbol' {
  const SvgSpriteSymbol: React.FC
  export default SvgSpriteSymbol
}

declare module '*.svg' {
  const SvgSpriteSymbol: (
    props: React.SVGProps<SVGSVGElement>,
  ) => React.ReactElement
  export default SvgSpriteSymbol
}

declare module '*.svg?svgr' {
  const SvgSpriteSymbol: (
    props: React.SVGProps<SVGSVGElement>,
  ) => React.ReactElement
  export default SvgSpriteSymbol
}

declare module '@analytics/google-tag-manager' {
  const gtm: (options: { containerId?: string }) => Record<string, unknown>
  export default gtm
}
