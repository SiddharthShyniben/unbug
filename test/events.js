import debug from '../index.js';

const events = debug('events');

events.events.on('log', (scope, message) => {
	console.log('log in', scope, 'message is', message);
});

events('Log a')
events('Log b')
events('Log c')
