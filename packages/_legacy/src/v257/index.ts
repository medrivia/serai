/**
 * @summary A class that stores your Markdown string/notes.
 *
 * @param md - Markdown text (a string or array)
 * @param opts - Options
 */
export class Serai {
	/**
	 * @summary Digestible notes with specified IDs as keys
	 */
	x: Record<string, string[]> = {}
	constructor(md: Array<string> | string, opts = {}) {
		const mdArray = Array.isArray(md) ? md : [md]
		for (const lines of mdArray) {
			let prev: string | undefined
			let currentId: string | undefined
			for (const line of lines.split(/\r?\n/)) {
				const id = line.match(/^\s*<!--\s+id=(?<id>\S+)\s+-->$/)
				if (id?.groups?.id) {
					currentId = id.groups.id
					this.x[currentId] = prev ? [prev] : []
				}
				const cur = currentId // i: TS requires const
				if (cur && Array.isArray(this.x[cur])) {
					this.x[cur].push(line)
				}
				prev = line
			}
		}
	}
}
