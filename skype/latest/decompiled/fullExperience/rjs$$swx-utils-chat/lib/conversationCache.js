(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-chat/lib/conversationCache", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function r(e) {
    var t = n.filter(function (t) {
      return t.model === e;
    })[0];
    return t || (t = { model: e }, n.push(t)), t;
  }
  var n = [];
  t.forModel = r;
}));
