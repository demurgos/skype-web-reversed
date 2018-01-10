define("utils/people/avatar/helper", [
  "require",
  "lodash-compat",
  "browser/window",
  "swx-utils-people"
], function (e) {
  var t = e("lodash-compat"), n = e("browser/window"), r = e("swx-utils-people").avatarHelper.default, i = new r(n.document);
  return t.bindAll(i), i;
});
