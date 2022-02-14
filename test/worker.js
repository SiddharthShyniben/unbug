import unbug from '../index.js'

const worker = unbug('worker');
const a = worker.extend('a');
const b = worker.extend('b');

export function workA() {
  a('Doing some stuff');
  setTimeout(workA, Math.random() * 1000);
}

export function workB() {
  b('Doing some other stuff');
  setTimeout(workB, Math.random() * 1000);
}

