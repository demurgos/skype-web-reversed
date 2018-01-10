define("telemetry/utils/telemetryUtils", [
  "require",
  "exports",
  "module",
  "swx-constants"
], function (e, t) {
  var n = e("swx-constants").COMMON, r = n.telemetry.NOT_AVAILABLE;
  t.stringify = function (e) {
    for (var t in e)
      e.hasOwnProperty(t) && !(typeof e[t] == "string" || e[t] instanceof String) && (e[t] = e[t] + "");
    return e;
  };
  t.getOriginDescription = function (e, t) {
    for (var n in t)
      if (t.hasOwnProperty(n) && t[n] === e)
        return n;
    return r;
  };
});
