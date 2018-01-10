(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-g11n/lib/globalization", [
      "require",
      "exports",
      "swx-browser-globals",
      "./formatter",
      "./settings"
    ], e);
}(function (e, t) {
  function s(e) {
    i.set(e);
  }
  function o(e) {
    var t = n.getDocument().documentElement;
    t.dir ? f(e, t.dir) : i.get().dir && f(e, i.get().dir);
  }
  function u(e, t) {
    var n = i.get().time.format[t];
    n || (n = i.get().date.format[t]);
    if (!n)
      throw new Error("No format found with a key:" + t + "in settings of:" + JSON.stringify(i.get().date.format));
    return r.formatDate(e, n, i.get());
  }
  function a(e, t) {
    var n = i.get().time.format[t];
    if (!n)
      throw new Error("No format found with a key:" + t + "in settings of:" + JSON.stringify(i.get().time.format));
    return r.formatDuration(e, n);
  }
  function f(e, t) {
    e.dir || (e.dir = t);
  }
  var n = e("swx-browser-globals"), r = e("./formatter"), i = e("./settings");
  t.init = s;
  t.initLocaleDirection = o;
  t.formatDate = u;
  t.formatDuration = a;
}));
