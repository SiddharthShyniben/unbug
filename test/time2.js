import unbug from '../index.js';

const time = unbug('time');

time.time('starting loop');
for (let i = 0; i < 1e9; i++) {}
time.markTime('loop one finished')
for (let i = 0; i < 1e9; i++) {}
time.endTime('finished loop');
