import {shouldLog as _shouldLog, validateScope, getColor, format, stripAnsi} from './src/util.js';
import {EventEmitter} from 'events';
import defaultConfig from './src/default-config.js';

const RESET_CODE = '\x1b[0m';
let config = defaultConfig;
const debugs = [];
const color = getColor(config)();
const shouldLog = _shouldLog(config);

function logHandler(scope, debugs, debugId, kolor) {
	const emit = (what, ...args) => ret.events.emit(what, ...args);

	let lastCallTime = new Date().getTime();

	function ret(...message) {
		const now = new Date().getTime();
		const msDiff = now - lastCallTime;
		const msDiffString = `${kolor}+${msDiff}ms${RESET_CODE}`;

		const text = format(config.inspectOptions, ...message);

		if (shouldLog(scope)) {
			const debugPrefix = debugs[debugId];
			text.split('\n').forEach(
				(line, index) => console.debug(
					!index ? debugPrefix : ' '.repeat(stripAnsi(debugPrefix).length),
					line,
					!index ? msDiffString : ''
				)
			);

			emit('log', scope, text);
		} else emit('logskip', scope, text);
	}

	ret.extend = nestedDebug(debugId, debugs);
	ret.events = new EventEmitter();
	ret.enabled = () => shouldLog(scope);

	/* Time handling */
	let timerCallTime = null;
	let timerMarkTime = null;

	ret.time = text => {
		if (shouldLog(scope)) {
			timerCallTime = new Date().getTime();

			text.split('\n').forEach(
				(line, index) => console.debug(
					!index ? debugs[debugId] + ' [begin time]' : ' '.repeat(stripAnsi(debugs[debugId]).length + 13),
					line
				)
			);

			emit('timestart', scope, text, timerCallTime);
		} else emit('timestartskip', scope, text);
	};

	ret.markTime = text => {
		if (timerCallTime === null) return;
		if (shouldLog(scope)) {
			const prevMarkTime = timerMarkTime;
			timerMarkTime = new Date().getTime();
			
			const previousTimeDiff = timerMarkTime - timerCallTime;
			const previousMarkDiff = prevMarkTime && (timerMarkTime - prevMarkTime);

			text.split('\n').forEach(
				(line, index) => console.debug(
					!index ? debugs[debugId] + ' [mark time]' : ' '.repeat(stripAnsi(debugs[debugId]).length + 12),
					line,
					!index ? `${kolor}+${previousTimeDiff}ms total${previousMarkDiff ? `, +${previousMarkDiff}ms since last mark` : ''}${RESET_CODE}` : ''
				)
			);

			emit('timemark', scope, text, timerMarkTime);
		} else emit('timemarkskip', scope, text);
	}

	ret.endTime = text => {
		if (timerCallTime === null) return;
		if (shouldLog(scope)) {
			const prevMarkTime = timerMarkTime;
			const firstCallTime = timerCallTime;
			const endTime = new Date().getTime();
			timerMarkTime = timerCallTime = null;
			
			const previousTimeDiff = endTime - firstCallTime;
			const previousMarkDiff = prevMarkTime && (endTime - prevMarkTime);

			text.split('\n').forEach(
				(line, index) => console.debug(
					!index ? debugs[debugId] + ' [end time]' : ' '.repeat(stripAnsi(debugs[debugId]).length + 11),
					line,
					!index ? `${kolor}+${previousTimeDiff}ms total${previousMarkDiff ? `, +${previousMarkDiff}ms since last mark` : ''}${RESET_CODE}` : ''
				)
			);

			emit('timeend', scope, text, endTime);
		} else emit('timeendskip', scope, text);
	}

	return ret;
}

function createDebug(array, prefix = '') {
	return function (scope) {
		validateScope(scope);

		const kolor = config.useColor ? color.next().value : '';
		array.push(prefix + kolor + scope + RESET_CODE);
		const debugId = array.length - 1;

		return logHandler(prefix + scope, array, debugId, kolor);
	}
}

function nestedDebug(debugId, debugs) {
	const prefix = debugs[debugId] + ':';
	const moreDebugs = [];

	return createDebug(moreDebugs, prefix);
}

export default createDebug(debugs);
export const configure = conf => config = Object.assign(config, conf);
