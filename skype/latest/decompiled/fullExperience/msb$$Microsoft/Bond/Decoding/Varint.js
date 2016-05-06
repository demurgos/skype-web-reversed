module.exports = function () {
  function t() {
  }
  return t.GetInt64 = function (t) {
    var n = new e.Bond.Int64("0"), r = this._Read(t);
    return n.low = r[0], r.length > 1 && (n.high = r[1]), n;
  }, t.GetNumber = function (e) {
    return this._Read(e)[0];
  }, t._Read = function (e) {
    var t = [], n = 0, r = !0, i = 0;
    while (r) {
      var s = e.shift();
      r = (s & 128) != 0, s &= 127;
      if (!(i < 28)) {
        n |= s << i, t.push(n), n = s >> 4, i = 3;
        break;
      }
      n |= s << i, i += 7;
    }
    while (r) {
      var s = e.shift();
      r = (s & 128) != 0, s &= 127, n |= s << i, i += 7;
      if (i >= 32)
        break;
    }
    return t.push(n), t;
  }, t;
}()
