const falsyStrings = ['0', 'false', 'no', '0', 'nah', 'nope', 'n', 'noway', 'never', 'naw', 'nay'];

export default {
	colors: [
		'\x1b[38;5;2m',
		'\x1b[38;5;3m',
		'\x1b[38;5;4m',
		'\x1b[38;5;5m',
		'\x1b[38;5;6m',
		'\x1b[38;5;7m',
		'\x1b[38;5;9m',
		'\x1b[38;5;10m',
		'\x1b[38;5;11m',
		'\x1b[38;5;12m',
		'\x1b[38;5;13m',
		'\x1b[38;5;14m',
	],

	debug: process.env.DEBUG || '',
	useColor: falsyStrings.includes(process.env.DEBUG_COLOR) ? false : true,

	inspectOptions: {
		colors: true, // Colors!
		maxArrayLength: 5, // Probably dont want 100 elements in a debug log
		maxStringLength: 20, // See above
		breakLength: process.stdout.columns || 80, // Break long lines
		compact: true, // See above
	}
}
