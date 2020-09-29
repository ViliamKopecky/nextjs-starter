import { Meta } from '@storybook/react/types-6-0'
import { createStory } from '../utils/storybook/createStory'
import { Dump } from './Dump'

export default {
	title: 'Dump',
	component: Dump,
	argTypes: {
		data: {
			control: 'object',
		},
	},
} as Meta

export const Numeric = createStory(Dump, { data: 42 })
export const String = createStory(Dump, { data: 'Hello world' })
export const Object = createStory(Dump, {
	data: {
		foo: { bar: [1, 2, 3] },
	},
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cyclicObject: any = {
	foo: {
		bar: {
			cyclic: {},
		},
	},
}
cyclicObject.foo.bar.cyclic = cyclicObject

export const Cyclic = createStory(() => <Dump data={cyclicObject} />)
