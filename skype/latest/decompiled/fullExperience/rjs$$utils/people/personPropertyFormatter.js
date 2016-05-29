define("utils/people/personPropertyFormatter", [
  "require",
  "exports",
  "module",
  "lodash-compat"
], function (e, t) {
  var n = e("lodash-compat"), r = 15;
  t.getId = function (e) {
    if (n.isString(e))
      return e.replace(/^((\d+):)+/, "");
  };
  t.truncateDisplayName = function (e, t) {
    t || (t = r);
    if (!e)
      return e;
    if (e.length <= t)
      return e.trim();
    var n = e.substring(0, t).lastIndexOf(" ");
    return n === -1 && (n = t), e.substring(0, n).trim();
  };
});
