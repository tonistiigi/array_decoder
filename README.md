[![Build Status](https://secure.travis-ci.org/tonistiigi/array_decoder.png)](http://travis-ci.org/tonistiigi/array_decoder)

## Array Decoder

This class can be used to stream arrays of data when chunks may end with partial elements. Similar to string decoder but for arrays.

### Installation

```
npm install array_decoder
```

### Usage

```
var ArrayDecoder = require('array_decoder').ArrayDecoder

var decoder = new ArrayDecoder

// Outputs: ['abc', 'def']
console.log(decoder.write(['abc', 'def', 'gh']))

// Outputs: ['ghi', 'jkl']
console.log(decoder.write(['i', 'jkl', 'mn']))

// Outputs: ['mnl']
console.log(decoder.write(['l'], true))
```

### new ArrayDecoder([format])

Output can be `string` or `buffer`. If not specified it will be same as input.

### write(array, complete)

`array` - Array of strings, buffers or array of arrays of string or buffers.

`complete` - Set to true for last chunk.
