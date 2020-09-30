// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next'
import { sentryApiRouteHandler } from 'src/utils/sentry/sentryApiRouteHandler'

export default sentryApiRouteHandler((req: NextApiRequest, res: NextApiResponse) => {
	res.statusCode = 200
	res.json({ name: 'John Doe' })
})
