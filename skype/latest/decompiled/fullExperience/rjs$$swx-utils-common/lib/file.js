(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-common/lib/file", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function n(e) {
    var t = [
      "image/png",
      "image/x-png",
      "image/jpeg"
    ];
    return t.some(function (t) {
      return e.type === t;
    });
  }
  t.isImage = n;
}));
