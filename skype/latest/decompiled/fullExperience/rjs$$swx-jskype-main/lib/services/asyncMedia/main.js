(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/asyncMedia/main", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "jskype-settings-instance",
      "swx-async-media-service"
    ], e);
}(function (e, t) {
  function s() {
    return i.build(n.get().signInManager._skypeToken, r.settings);
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("jskype-settings-instance"), i = e("swx-async-media-service");
  t.get = s;
}));
