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
  function r(e, r) {
    var i = n.getWindow();
    try {
      i.sessionStorage.setItem(e, r);
      delete t._backingStore[e];
    } catch (s) {
      t._backingStore[e] = r;
    }
  }
  function i(e) {
    var r = n.getWindow();
    try {
      var i = r.sessionStorage.getItem(e);
      return !i && e in t._backingStore ? t._backingStore[e] : (t._backingStore[e] = i, i);
    } catch (s) {
    }
  }
  function s(e) {
    var r = n.getWindow();
    try {
      delete t._backingStore[e];
      r.sessionStorage.removeItem(e);
    } catch (i) {
    }
  }
  function o() {
    var e = n.getWindow();
    try {
      t._backingStore = {};
      e.sessionStorage.clear();
    } catch (r) {
    }
  }
  var n = e("swx-browser-globals");
  t._backingStore = {};
  t.set = r;
  t.get = i;
  t.remove = s;
  t.clear = o;
}));
