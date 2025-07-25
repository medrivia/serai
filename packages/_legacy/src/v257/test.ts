import { expect, test } from 'bun:test'
import { Serai } from './index.ts'
import { literal as markdown } from '@mdrv/m/v257'

test('One note/ID', () => {
	const S = new Serai('# Hello\n<!-- id=hello -->')
	expect(S.x.hello?.[0]).toBe('# Hello')
})

test('Two notes/IDs', () => {
	const S = new Serai(
		'# Hello\n<!-- id=hello -->\n\n# World\n<!-- id=world -->',
	)
	expect(S.x.hello?.[0]).toBe('# Hello')
	expect(S.x.world?.[0]).toBe('# World')
})

const example01 = markdown`
# Get Started
<!-- id=get-started -->

This is how you do it. Let’s go to [the advanced section](advanced).

# Advanced
<!-- id=advanced -->

Before reading this, you should finish [_Get Started_](get-started).
`.trim()

test('Example file', async () => {
	const S = new Serai(example01)
	console.log(S.x)
	expect(Object.keys(S.x)).toEqual(['get-started', 'advanced'])
})
