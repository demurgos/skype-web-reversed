(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-internal-application-instance/lib/instance", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function r(e) {
    n = e;
  }
  function i() {
    if (!n)
      throw new Error("Instance does not exist yet!");
    return n;
  }
  var n;
  t.set = r;
  t.get = i;
}));
