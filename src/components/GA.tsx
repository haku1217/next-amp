const Analytics = () => {
  const json = JSON.stringify({
    vars: {
      gtag_id: 'UA-150540449-1',
      config: {
        'UA-150540449-1': { groups: 'default' }
      }
    }
  })
  return (
    <amp-analytics type="gtag" data-credentials="include">
      <script type="application/json" dangerouslySetInnerHTML={{ __html: json }} />
    </amp-analytics>
  )
}
export default Analytics
