var assert = require('assert')
var ArrayDecoder = require('../array_decoder').ArrayDecoder

var tests = {}

tests.write_complete = function () {
  var decoder = new ArrayDecoder
  var result = decoder.write(['foo', 'bar'], true)
  assert.deepEqual(result, ['foo', 'bar'])
}

tests.simple_strings = function() {
  var decoder = new ArrayDecoder
  var result = decoder.write(['foo', 'bar', 'baz'])
  assert.deepEqual(result, ['foo', 'bar'])
  result = decoder.write(['foo', 'bar', 'baz'])
  assert.deepEqual(result, ['bazfoo', 'bar'])
  result = decoder.write(['abc', '123'], true)
  assert.deepEqual(result, ['bazabc', '123'])
}

tests.empty_runs = function() {
  var decoder = new ArrayDecoder
  var result = decoder.write(['foo'])
  assert.strictEqual(result, null)
  result = decoder.write([])
  assert.strictEqual(result, null)
  result = decoder.write(['bar'])
  assert.strictEqual(result, null)
  result = decoder.write(['', 'baz'])
  assert.deepEqual(result, ['foobar'])
}

tests.utf8_split = function() {
  var decoder = new ArrayDecoder
  var buffer = new Buffer('tõnis')
  var b1 = buffer.slice(0, 2).toString()
  var b2 = buffer.slice(2, 6).toString()
  var result = decoder.write(['foo', b1])
  assert.deepEqual(result, ['foo'])
  result = decoder.write([b2, 'bar'])
  assert.deepEqual(result, ['tõnis'])
}

tests.buffers = function() {
  var decoder = new ArrayDecoder()
  var result = decoder.write([new Buffer('abc'), new Buffer('foo')])
  assert.deepEqual(result, [new Buffer('abc')])
  result = decoder.write([new Buffer('boo')])
  assert.strictEqual(result, null)
  result = decoder.write([new Buffer('bar'), new Buffer('baz')], true)
  assert.deepEqual(result, [new Buffer('fooboobar'), new Buffer('baz')])
}

Object.keys(tests).forEach(function(id) {
  console.log(id)
  tests[id]()
})
