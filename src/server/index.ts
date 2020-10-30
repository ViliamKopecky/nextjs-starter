import express, { Request, Response } from 'express'
import next from 'next'
import fs from 'fs'
import path from 'path'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000

;(async () => {
	try {
		await app.prepare()
		const server = express()
		server.set('trust proxy', true)

		const storybookPath = fs.realpathSync(path.join(__dirname, '../../public/storybook'))
		server.use('/storybook', express.static(storybookPath))

		const wellKnownPath = fs.realpathSync(path.join(__dirname, '../../public/.well-known'))
		server.use('/.well-known', express.static(wellKnownPath))

		server.all('*', (req: Request, res: Response) => {
			return handle(req, res)
		})

		server.listen(port, (err?: unknown) => {
			if (err) throw err
			console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`)
		})
	} catch (e) {
		console.error(e)
		process.exit(1)
	}
})()
