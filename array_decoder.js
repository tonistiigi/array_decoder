var ArrayDecoder = exports.ArrayDecoder = function (format) {
  this.format = format || 'auto'
  switch (this.format) {
    case 'buffer':
      this.merge = this.mergeBuffer
    break
    case 'string':
      this.merge = this.mergeString
    break
    default:
      this.merge = this.mergeAuto
  }
  this._current = []
}

ArrayDecoder.prototype.mergeBuffer = function(parts) {
  return Buffer.concat(parts)
}

ArrayDecoder.prototype.mergeString = function(parts) {
  if (typeof parts[0] === 'string') {
    return parts.join('') // todo: for loop is probably faster
  }
  return Buffer.concat(parts).toString()
}

ArrayDecoder.prototype.mergeAuto = function(parts) {
  return parts[0] instanceof Buffer ?
    this.mergeBuffer(parts) : this.mergeString(parts)
}

ArrayDecoder.prototype.write = function(array, complete) { // complete:bool
  if (this._current.length && array.length) {
    this._current.push(array[0])
    if (array.length > 1 || complete) {
      array[0] = this.merge(this._current)
      this._current = []
    }
    else return null
  }
  if (complete) {
    return array
  }
  if (array.length) {
    this._current.push(array.pop())
    if (array.length) return array
  }
  return null
}