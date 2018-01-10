(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-pubsub-instance/lib/instance", [
      "require",
      "exports",
      "swx-pubsub"
    ], e);
}(function (e, t) {
  var n = e("swx-pubsub");
  t.__esModule = !0;
  t["default"] = n.build();
}));
