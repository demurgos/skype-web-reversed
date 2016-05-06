module.exports = function () {
  function e() {
  }
  return e.GetString = function (e) {
    var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n = [], r = e.length % 3, i, s, o, u = function (e) {
        return [
          t.charAt(e >> 18 & 63),
          t.charAt(e >> 12 & 63),
          t.charAt(e >> 6 & 63),
          t.charAt(e & 63)
        ].join("");
      };
    for (i = 0, o = e.length - r; i < o; i += 3)
      s = (e[i] << 16) + (e[i + 1] << 8) + e[i + 2], n.push(u(s));
    switch (r) {
    case 1:
      s = e[e.length - 1], n.push(t.charAt(s >> 2)), n.push(t.charAt(s << 4 & 63)), n.push("==");
      break;
    case 2:
      s = (e[e.length - 2] << 8) + e[e.length - 1], n.push(t.charAt(s >> 10)), n.push(t.charAt(s >> 4 & 63)), n.push(t.charAt(s << 2 & 63)), n.push("=");
    }
    return n.join("");
  }, e;
}()
