module.exports = function () {
  function e() {
  }
  return e.GetBytes = function (e) {
    var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n = [];
    for (var r = 0; r < e.length; ++r) {
      var i = t.indexOf(e.charAt(r++)), s = t.indexOf(e.charAt(r++)), o = t.indexOf(e.charAt(r++)), u = t.indexOf(e.charAt(r));
      n.push(i << 2 | s >> 4), o >= 0 && (n.push(s << 4 & 240 | o >> 2), u >= 0 && n.push(o << 6 & 192 | u));
    }
    return n;
  }, e;
}()
