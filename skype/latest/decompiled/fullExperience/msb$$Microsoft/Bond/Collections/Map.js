module.exports = function () {
  function e() {
    this._buffer = [];
  }
  return e.prototype.Add = function (e, t) {
    this._getIndex(e) == -1 && this._buffer.push({
      Key: e,
      Value: t
    });
  }, e.prototype.AddOrReplace = function (e, t) {
    var n = this._getIndex(e);
    n >= 0 ? this._buffer[n] = {
      Key: e,
      Value: t
    } : this._buffer.push({
      Key: e,
      Value: t
    });
  }, e.prototype.Remove = function (e) {
    var t = this._getIndex(e);
    t >= 0 && this._buffer.splice(t, 1);
  }, e.prototype.Count = function () {
    return this._buffer.length;
  }, e.prototype.GetBuffer = function () {
    return this._buffer;
  }, e.prototype.ContainsKey = function (e) {
    return this._getIndex(e) >= 0 ? !0 : !1;
  }, e.prototype.Get = function (e) {
    var t = this._getIndex(e);
    return t >= 0 ? this._buffer[t].Value : null;
  }, e.prototype._getIndex = function (e) {
    var t = 0, n = -1;
    for (; t < this._buffer.length; ++t)
      if (this._buffer[t].Key == e) {
        n = t;
        break;
      }
    return n;
  }, e;
}()
