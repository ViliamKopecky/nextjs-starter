import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
	createServer((req, res) => {
		if (typeof req.url === 'string') {
			const parsedUrl = parse(req.url, true)
			handle(req, res, parsedUrl)
		} else {
			throw new Error('req.url is not a string')
		}
	}).listen(port)

	// tslint:disable-next-line:no-console
	console.log(
		`> Server listening at http://localhost:${port} as ${
			dev ? 'development' : process.env.NODE_ENV
		}`
	)
})
