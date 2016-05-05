define("ui/session/localSession", [
  "require",
  "exports",
  "module",
  "swx-utils-common",
  "swx-utils-common"
], function (e, t) {
  var n = e("swx-utils-common").guid, r = e("swx-utils-common").sessionStorage, i = {}, s, o = n.create(), u = "swx-sessionid";
  t.getSessionId = function () {
    return s ? s : (s = r.get(u), s || (s = n.create(), r.set(u, s)), s);
  }, t.getTabSessionId = function () {
    return o;
  }, t.setTelemetrySessionValue = function (e, t) {
    if (!t)
      throw new Error("You are trying to set session parameter with a null value. Key:" + e);
    i[e] = t;
  }, t.getTelemetrySessionKeyValuePairs = function () {
    var e = {};
    for (var t in i)
      i.hasOwnProperty(t) && (e[t] = i[t]);
    return e;
  };
})
