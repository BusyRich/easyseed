<pre>
___________                      _________                 .___
\_   _____/____    _________.__./   _____/ ____   ____   __| _/
 |    __)_\__  \  /  ___|   |  |\_____  \_/ __ \_/ __ \ / __ | 
 |        \/ __ \_\___ \ \___  |/        \  ___/\  ___// /_/ | 
/_______  (____  /____  >/ ____/_______  /\___  >\___  >____ | 
EasySeed\/     \/     \/ \/            \/     \/     \/     \/
</pre>

EasySeed is seedable random number generator that utilizes David Bau's [seedable random number generator](http://davidbau.com/archives/2010/01/30/random_seeds_coded_hints_and_quintillions.html) internally(with a few minor changes for Node.js support), and provides an easy interface for seeding  and using the generator.

*Note: A generator of this nature is only as random as the seed provided.*

## Usage
Simply require, seed, and use.

```javascript
var easyseed = require('easyseed');
easyseed.seed.auto();
easyseed.float(function(n) {
    console.log(n); //0.3234234223442
});
```
### Seeding
Before any values can be generated, the generator must be seeded. All seed types are part of the `easyseed.seed` namespace.

#### \#seed.auto()
Seeds the generator with the current data/time. Useful for general purpose pseudo-random numbers.

#### \#seed.string(str)
Seeds the generator with the specified string.

#### \#seed.buffer(buffer)
Seeds the generator is the data within the provided buffer.

#### \#seed.web(uri)
Makes a request for the specificed web resource and uses the response body as the seed for the generator.

#### \#seed.file(path)
Loads a file, then uses the contents as the seed for the generator.

### Getting Values
EasySeed gives you the option to get random integers or floats.

*Note: Internally a queue is used to hold generation while seeding is done. This is required since some seeding options require asynchronous operations, such as making HTTP requests or reading files. This means callbacks are required for all generators.*

#### \#int([min], [mix], callback)
Generates an integer between min and max, 0 and max, or 0-1. The callback is called with the number generated.

```javascript
//require and seed it...

var print = function(n) {
    console.log(n);
};

easyseed.int(print); //0 or 1
easyseed.int(10, print); //between 0 and 10
easyseed.int(50, 100, print); //between 50 and 100
```

#### \#float([min], [max], callback)
Same as `easyseed.int`, expect a floating point number is returned. `easyseed.float(callback)` (no min/max) generates exactly what `Math.random` does.

### Events
There are a couple events you can subscribe to if needed.

#### on('error', function(error) {})
Fires when a request of filesystem error occurs for the corresponding seed functions.

#### on('seeded', function(seed) {})
Fires when seeding is complete, and provides the seed string used.

## Running Tests
The tests provided simply seed using all the seed functions, then generate 2000 0-1 floats (`Math.random`), 2000 floats between 10 and 100, and 2000 integers between 10 and 100. Node.js' Assert is used for validation. Errors are thrown if a request or filesystem error occurs.

    node test.js
