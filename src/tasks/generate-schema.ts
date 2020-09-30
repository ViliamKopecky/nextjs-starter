import next from 'next'
import { generateGraphQLSchema } from './utils/generateGraphQLSchema'

next({ dev: true }) // to load env variables

const tasks = []
if (process.env.CONTEMBER_CONTENT_API_URL) {
	tasks.push(
		generateGraphQLSchema(
			process.env.CONTEMBER_CONTENT_API_URL,
			`Authorization: Bearer ${process.env.CONTEMBER_CONTENT_API_TOKEN}`,
			'content',
			`${__dirname}/../../generated`
		).catch(console.error)
	)
}

if (process.env.CONTEMBER_TENANT_API_URL) {
	tasks.push(
		generateGraphQLSchema(
			process.env.CONTEMBER_TENANT_API_URL,
			`Authorization: Bearer ${process.env.CONTEMBER_TENANT_API_TOKEN}`,
			'tenant',
			`${__dirname}/../../generated`
		).catch(console.error)
	)
}

if (process.env.CONTEMBER_SYSTEM_API_URL) {
	tasks.push(
		generateGraphQLSchema(
			process.env.CONTEMBER_SYSTEM_API_URL,
			`Authorization: Bearer ${process.env.CONTEMBER_SYSTEM_API_TOKEN}`,
			'system',
			`${__dirname}/../../generated`
		).catch(console.error)
	)
}

Promise.all(tasks).then(() => process.exit(0))
