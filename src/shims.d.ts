interface Window {
  disqus_config: () => void
  DISQUS: any
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
