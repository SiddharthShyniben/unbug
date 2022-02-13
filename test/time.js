import debug from '../index.js';

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
