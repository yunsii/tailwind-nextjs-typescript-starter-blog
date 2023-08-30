const bundleAnalyzer = require('@next/bundle-analyzer')
const { withContentlayer } = require('next-contentlayer')

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

// You might need to insert additional domains in script-src if you are using external services
const ContentSecurityPolicy = ``

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  rewrites: async () => {
    return {
      beforeFiles:
        process.env.NODE_ENV === 'production'
          ? [
              {
                source: '/500',
                destination: '/400',
              },
            ]
          : [],
    }
  },
  modularizeImports: {
    'lodash-es': {
      transform: 'lodash-es/{{member}}',
    },
  },
  webpack: (config, { dev, isServer }) => {
    config.plugins.push(
      require('unplugin-auto-import/webpack')({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        ],
        injectAtEnd: false,
        imports: [
          'react',
          {
            'react': ['Fragment', 'createElement'],
            'tagged-classnames-free': ['cls', 'tw'],
          },
        ],
      }),
    )

    config.plugins.push(
      require('unplugin-polish-tagged-templates/webpack').default({
        cssTags: ['cls', 'tw'],
      }),
    )

    config.module.rules.push({
      test: /\.svg$/,
      use: {
        loader: '@svgr/webpack',
        options: {
          ref: true,
          svgoConfig: {
            plugins: [
              'preset-default',
              {
                name: 'removeDimensions',
                active: true,
              },
              {
                name: 'removeViewBox',
                active: false,
              },
              {
                name: 'prefixIds',
                active: true,
              },
            ],
          },
        },
      },
    })

    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
        'react': 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }

    return config
  },
}

const result = withBundleAnalyzer(withContentlayer(nextConfig))

module.exports = result
