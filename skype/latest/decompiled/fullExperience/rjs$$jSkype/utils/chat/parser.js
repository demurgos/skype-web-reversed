define("jSkype/utils/chat/parser", [
  "require",
  "utils/chat/messageSanitizer"
], function (e) {
  var t = e("utils/chat/messageSanitizer"), n = /\/((?:\d+:|live:)[^\/]+)/;
  return {
    parseName: function (e) {
      if (typeof e != "string")
        throw new TypeError("Expected a string, got: " + typeof e);
      var t = e.match(n);
      return t ? t[1] : e;
    },
    parseTopic: function (e) {
      var n = e.replace(/<[^a\/].*?>(.*?)<\/[^a].*?>/gi, "$1"), r = n.replace(/(<.*?\.{3,})$/, "").trim(), i = r === "" ? "" : t.validateUnescapedLink(r);
      return i;
    },
    getConversationIdFromUrl: function (e) {
      var t = new RegExp(/\/(\d+:[^?]*)/), n = e && e.match(t);
      return n && n[1] ? n[1] : undefined;
    }
  };
});
