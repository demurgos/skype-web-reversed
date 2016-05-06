module.exports = function () {
  function e() {
  }
  return e.GetBytes = function (e) {
    var t = [];
    for (var n = 0; n < e.length; ++n) {
      var r = e.charCodeAt(n);
      r < 128 ? t.push(r) : r < 2048 ? t.push(192 | r >> 6, 128 | r & 63) : r < 55296 || r >= 57344 ? t.push(224 | r >> 12, 128 | r >> 6 & 63, 128 | r & 63) : (r = 65536 + ((r & 1023) << 10 | e.charCodeAt(++n) & 1023), t.push(240 | r >> 18, 128 | r >> 12 & 63, 128 | r >> 6 & 63, 128 | r & 63));
    }
    return t;
  }, e;
}()
