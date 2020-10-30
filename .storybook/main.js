/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
	stories: [path.resolve(__dirname, '../src/components/**/*.stories.tsx')],
	presets: [path.resolve(__dirname, './next-preset.js')],
	addons: ['@storybook/addon-docs', '@storybook/addon-controls', '@storybook/preset-typescript'],
}
