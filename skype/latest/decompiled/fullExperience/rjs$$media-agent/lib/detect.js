(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/detect", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function n() {
    return typeof RTCIceGatherer != "undefined";
  }
  t.__esModule = !0;
  t["default"] = { isEdge: n };
}));
