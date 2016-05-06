module.exports = function () {
  function e() {
  }
  return e.GetBytes = function (e) {
    var t = e.low, n = e.high, r = [];
    while (n || 4294967168 & t)
      r.push(t & 127 | 128), t = (n & 127) << 25 | t >>> 7, n >>>= 7;
    return r.push(t & 127), r;
  }, e;
}()
