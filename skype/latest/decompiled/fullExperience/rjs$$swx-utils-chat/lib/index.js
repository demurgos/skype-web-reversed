(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-chat/lib/index", [
      "require",
      "exports",
      "./conversation",
      "./conversationCache",
      "./dateTime",
      "./messageSanitizer",
      "./sort",
      "./spaceMail",
      "./urlParser",
      "./urlValidator",
      "./participant"
    ], e);
}(function (e, t) {
  var n = e("./conversation");
  t.conversation = n;
  var r = e("./conversationCache");
  t.conversationCache = r;
  var i = e("./dateTime");
  t.dateTime = i;
  var s = e("./messageSanitizer");
  t.messageSanitizer = s;
  var o = e("./sort");
  t.sort = o;
  var u = e("./spaceMail");
  t.spaceMail = u;
  var a = e("./urlParser");
  t.urlParser = a;
  var f = e("./urlValidator");
  t.urlValidator = f;
  var l = e("./participant");
  t.participant = l;
}));
