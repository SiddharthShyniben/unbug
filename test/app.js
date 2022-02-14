import unbug from '../index.js';
import http from 'http';
import * as worker from './worker.js'; // fake worker of some kind

const main = unbug('http');

main('Booting up');

http.createServer((req, res) => {
  main('Request received: %s %s', req.method, req.url);
  res.end('Hello');
}).listen(3000, () => main('Server started'));

worker.workA();
worker.workB();
