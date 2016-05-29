define("utils/common/logTracer/api", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "utils/common/logTracer/bufferingWriter",
  "utils/common/logTracer/consoleWriter",
  "utils/common/logTracer/telemetryWriter",
  "utils/common/logTracer/messageBuffer",
  "utils/common/logTracer/messageBuffer",
  "utils/common/logTracer/nullLogger",
  "utils/common/logTracer/decoratingLogger",
  "utils/common/logTracer/telemetryReporter"
], function (e, t) {
  function p() {
    h && (window.removeEventListener("error", d), h = null);
    c.logUnhandled && (h = t.getLogger("Unhandled Exceptions"), window.addEventListener("error", d));
  }
  function d(e) {
    try {
      h.error(JSON.stringify(e.error, [
        "message",
        "arguments",
        "type",
        "name",
        "stack"
      ]));
    } catch (t) {
      h.error("Error: " + e);
    }
  }
  var n = e("lodash-compat"), r = e("utils/common/logTracer/bufferingWriter"), i = e("utils/common/logTracer/consoleWriter"), s = e("utils/common/logTracer/telemetryWriter"), o = e("utils/common/logTracer/messageBuffer").build(), u = e("utils/common/logTracer/messageBuffer").build(), a = e("utils/common/logTracer/nullLogger").build(), f = e("utils/common/logTracer/decoratingLogger"), l = e("utils/common/logTracer/telemetryReporter").build(), c, h;
  t.getLogs = function () {
    return {
      all: o.toString(),
      error: u.toString()
    };
  };
  t.clearLogs = function () {
    o.clear();
    u.clear();
  };
  t.getLogger = function (e, t) {
    var n, h = function () {
        var n, h = function () {
            return e;
          };
        if (c.logToBuffer) {
          var p = c.logToConsole ? console : null;
          n = r.build(p, o, u);
        } else
          c.logToConsole && (n = i.build());
        return c.reporting.enabled && (n = s.build(n, l)), n ? f.build(n, h, t) : a;
      }, p = function (e) {
        return function () {
          return n || (n = h()), n[e];
        };
      };
    return Object.create(Object.prototype, {
      log: { get: p("log") },
      info: { get: p("info") },
      warn: { get: p("warn") },
      error: { get: p("error") },
      debug: { get: p("debug") },
      createChild: { get: p("createChild") }
    });
  };
  t.configure = function (e) {
    c = {
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
    n.merge(c, e);
    l.update(c);
    p();
  };
  t.configure();
});
