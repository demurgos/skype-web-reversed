(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/signIn/handlers/token", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function n(e) {
    return Promise.resolve(r(e));
  }
  function r(e) {
    function t() {
      return e && e.getExpiryTime && typeof e.getExpiryTime == "function" ? e.getExpiryTime() * 1000 : undefined;
    }
    if (e && e.getToken)
      return {
        getToken: e.getToken,
        getExpiryTime: t
      };
    throw "Unknown signIn parameter";
  }
  t.handler = n;
}));
