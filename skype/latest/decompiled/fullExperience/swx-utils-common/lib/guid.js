function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-common/lib/guid", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function n(e) {
    var t = e.toString(16), n = 4 - t.length, r;
    for (r = 0; r < n; r += 1)
      t = "0" + t;
    return t;
  }
  function r() {
    var e = new Array(8), t, r;
    for (r = 0; r < e.length; r += 2)
      t = Math.floor(Math.random() * 4294967296), e[r] = n(t & 65535), e[r + 1] = n(t >>> 16), r + 1 === 3 && (e[r + 1] = "4" + e[r + 1].substring(1));
    return e;
  }
  function i() {
    var e = r();
    return e[0] + e[1] + "-" + e[2] + "-" + e[3] + "-" + e[4] + "-" + e[5] + e[6] + e[7];
  }
  function s() {
    var e = r();
    return e[0] + e[1] + e[2] + e[3] + e[4] + e[5] + e[6] + e[7];
  }
  t.create = i, t.createRaw = s;
})
