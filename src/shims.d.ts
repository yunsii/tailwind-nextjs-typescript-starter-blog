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
