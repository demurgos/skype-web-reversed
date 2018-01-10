define("utils/people/lastSeenConverter", [
  "require",
  "lodash-compat",
  "swx-g11n",
  "swx-utils-chat",
  "swx-utils-people"
], function (e) {
  var t = e("lodash-compat"), n = e("swx-g11n").globalization, r = e("swx-utils-chat").dateTime, i = e("swx-utils-people").lastSeenConverter.default, s = new i(r, n);
  return t.bindAll(s), s;
});
