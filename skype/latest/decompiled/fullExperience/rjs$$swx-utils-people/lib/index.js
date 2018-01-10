(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-people/lib/index", [
      "require",
      "exports",
      "./lastSeenConverter",
      "./organizePersons",
      "./personPropertyFormatter",
      "./progressiveTimeout",
      "./userDataProcessor",
      "./avatar/cache",
      "./avatar/helper"
    ], e);
}(function (e, t) {
  var n = e("./lastSeenConverter");
  t.lastSeenConverter = n;
  var r = e("./organizePersons");
  t.organizePersons = r;
  var i = e("./personPropertyFormatter");
  t.personPropertyFormatter = i;
  var s = e("./progressiveTimeout");
  t.progressiveTimeout = s;
  var o = e("./userDataProcessor");
  t.userDataProcessor = o;
  var u = e("./avatar/cache");
  t.avatarCache = u;
  var a = e("./avatar/helper");
  t.avatarHelper = a;
}));
