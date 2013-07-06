/* A few simple tests */
var random = require('./easyseed');
var assert = require('assert');

var iterations = 2000, min = 10, max = 100;

random.on('error', function(error) {
  throw error;
});

//Test the different seed functions for errors
random.seed.auto();
random.seed.string('abcdefg');
random.seed.buffer(new Buffer('abcdefg'));
random.seed.web('http://google.com/doodle.png');
random.seed.file('./easyseed.js');

//Asset helper
var check = function(n) {
  assert.ok(n >= min && n <= max);
};

//Plain Jane 0-1 number
for(var i = 0; i < iterations; i++) {
  random.float(function(n) {
    assert.ok(n >= 0 && n <= 1);
  });
}

//Intergers
for(var i = 0; i < iterations; i++) {
  random.int(min, max, check);
}

//Floats
for(var i = 0; i < iterations; i++) {
  random.float(min, max, check);
}