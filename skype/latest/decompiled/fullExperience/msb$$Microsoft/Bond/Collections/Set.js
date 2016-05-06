module.exports = function () {
  function e() {
    this._buffer = [];
  }
  return e.prototype.Add = function (e) {
    var t = 0;
    for (; t < this._buffer.length; ++t)
      if (this._buffer[t] == e)
        break;
    t == this._buffer.length && this._buffer.push(e);
  }, e.prototype.Count = function () {
    return this._buffer.length;
  }, e.prototype.GetBuffer = function () {
    return this._buffer;
  }, e;
}()
