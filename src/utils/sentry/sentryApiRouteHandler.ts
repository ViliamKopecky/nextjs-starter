import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { initSentry } from './initSentry'

export function sentryApiRouteHandler(apiHandler: NextApiHandler) {
	const sentry = initSentry()
	return async (req: NextApiRequest, res: NextApiResponse) => {
		try {
			return await apiHandler(req, res)
		} catch (error) {
			console.error(error)
			if (sentry) {
				sentry.configureReq(req)
				sentry.Sentry.captureException(error)
				await sentry.Sentry.flush(2000)
			}
			throw error
		}
	}
}
