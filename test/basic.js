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
