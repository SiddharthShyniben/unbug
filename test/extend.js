import debug from '../index.js';

const worker = debug('worker');
const workerA = worker.extend('a');
const workerB = worker.extend('b');

worker('doing some work here')
workerA('doing some a work here')
workerB('doing some b work here')
