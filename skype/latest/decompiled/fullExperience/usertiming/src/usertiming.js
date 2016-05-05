function (e) {
  typeof e == "undefined" && (e = {}), typeof e.performance == "undefined" && (e.performance = {}), e._perfRefForUserTimingPolyfill = e.performance, e.performance.userTimingJsNow = !1, e.performance.userTimingJsNowPrefixed = !1, e.performance.userTimingJsUserTiming = !1, e.performance.userTimingJsUserTimingPrefixed = !1, e.performance.userTimingJsPerformanceTimeline = !1, e.performance.userTimingJsPerformanceTimelinePrefixed = !1;
  var t = [], n = [], r = null, i, s;
  if (typeof e.performance.now != "function") {
    e.performance.userTimingJsNow = !0, n = [
      "webkitNow",
      "msNow",
      "mozNow"
    ];
    for (i = 0; i < n.length; i++)
      if (typeof e.performance[n[i]] == "function") {
        e.performance.now = e.performance[n[i]], e.performance.userTimingJsNowPrefixed = !0;
        break;
      }
    var o = +new Date();
    e.performance.timing && e.performance.timing.navigationStart && (o = e.performance.timing.navigationStart), typeof e.performance.now != "function" && (Date.now ? e.performance.now = function () {
      return Date.now() - o;
    } : e.performance.now = function () {
      return +new Date() - o;
    });
  }
  var u = function () {
    }, a = function () {
    }, f = [], l = !1, c = !1;
  if (typeof e.performance.getEntries != "function" || typeof e.performance.mark != "function") {
    typeof e.performance.getEntries == "function" && typeof e.performance.mark != "function" && (c = !0), e.performance.userTimingJsPerformanceTimeline = !0, t = [
      "webkit",
      "moz"
    ], n = [
      "getEntries",
      "getEntriesByName",
      "getEntriesByType"
    ];
    for (i = 0; i < n.length; i++)
      for (s = 0; s < t.length; s++)
        r = t[s] + n[i].substr(0, 1).toUpperCase() + n[i].substr(1), typeof e.performance[r] == "function" && (e.performance[n[i]] = e.performance[r], e.performance.userTimingJsPerformanceTimelinePrefixed = !0);
    u = function (e) {
      f.push(e), e.entryType === "measure" && (l = !0);
    };
    var h = function () {
      if (!l)
        return;
      f.sort(function (e, t) {
        return e.startTime - t.startTime;
      }), l = !1;
    };
    a = function (e, t) {
      i = 0;
      while (i < f.length) {
        if (f[i].entryType !== e) {
          i++;
          continue;
        }
        if (typeof t != "undefined" && f[i].name !== t) {
          i++;
          continue;
        }
        f.splice(i, 1);
      }
    };
    if (typeof e.performance.getEntries != "function" || c) {
      var p = e.performance.getEntries;
      e.performance.getEntries = function () {
        h();
        var t = f.slice(0);
        return c && p && (Array.prototype.push.apply(t, p.call(e.performance)), t.sort(function (e, t) {
          return e.startTime - t.startTime;
        })), t;
      };
    }
    if (typeof e.performance.getEntriesByType != "function" || c) {
      var d = e.performance.getEntriesByType;
      e.performance.getEntriesByType = function (t) {
        if (typeof t == "undefined" || t !== "mark" && t !== "measure")
          return c && d ? d.call(e.performance, t) : [];
        t === "measure" && h();
        var n = [];
        for (i = 0; i < f.length; i++)
          f[i].entryType === t && n.push(f[i]);
        return n;
      };
    }
    if (typeof e.performance.getEntriesByName != "function" || c) {
      var v = e.performance.getEntriesByName;
      e.performance.getEntriesByName = function (t, n) {
        if (n && n !== "mark" && n !== "measure")
          return c && v ? v.call(e.performance, t, n) : [];
        typeof n != "undefined" && n === "measure" && h();
        var r = [];
        for (i = 0; i < f.length; i++) {
          if (typeof n != "undefined" && f[i].entryType !== n)
            continue;
          f[i].name === t && r.push(f[i]);
        }
        return c && v && (Array.prototype.push.apply(r, v.call(e.performance, t, n)), r.sort(function (e, t) {
          return e.startTime - t.startTime;
        })), r;
      };
    }
  }
  if (typeof e.performance.mark != "function") {
    e.performance.userTimingJsUserTiming = !0, t = [
      "webkit",
      "moz",
      "ms"
    ], n = [
      "mark",
      "measure",
      "clearMarks",
      "clearMeasures"
    ];
    for (i = 0; i < n.length; i++)
      for (s = 0; s < t.length; s++)
        r = t[s] + n[i].substr(0, 1).toUpperCase() + n[i].substr(1), typeof e.performance[r] == "function" && (e.performance[n[i]] = e.performance[r], e.performance.userTimingJsUserTimingPrefixed = !0);
    var m = {};
    typeof e.performance.mark != "function" && (e.performance.mark = function (t) {
      var n = e.performance.now();
      if (typeof t == "undefined")
        throw new SyntaxError("Mark name must be specified");
      if (e.performance.timing && t in e.performance.timing)
        throw new SyntaxError("Mark name is not allowed");
      m[t] || (m[t] = []), m[t].push(n), u({
        entryType: "mark",
        name: t,
        startTime: n,
        duration: 0
      });
    }), typeof e.performance.clearMarks != "function" && (e.performance.clearMarks = function (e) {
      e ? m[e] = [] : m = {}, a("mark", e);
    }), typeof e.performance.measure != "function" && (e.performance.measure = function (t, n, r) {
      var i = e.performance.now();
      if (typeof t == "undefined")
        throw new SyntaxError("Measure must be specified");
      if (!n) {
        u({
          entryType: "measure",
          name: t,
          startTime: 0,
          duration: i
        });
        return;
      }
      var s = 0;
      if (e.performance.timing && n in e.performance.timing) {
        if (n !== "navigationStart" && e.performance.timing[n] === 0)
          throw new Error(n + " has a timing of 0");
        s = e.performance.timing[n] - e.performance.timing.navigationStart;
      } else {
        if (!(n in m))
          throw new Error(n + " mark not found");
        s = m[n][m[n].length - 1];
      }
      var o = i;
      if (r) {
        o = 0;
        if (e.performance.timing && r in e.performance.timing) {
          if (r !== "navigationStart" && e.performance.timing[r] === 0)
            throw new Error(r + " has a timing of 0");
          o = e.performance.timing[r] - e.performance.timing.navigationStart;
        } else {
          if (!(r in m))
            throw new Error(r + " mark not found");
          o = m[r][m[r].length - 1];
        }
      }
      var a = o - s;
      u({
        entryType: "measure",
        name: t,
        startTime: s,
        duration: a
      });
    }), typeof e.performance.clearMeasures != "function" && (e.performance.clearMeasures = function (e) {
      a("measure", e);
    });
  }
  typeof define != "undefined" && define.amd ? define("usertiming/src/usertiming", [], function () {
    return e.performance;
  }) : typeof module != "undefined" && typeof module.exports != "undefined" && (module.exports = e.performance);
}(typeof window != "undefined" ? window : undefined)
