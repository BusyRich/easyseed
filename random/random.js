var core = require('./seedrandom.js');

var random = {};
random.seed = core.seed;

random._between = function(min, max) {
  //Between 0 and 1
  if(typeof min !== 'number') {
    return core.get();
  }

  //Between 0 and max
  if(typeof max !== 'number') {
    return core.get() * (min);
  }

  //Between min and max
  return (core.get() * (max - min)) + min;
};

random.int = function(min, max) {
  if(typeof min !== 'number') {
    return Math.round(this._between());
  }

  //Little bit of tweaking for ranges
  if(typeof max !== 'number') {
    min += 1;
  } else {
    max += 1;
  }

  return Math.floor(this._between(min, max));
};

random.float = function(min, max) {
  return this._between(min, max);
};

module.exports = random;