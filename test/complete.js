
import debug from '../index.js';

const a = debug('name-one');
const b = debug('longer-name');
const c = debug('sth');

function workA() {
	a('doing some work here');
	setTimeout(workA, Math.random() * 1000);
}

function workB() {
	b('doing some more work here');
	setTimeout(workB, Math.random() * 1000);
}

function workC() {
	c('lots of uninteresting work here');
	setTimeout(workC, Math.random() * 1000);
}

workA()
workB()
workC()


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

const longString = debug('long-string');

longString('This is a long string with new lines and some more stuff which should trigger wrapping but may not.\nThe point of this test is to make sure that new lines are split so that we get cleaner output on multiple lines.');

const code = debug('code');

code('hello heres some code: %o', {
	foo: 'bar',
	baz: 'qux',
	number: 1,
});

const time = debug('time');

time.time('Starting');
setTimeout(() => {
	time.markTime('Interval');
	setTimeout(() => {
		time.markTime('Interval and some\nnewlines\nhere\nlol');
			setTimeout(() => {
				time.markTime('Interval');
				time.endTime('Ending');
			}, 1000);
	}, 1000);
}, 1000);
