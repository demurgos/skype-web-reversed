(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/plugin/pluginDetect", [
      "require",
      "exports",
      "swx-browser-globals",
      "swx-browser-detect",
      "swx-constants"
    ], e);
}(function (e, t) {
  function s() {
    var e = r["default"].getBrowserInfo();
    return e.isElectron ? !0 : e.isIeEngine ? o(e) : u();
  }
  function o(e) {
    try {
      var t = n.getWindow().ActiveXObject;
      return new t(i.PLUGIN_CONST.PROGID_VERSION), !0;
    } catch (r) {
      return !1;
    }
  }
  function u() {
    var e = n.getWindow();
    e.navigator.plugins && e.navigator.plugins.refresh && e.navigator.plugins.refresh();
    if (!e.navigator.mimeTypes)
      return !1;
    var t = e.navigator.mimeTypes;
    return t[i.PLUGIN_CONST.MIME_TYPE] ? t[i.PLUGIN_CONST.MIME_TYPE].enabledPlugin !== undefined : !1;
  }
  var n = e("swx-browser-globals"), r = e("swx-browser-detect"), i = e("swx-constants");
  t.isPluginInstalled = s;
}));
