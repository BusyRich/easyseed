var Emitter = require("events").EventEmitter;
var request = require('request');
var fs = require('fs');
var random = require('./random/random');

var es = {};
es._ready = false;
es._queue = [];
es._events = new Emitter();

es.on = function(type, callback) {
  es._events.on(type, callback);
};

es._runQueue = function() {
  for(var g = 0; g < es._queue.length; g++) {
    es._get.apply(es, es._queue[g]);
  }

  es._queue = [];
};

es._seed = function(str) {
  random.seed(str);
  es._ready = true;
  es._events.emit('seeded', str);
  es._runQueue();
};

es.seed = {
  auto : function() {
    es._seed(new Date().toString());
  },
  string: function(str) {
    if(typeof str !== 'string') {
      return es._events.emit('error', new Error('Seed must be a string.'));
    }

    es._seed(str);
  },
  web: function(uri) {
    es._ready = false;
    request(uri, function(err, res, body) {
      if(err) {
        return es._events.emit('error', err);
      }

      es.seed.string(body);
    });
  },
  file: function(path) {
    es._ready = false;
    fs.readFile(path, function(err, contents) {
      if(err) {
        return es._events.emit('error', err);
      }

      es.seed.buffer(contents);
    });
  },
  buffer: function(buffer) {
    es.seed.string(buffer.toString());
  }
};

es._get = function(type, min, max, callback) {
  if(!es._ready) {
    return es._queue.push([].slice.call(arguments));
  }

  if(typeof min === 'function') {
    callback = min;
  }

  if(typeof max === 'function') {
    callback = max;
  }

  callback(random[type](min, max));
};

es.int = function(min, max, callback) {
  es._get('int', min, max, callback);
};

es.float = function(min, max, callback) {
  es._get('float', min, max, callback);
};

module.exports = es;