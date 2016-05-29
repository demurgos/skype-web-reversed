module.exports = function () {
  function e() {
  }
  return e.GetString = function (e) {
    var t = [];
    for (var n = 0; n < e.length; ++n) {
      var r = e[n];
      if (r <= 191)
        t.push(String.fromCharCode(r));
      else if (r <= 223) {
        var i = e[++n];
        t.push(String.fromCharCode((r & 31) << 6 | i & 63));
      } else if (r <= 239) {
        var i = e[++n], s = e[++n];
        t.push(String.fromCharCode((r & 15) << 12 | (i & 63) << 6 | s & 63));
      } else {
        var i = e[++n], s = e[++n], o = e[++n];
        r = (r & 7) << 18 | (i & 63) << 12 | (s & 63) << 6 | o & 63;
        r -= 65536;
        t.push(String.fromCharCode(55296 | r >> 10 & 1023));
        t.push(String.fromCharCode(56320 | r & 1023));
      }
    }
    return t.join("");
  }, e;
}()
