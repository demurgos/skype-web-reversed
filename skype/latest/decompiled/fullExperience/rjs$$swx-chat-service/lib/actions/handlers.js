(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-chat-service/lib/actions/handlers", [
      "require",
      "exports",
      "../index"
    ], e);
}(function (e, t) {
  function r(e, t, r) {
    return function (i) {
      var s = i.response, o = r(s), u = !!s._metadata.backwardLink;
      n.utils.conversationMetadataStore.set(e, o);
      t(s.messages || [], u);
    };
  }
  var n = e("../index");
  t.buildMessageSuccess = r;
}));
