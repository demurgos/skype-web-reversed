module.exports = function () {
  function t() {
    this._buffer = [];
  }
  return t.prototype.WriteByte = function (t) {
    this._buffer.push(e.Number.ToByte(t));
  }, t.prototype.Write = function (e, t, n) {
    while (n--)
      this.WriteByte(e[t++]);
  }, t.prototype.GetBuffer = function () {
    return this._buffer;
  }, t;
}()
