import util from 'util';

export const format = util.formatWithOptions;

export function shouldLog(config) {
	return function (scope) {
		const debug = config.debug.split(',');
		if (
			debug.some(d => minimatch(scope, d))
		) {
			if (debug.includes(stripAnsi(`-${scope}`))) {
				return false;
			}

			return true;
		}
	}
}

export const stripAnsi = str => str.replace(/[\u001B\u009B][[\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\d\/#&.:=?%@~_]+)*|[a-zA-Z\d]+(?:;[-a-zA-Z\d\/#&.:=?%@~_]*)*)?\u0007)|(?:(?:\d{1,4}(?:;\d{0,4})*)?[\dA-PR-TZcf-nq-uy=><~]))/g, '')
export const minimatch = (string, regex) => (
	regex === '' ? false : new RegExp(
		regex
			.replace(/-([^,]+)/, '^((?!$1).)*$')
			.replace(/\*/g, '[a-z:]+?')
	)
	.test(string)
);

export function validateScope(scope) {
	if (typeof scope !== 'string') {
		throw new Error('Scope must be a string');
	}

	if (scope.length === 0) {
		throw new Error('Scope must not be empty');
	}

	if (!/[a-z-_]+/gi.test(scope)) {
		throw new Error('Scope must contain only the alphabet, dashes and underscores');
	}
}

export function getColor(options) {
	return function*() {
		while(true) {
			yield* options.colors;
		}
	}
}

export const formatString = (string, data) => {
	const map = {
		s: data.scope,
		c: data.color,
		r: '\u001b[0m',
		m: data.message
	};

	return string.replace(/%([scrm])/gi, (_, key) => map[key]);
}
