(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("jskype-constants/lib/featureFlags", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  t.__esModule = !0;
  t["default"] = {
    PLUGIN_AUTO_UPDATE: "pluginAutoUpdate",
    CREDIT_BALANCE_AUTO_UPDATE_ENABLED: "creditBalanceAutoUpdateEnabled"
  };
}));
