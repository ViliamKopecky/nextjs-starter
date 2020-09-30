import { Utils, Parser, TreeToTS } from 'graphql-zeus'
import fs from 'fs/promises'
import { join } from 'path'

export async function generateGraphQLSchema(
	url: string,
	headers: string | string[],
	name: string,
	targetDir: string
) {
	const schema = await Utils.getFromUrl(url, headers)

	const ts = TreeToTS.resolveTree(Parser.parse(schema))

	await fs.mkdir(targetDir, { recursive: true })
	await fs.writeFile(join(targetDir, `${name}.graphql`), schema)
	await fs.writeFile(join(targetDir, `${name}.ts`), ts)
}
