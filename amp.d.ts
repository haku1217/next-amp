declare namespace JSX {
  interface AmpImg {
    children?: Element
    alt?: string
    src?: string
    width?: string
    height?: string
    layout?: string
  }
  interface IntrinsicElements {
    'amp-img': AmpImg
    'amp-analytics': any
    'amp-social-share': any
    'amp-install-serviceworker': any
  }
}
