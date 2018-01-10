(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-log-tracer/lib/helpers", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function n(e) {
    var t = "", n = !1, r = function (e) {
        return r = function (e) {
          return n || e ? (n = e, "\n") : " ";
        }, n = e, "";
      };
    for (var s = 2; s < e.length; s++) {
      var o = e[s];
      if (typeof o == "string" || typeof o == "undefined")
        t += r(!1) + o;
      else {
        var u = i(o);
        t += r(u.length > 200) + u;
      }
    }
    return t;
  }
  function r() {
    function e(e) {
      return (e < 10 ? "0" : "") + e;
    }
    var t = new Date(), n = e(t.getHours()), r = e(t.getMinutes()), i = e(t.getSeconds());
    return n + ":" + r + ":" + i + ":" + t.getMilliseconds();
  }
  function i(e) {
    var t;
    try {
      typeof e == "undefined" ? t = "undefined" : e instanceof Error ? t = e.toString() : t = JSON.stringify(e);
    } catch (n) {
      t = "!!!LOG TRACER ERROR!!!Unable to parse argument!!!";
    }
    return t;
  }
  t.getFormattedMessage = n;
  t.getTimeOfDayString = r;
}));
