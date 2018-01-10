(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("web-calling/lib/utilities/settablePromise", [
      "require",
      "exports",
      "./typeDefs"
    ], e);
}(function (e, t) {
  function r() {
    var e, t, r = new Promise(function (n, r) {
        e = n;
        t = r;
      });
    return r.state = n.SettablePromiseState.Pending, r.resolve = function (t) {
      r.state = n.SettablePromiseState.Resolved;
      e(t);
    }, r.reject = function (e) {
      r.state = n.SettablePromiseState.Rejected;
      t(e);
    }, r;
  }
  var n = e("./typeDefs");
  t.build = r;
}));
