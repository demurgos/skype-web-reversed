(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/internalPubSub", [
      "require",
      "exports",
      "swx-pubsub",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function s() {
    i = null;
  }
  function o() {
    return i || (i = n.build(), r.bindAll(i, "subscribe", "unsubscribe", "publish", "unsubscribeAll")), i;
  }
  var n = e("swx-pubsub"), r = e("lodash-compat"), i;
  t.reset = s;
  t.get = o;
}));
