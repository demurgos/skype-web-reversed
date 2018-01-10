(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/utilities/enums", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  var n;
  (function (e) {
    e[e.Desktop = 1] = "Desktop";
    e[e.Mobile = 2] = "Mobile";
    e[e.Tablet = 8] = "Tablet";
  }(n = t.DeviceType || (t.DeviceType = {})));
}));
