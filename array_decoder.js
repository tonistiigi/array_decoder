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
}

ArrayDecoder.prototype.mergeBuffer = function() {

}

ArrayDecoder.prototype.mergeString = function() {

}

ArrayDecoder.prototype.mergeAuto = function() {

}

ArrayDecoder.prototype.write = function(array, complete) { // complete:bool

}