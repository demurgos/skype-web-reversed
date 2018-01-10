(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-chat/lib/sort", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function n(e, t) {
    return e.id - t.id;
  }
  function r(e, t) {
    return e.timestamp - t.timestamp;
  }
  function i(e, t) {
    return t.timestamp - e.timestamp;
  }
  t.byId = n;
  t.byTimestamp = r;
  t.byTimestampDescending = i;
}));
