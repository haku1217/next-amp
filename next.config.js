const withPlugins = require('next-compose-plugins')
const withOffline = require('next-offline')

const plugins = [
  {
    webpack: function (config) {
      config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader'
      })
      return config
    }
  }
]
if (process.env.NODE_ENV === 'production') {
  plugins.push([
    withOffline,
    {
      workboxOpts: {
        swDest: path.join(__dirname, 'public/service-worker.js'),
        runtimeCaching: [
          {
            urlPattern: /^https?.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'https-calls',
              networkTimeoutSeconds: 15,
              expiration: {
                maxEntries: 150,
                // maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
                maxAgeSeconds: 1 * 24 * 60 * 60 // 1 day
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    }
  ])
}

module.exports = withPlugins(plugins, {})
