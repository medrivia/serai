import { expect, test } from 'bun:test'
import { Serai } from './index.ts'

test('One note/ID', () => {
	const S = new Serai('# Hello\n<!-- id=hello -->')
	expect(S.x.hello[0]).toBe('# Hello')
})

test('Two notes/IDs', () => {
	const S = new Serai(
		'# Hello\n<!-- id=hello -->\n\n# World\n<!-- id=world -->',
	)
	expect(S.x.hello[0]).toBe('# Hello')
	expect(S.x.world[0]).toBe('# World')
})
