(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-chat-service/lib/serviceSettings", [
      "require",
      "exports",
      "jskype-settings-instance"
    ], e);
}(function (e, t) {
  function r() {
    return n.settings.webApiServiceHost;
  }
  var n = e("jskype-settings-instance");
  t.getHost = r;
}));
