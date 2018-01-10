define("utils/people/avatar/cache", [
  "require",
  "lodash-compat",
  "experience/settings",
  "swx-utils-chat",
  "utils/common/cache/instance",
  "swx-utils-people"
], function (e) {
  var t = e("lodash-compat"), n = e("experience/settings"), r = e("swx-utils-chat").dateTime, i = e("utils/common/cache/instance"), s = e("swx-utils-people").avatarCache.default, o = new s(i, n, r);
  return t.bindAll(o), o;
});
