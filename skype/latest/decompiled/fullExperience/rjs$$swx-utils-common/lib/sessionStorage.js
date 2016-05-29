(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-common/lib/sessionStorage", [
      "require",
      "exports",
      "swx-browser-globals"
    ], e);
}(function (e, t) {
  function r(e, t) {
    var r = n.getWindow();
    try {
      r.sessionStorage.setItem(e, t);
    } catch (i) {
    }
  }
  function i(e) {
    var t = n.getWindow();
    try {
      return t.sessionStorage.getItem(e);
    } catch (r) {
    }
  }
  function s(e) {
    var t = n.getWindow();
    try {
      return t.sessionStorage.removeItem(e);
    } catch (r) {
    }
  }
  function o() {
    var e = n.getWindow();
    try {
      e.sessionStorage.clear();
    } catch (t) {
    }
  }
  var n = e("swx-browser-globals");
  t.set = r;
  t.get = i;
  t.remove = s;
  t.clear = o;
}));
