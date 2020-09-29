/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
	stories: ['../src/components/**/*.stories.tsx'],
	presets: [path.resolve(__dirname, './next-preset.js')],
}
