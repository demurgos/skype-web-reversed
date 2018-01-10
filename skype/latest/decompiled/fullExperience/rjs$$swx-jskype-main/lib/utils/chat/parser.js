(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/utils/chat/parser", [
      "require",
      "exports",
      "swx-utils-chat"
    ], e);
}(function (e, t) {
  function i(e) {
    if (typeof e != "string")
      throw new TypeError("Expected a string, got: " + typeof e);
    var t = e.match(r);
    return t ? t[1] : e;
  }
  function s(e) {
    var t = e.replace(/<[^a\/].*?>(.*?)<\/[^a].*?>/gi, "$1"), r = t.replace(/(<.*?\.{3,})$/, "").trim(), i = r === "" ? "" : n.messageSanitizer.validateUnescapedLink(r);
    return i;
  }
  function o(e) {
    var t = /\/(\d+:[^?]*)/, n = e && e.match(t);
    return n && n[1] ? n[1] : undefined;
  }
  var n = e("swx-utils-chat"), r = /\/((?:\d+:|live:)[^\/]+)/;
  t.parseName = i;
  t.parseTopic = s;
  t.getConversationIdFromUrl = o;
}));
