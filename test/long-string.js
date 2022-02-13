import debug from '../index.js';

const longString = debug('long-string');

longString('This is a long string with new lines and some more stuff which should trigger wrapping but may not.\nThe point of this test is to make sure that new lines are split so that we get cleaner output on multiple lines.');
