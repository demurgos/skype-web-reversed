(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-log-tracer/lib/api", [
      "require",
      "exports",
      "lodash-compat",
      "./bufferingWriter",
      "./consoleWriter",
      "./telemetryWriter",
      "./messageBuffer",
      "./nullLogger",
      "./decoratingLogger",
      "./telemetryReporter",
      "swx-browser-globals"
    ], e);
}(function (e, t) {
  function g() {
    return {
      all: c.toString(),
      error: h.toString()
    };
  }
  function y() {
    c.clear();
    h.clear();
  }
  function b(e, t, n) {
    function u() {
      var o, u = function () {
          return e;
        };
      if (v.logToBuffer) {
        var f = v.logToConsole ? console : null;
        o = r.build(f, c, h);
      } else
        v.logToConsole && (o = i.build());
      return v.reporting.enabled && (o = s.build(o, d)), o ? a.build(o, u, t, n) : p;
    }
    function f(e) {
      return function () {
        return o || (o = u()), o[e];
      };
    }
    var o;
    return Object.create(Object.prototype, {
      log: { get: f("log") },
      info: { get: f("info") },
      warn: { get: f("warn") },
      error: { get: f("error") },
      debug: { get: f("debug") },
      createChild: { get: f("createChild") }
    });
  }
  function w(e) {
    v = {
      logToConsole: !1,
      logToBuffer: !1,
      logUnhandled: !1,
      reporting: {
        enabled: !1,
        throttleInterval: 10000,
        telemetryManager: null,
        telemetryToken: null
      }
    };
    n.merge(v, e);
    d.update(v);
    E();
  }
  function E() {
    m && (l.getWindow().removeEventListener("error", S), m = null);
    v.logUnhandled && (m = b("Unhandled Exceptions"), l.getWindow().addEventListener("error", S));
  }
  function S(e) {
    try {
      m.error(JSON.stringify(e.error, [
        "message",
        "arguments",
        "type",
        "name",
        "stack"
      ]));
    } catch (t) {
      m.error("Error: " + e);
    }
  }
  var n = e("lodash-compat"), r = e("./bufferingWriter"), i = e("./consoleWriter"), s = e("./telemetryWriter"), o = e("./messageBuffer"), u = e("./nullLogger"), a = e("./decoratingLogger"), f = e("./telemetryReporter"), l = e("swx-browser-globals"), c = o.build(), h = o.build(), p = u.build(), d = f.build(), v, m;
  t.getLogs = g;
  t.clearLogs = y;
  t.getLogger = b;
  t.configure = w;
  w();
}));
