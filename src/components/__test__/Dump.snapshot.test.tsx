import React from 'react'
import renderer from 'react-test-renderer'
import { Dump } from '../Dump'

it('renders correctly', () => {
	const tree = renderer.create(<Dump data="data" />).toJSON()
	expect(tree).toMatchSnapshot()
})
