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

ArrayDecoder.prototype.mergeArray = function(parts) {
  var out = parts[0]
  var merge = [out.pop()]
  for (var i = 1; i < parts.length; i++) {
    var part = parts[i]
    if (part.length) {
      merge.push(part.shift())
    }
    if (part.length) {
      out.push(this.merge(merge))
      merge = [part.pop()]
      if (part.length) {
        out = out.concat(part) // todo: optimize(concat later)
      }
    }
  }
  if (merge.length) {
    out.push(this.merge(merge))
  }
  return out
}

ArrayDecoder.prototype.write = function(array, complete) { // complete:bool
  if (this._current.length && array.length) {
    this._current.push(array[0])
    if (array.length > 1 || complete) {
      if (this._current[0] instanceof Array) {
        array[0] = this.mergeArray(this._current)
      }
      else {
        array[0] = this.merge(this._current)
      }
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