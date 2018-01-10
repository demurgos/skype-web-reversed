(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("jskype-constants/lib/calling", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  t.__esModule = !0;
  t["default"] = { eventProperties: { PluginVersion: "plugin_version" } };
}));
