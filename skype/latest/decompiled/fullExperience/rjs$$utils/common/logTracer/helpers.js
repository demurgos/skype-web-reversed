define("utils/common/logTracer/helpers", [
  "require",
  "exports",
  "module"
], function (e, t) {
  function n(e) {
    var t;
    try {
      e instanceof Error ? t = e.toString() : t = JSON.stringify(e);
    } catch (n) {
      t = "!!!LOG TRACER ERROR!!!Unable to parse argument!!!";
    }
    return t;
  }
  t.getFormattedMessage = function (e) {
    var t = "", r = !1, i = function (e) {
        return i = function (e) {
          return r || e ? (r = e, "\n") : " ";
        }, r = e, "";
      };
    for (var s = 1; s < e.length; s++) {
      var o = e[s];
      if (typeof o == "string" || typeof o == "undefined")
        t += i(!1) + o;
      else {
        var u = n(o);
        t += i(u.length > 200) + u;
      }
    }
    return t;
  };
  t.getTimeOfDayString = function () {
    var e = new Date(), t = e.getHours();
    t = (t < 10 ? "0" : "") + t;
    var n = e.getMinutes();
    n = (n < 10 ? "0" : "") + n;
    var r = e.getSeconds();
    return r = (r < 10 ? "0" : "") + r, t + ":" + n + ":" + r + ":" + e.getMilliseconds();
  };
});
