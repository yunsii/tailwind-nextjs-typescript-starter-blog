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

declare module '*.svg' {
  const SvgComponent: (
    props: React.SVGProps<SVGSVGElement>,
  ) => React.ReactElement
  export default SvgComponent
}

declare module '@analytics/google-tag-manager' {
  const gtm: (options: { containerId?: string }) => Record<string, unknown>
  export default gtm
}

declare module 'flubber' {
  /** ref: https://github.com/veltman/flubber#flubberinterpolatefromshape-toshape--options */
  const interpolate: (
    fromShape: string | [number, number][],
    toShape: string | [number, number][],
    options?: {
      /** whether to output results as an SVG path string or an array of points. (default: true) */
      string?: boolean
      /** the lower this number is, the smoother the resulting animation will be, at the expense of performance. Represents a number in pixels (if no transforms are involved). Set it to false or Infinity for no smoothing. (default: 10) */
      maxSegmentLength?: number
    },
  ) => (v: number) => any
}

declare interface EnhancedStyle extends React.CSSProperties {
  viewTransitionName?: string
}
