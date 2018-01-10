define("telemetry/manager/telemetryManager", [
  "require",
  "microsoft-aria",
  "usertiming",
  "lodash-compat",
  "experience/settings"
], function (e) {
  function s() {
    function h(e) {
      if (typeof e != "string")
        throw "Performance telemetry mark name must be a string";
      return {
        start: e + "_start",
        end: e + "_end",
        measurement: e + "_ttc",
        context: e + "_context"
      };
    }
    function p(e) {
      t.clearMarks(e.start);
      t.clearMarks(e.end);
      t.clearMeasures(e.measurement);
    }
    function d(e) {
      return t.getEntriesByName(e).length > 0;
    }
    function v(e, t) {
      Object.keys(t).forEach(function (n) {
        var r = t[n];
        if (Array.isArray(r)) {
          if (!g(r[0]))
            throw new Error("Value should be string, number or boolean.");
          if (typeof r[1] != "number")
            throw new Error("PIIType should be number");
          e.setProperty(n, y(r[0]), r[1]);
        } else
          g(r) && e.setProperty(n, y(r), i.skypeTelemetryManager.PIIType.NotSet);
      });
    }
    function m(t) {
      Object.keys(e).forEach(function (n) {
        var r = e[n], i = typeof r[0] == "function" ? r[0]() : r[0];
        t.setProperty(n, y(i), r[1]);
      });
    }
    function g(e) {
      return typeof e == "string" || typeof e == "number" || typeof e == "boolean";
    }
    function y(e) {
      return e + "";
    }
    var e = {}, s = {}, o = {}, u = {}, a, f = 604800, l = !0, c = this;
    c.enabled = function (e) {
      l = e;
    };
    c.setCommonProperty = function (t, n, r) {
      if (typeof t != "string")
        throw new Error("Property name should be string");
      if (typeof r != "undefined" && typeof r != "number")
        throw new Error("PIIType should be number");
      if (!g(n) && typeof n != "function")
        throw new Error("Value should be string, number, boolean or function.");
      var s = typeof r == "undefined" ? i.skypeTelemetryManager.PIIType.NotSet : r;
      e[t] = [
        n,
        s
      ];
    };
    c.setSkypeUserId = function (e) {
      c.setCommonProperty("user_id", e, i.skypeTelemetryManager.PIIType.Identity);
      c.setCommonProperty("Skype_InitiatingUser_Username", e);
    };
    c.sendEvent = function (e, t, n) {
      if (!l)
        return;
      if (typeof e != "string")
        throw new Error("Tenant ID should be string");
      if (typeof t != "string")
        throw new Error("Event name should be string");
      c._getLogger(e);
      var r = new microsoft.applications.telemetry.EventProperties();
      r.name = t;
      v(r, n);
      m(r);
      o[e].logEvent(r);
    };
    c.setAppProperties = function (e) {
      a = e;
    };
    c.traceStart = function (e, n) {
      var r = h(e);
      (d(r.start) || d(r.end)) && p(r);
      t.mark(r.start);
      s[r.context] = n;
    };
    c.traceEnd = function (e, r) {
      var i = h(e);
      d(i.end) && (t.clearMarks(i.end), t.clearMeasures(i.measurement));
      d(i.start) && (t.mark(i.end), t.measure(i.measurement, i.start, i.end), s[i.context] = s[i.context] || {}, n.merge(s[i.context], r));
    };
    c.traceDump = function (e) {
      var n = h(e), r = {
          duration: undefined,
          startTime: undefined
        };
      d(n.start) && !d(n.end) && c.traceEnd(e);
      if (d(n.measurement)) {
        var i = t.getEntriesByName(n.measurement)[0].duration, o = t.now() - t.getEntriesByName(n.end)[0].startTime, u = o + i;
        i > 1 && u < f && (r.duration = Math.round(i), r.startTime = Math.round(Date.now() - u), r.context = s[n.context]);
      }
      return p(n), s[n.context] = undefined, r;
    };
    c._getLogger = function (e) {
      return o[e] || (microsoft.applications.telemetry.LogManager.initialize(e), o[e] = new microsoft.applications.telemetry.Logger(e), u[e] = o[e].getSemanticContext(), u[e].setAppVersion(a), o[e]._semanticContext.setAppLanguage(r.applicationLanguage)), o[e];
    };
    c._getEventProperties = function () {
      return new microsoft.applications.telemetry.EventProperties();
    };
  }
  e("microsoft-aria");
  var t = e("usertiming"), n = e("lodash-compat"), r = e("experience/settings"), i = window;
  i.skypeTelemetryManager || (i.skypeTelemetryManager = {});
  i.skypeTelemetryManager.PIIType = {
    NotSet: 0,
    DistinguishedName: 1,
    GenericData: 2,
    IPV4Address: 3,
    IPv6Address: 4,
    MailSubject: 5,
    PhoneNumber: 6,
    QueryString: 7,
    SipAddress: 8,
    SmtpAddress: 9,
    Identity: 10,
    Uri: 11,
    Fqdn: 12
  };
  i.skypeTelemetryManager.create = function () {
    return new s();
  };
});
