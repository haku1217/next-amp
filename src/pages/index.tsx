import { useAmp } from 'next/amp'

export const config = { amp: 'hybrid' }

const imgSrc = 'https://placekitten.com/1000/1000'
const Index = () => {
  const isAmp = useAmp()
  return (
    <p>
      Welcome to the{' '}
      {isAmp ? (
        <amp-img alt="ニャンコ" src={imgSrc} width="1000" height="1000" layout="responsive"></amp-img>
      ) : (
        'AMPページではない！'
      )}
    </p>
  )
}

export default Index
