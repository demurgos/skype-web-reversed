define("utils/common/regex", [
  "require",
  "exports",
  "module"
], function (e, t) {
  t.escapeSpecialChars = function (e) {
    return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };
  t.multilineRegExp = function (e, t) {
    return new RegExp(e.join(""), t);
  };
});
