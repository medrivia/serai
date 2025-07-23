import { parseArgs } from 'util'
import { join } from 'node:path'
import { watch } from 'fs'

const { values, positionals } = parseArgs({
	args: Bun.argv,
	options: {
		port: {
			short: 'p',
			type: 'string',
		},
		watch: {
			short: 'w',
			default: true,
			type: 'boolean',
		},
	},
	strict: true,
	allowPositionals: true,
})

if (positionals.length < 3) throw new Error('Need a file!')
const path = positionals[2]
const port = Number(values.port ?? 4000)
console.log(await Bun.file(path).exists())
if (!(await Bun.file(path).exists())) throw new Error('File does not exist!')

console.log(`Running on port ${port} with file ${Bun.file(path).name}`)
const server = Bun.serve({
	port,
	development: true,
	fetch: async (req) => {
		// let text = values.watch
		// 	? (await import(`${join(import.meta.dir, path)}?raw`, { with: { type: 'text' } })).default
		// 	: await Bun.file(path).text()
		let text = await Bun.file(path).text()
		return new Response(text)
	},
})

// watch(path, (event, filename) => {
// 	console.log(`Detected ${event} in ${filename}`)
// 	server.reload({
// 		fetch: async () => {
// 			// let text = values.watch
// 			// 	? (await import(`${join(import.meta.dir, path)}?raw`, { with: { type: 'text' } })).default
// 			// 	: await Bun.file(path).text()
// 			let text = await Bun.file(path).text()
// 			console.log(text)
// 			return new Response(text)
// 		},
// 	})
// })
