import { RewriteFrames } from '@sentry/integrations'
import * as Sentry from '@sentry/node'
import { NowRequest } from '@vercel/node'
import getConfig from 'next/config'

let memo: { Sentry: typeof Sentry; configureReq: (req: NowRequest) => void } | null = null

export function initSentry() {
	if (memo) {
		return memo
	}

	if (process.env.SENTRY_DSN) {
		const config = getConfig()
		const distDir = `${config.serverRuntimeConfig.rootDir}/.next`
		Sentry.init({
			dsn: process.env.SENTRY_DSN,
			enabled: process.env.NODE_ENV === 'production',
			environment: process.env.APP_STAGE,
			release: process.env.APP_VERSION_RELEASE,
			integrations: [
				new RewriteFrames({
					iteratee: (frame) => {
						frame.filename = (frame.filename ?? '').replace(distDir, 'app:///_next')
						return frame
					},
				}),
			],
		})
	}

	Sentry.configureScope((scope) => {
		scope.setTag('nodejs', process.version)
		scope.setTag('buildTime', process.env.BUILD_TIME ?? '?')
	})

	const configureReq = (req: NowRequest) => {
		Sentry.configureScope((scope) => {
			scope.setTag('host', req.headers?.host ?? 'unknown')
			scope.setTag('url', req.url ?? 'unknown')
			scope.setTag('method', req.method ?? 'unknown')
			scope.setContext('query', req.query)
			scope.setContext('cookies', req.cookies)
			scope.setContext('body', req.body)
			scope.setContext('headers', req.headers)
		})
	}

	memo = { Sentry, configureReq }

	return memo
}
