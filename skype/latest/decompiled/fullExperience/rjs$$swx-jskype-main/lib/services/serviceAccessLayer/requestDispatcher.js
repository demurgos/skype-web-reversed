(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/serviceAccessLayer/requestDispatcher", [
      "require",
      "exports",
      "swx-xhr-dispatcher",
      "swx-xhr-dispatcher/lib/decorations/retry",
      "./decorations/reporting"
    ], e);
}(function (e, t) {
  var n = e("swx-xhr-dispatcher"), r = e("swx-xhr-dispatcher/lib/decorations/retry"), i = e("./decorations/reporting"), s = n.buildDispatcherWithFixedRetry([
      r,
      i
    ]);
  return s;
}));
