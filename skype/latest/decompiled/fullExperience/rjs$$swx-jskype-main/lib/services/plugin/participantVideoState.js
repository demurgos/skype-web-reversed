(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/plugin/participantVideoState", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  t.__esModule = !0;
  t["default"] = {
    available: "Available",
    starting: "Starting",
    rendering: "Rendering",
    stopping: "Stopping",
    notAvailable: "NotAvailable"
  };
}));
