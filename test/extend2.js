import debug from './index.js';

const foo = debug('foo');
const bar = foo.extend('bar');
const baz = bar.extend('baz');

function workFoo() {
	foo('working foo');

	if (Math.random() > 0.5) {
		bar('working bar');
		if (Math.random() > 0.5) {
			baz('working baz');
		}
	}

	setTimeout(workFoo, Math.random() * 1000);
}

workFoo();
