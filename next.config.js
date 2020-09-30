/* eslint-disable @typescript-eslint/no-var-requires */
const withSourceMaps = require('@zeit/next-source-maps')
const packageJson = require('./package')
const date = new Date()

module.exports = withSourceMaps()({
	env: {
		SENTRY_DSN: process.env.SENTRY_DSN,
		BUILD_TIME: date.toString(),
		BUILD_TIMESTAMP: +date,
		APP_NAME: packageJson.name,
		APP_VERSION: packageJson.version,
	},
	webpack: (config, { isServer, buildId }) => {
		const APP_VERSION_RELEASE = `${packageJson.version}_${buildId}`

		if (isServer) {
			// Trick to only log once
			console.debug(`[webpack] Building release "${APP_VERSION_RELEASE}"`)
		}

		if (!isServer) {
			config.resolve.alias['@sentry/node'] = '@sentry/browser'
		}

		// TODO: sourcemaps

		return config
	},
	poweredByHeader: 'Next.js',
})
