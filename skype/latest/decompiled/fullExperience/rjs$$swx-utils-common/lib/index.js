(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-common/lib/index", [
      "require",
      "exports",
      "./guid",
      "./loader",
      "./sessionStorage",
      "./stopwatch",
      "./stringUtils",
      "./settablePromise",
      "./cancelation",
      "./url"
    ], e);
}(function (e, t) {
  var n = e("./guid");
  t.guid = n;
  var r = e("./loader");
  t.loader = r;
  var i = e("./sessionStorage");
  t.sessionStorage = i;
  var s = e("./stopwatch");
  t.stopwatch = s;
  var o = e("./stringUtils");
  t.stringUtils = o;
  var u = e("./settablePromise");
  t.settablePromise = u;
  var a = e("./cancelation");
  t.cancelation = a;
  var f = e("./url");
  t.url = f;
}));
