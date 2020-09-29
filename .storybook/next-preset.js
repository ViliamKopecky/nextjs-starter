/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
	webpackFinal: async (baseConfig) => {
		const { module = {} } = baseConfig

		const newConfig = {
			...baseConfig,
			module: {
				...module,
				rules: [...(module.rules || [])],
			},
		}

		// TypeScript
		newConfig.module.rules.push({
			test: /\.(ts|tsx)$/,
			include: [path.resolve(__dirname, '../src/components')],
			use: [
				{
					loader: 'babel-loader',
					options: {
						presets: ['next/babel', require.resolve('babel-preset-react-app')],
						plugins: ['react-docgen'],
					},
				},
			],
		})
		newConfig.resolve.extensions.push('.ts', '.tsx')

		// SCSS
		newConfig.module.rules.push({
			test: /\.(s*)(c|a)ss$/,
			loaders: ['style-loader', 'css-loader', 'sass-loader'],
		})

		// If you are using CSS Modules, check out the setup from Justin (justincy)
		// Many thanks to Justin for the inspiration
		// https://gist.github.com/justincy/b8805ae2b333ac98d5a3bd9f431e8f70#file-next-preset-js

		return newConfig
	},
}
