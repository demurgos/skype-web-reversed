(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/signIn/handlers/password", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function n() {
    return Promise.resolve(r());
  }
  function r() {
    return {
      getToken: function () {
        return !0;
      },
      getExpiryTime: function () {
        return 0;
      }
    };
  }
  t.handler = n;
}));
