(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/common/stream/receiveStream", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  var n = function () {
    function e() {
    }
    return e;
  }();
  n.SourceNone = -1;
  n.SourceAny = -2;
  t.MediaSourceIdentifiers = n;
}));
