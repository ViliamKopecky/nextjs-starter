import { Story } from '@storybook/react/types-6-0'
import React from 'react'

export function createStory<P extends Record<string, unknown>>(
	Component: React.ComponentType<P>,
	args?: Partial<P>,
	name?: string
): Story<P> {
	function StoryComponent(args: P) {
		return <Component {...args} />
	}

	StoryComponent.args = args

	if (name) {
		StoryComponent.storyName = name
	}

	return StoryComponent
}
