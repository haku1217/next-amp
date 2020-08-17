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
    }
}