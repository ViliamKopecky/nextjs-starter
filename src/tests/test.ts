import { test } from 'uvu'
import * as assert from 'uvu/assert'

test('test should always pass', () => {
	assert.is(true, true)
})

test.run()
