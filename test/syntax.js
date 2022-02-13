import debug from '../index.js';

const a = debug('a');

a('hello heres some code: %o', {
	foo: 'bar',
	baz: 'qux',
	number: 1,
});
