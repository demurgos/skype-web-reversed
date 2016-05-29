define("utils/common/logTracer/telemetryWriter", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "utils/common/logTracer/helpers"
], function (e, t) {
  function i(e, t) {
    var i = this;
    [
      "log",
      "info",
      "warn",
      "debug"
    ].forEach(function (t) {
      i[t] = e ? e[t] : n.noop;
    });
    this.error = function () {
      e && e.error.apply(this, arguments);
      var n = r.getFormattedMessage(arguments), i = arguments[0], s = typeof arguments[1] != "undefined" ? arguments[1] : "", o = {
          namespace: i,
          message: n,
          shortMessage: s,
          level: "error"
        };
      t.send(o);
    };
  }
  var n = e("lodash-compat"), r = e("utils/common/logTracer/helpers");
  t.build = function (e, t) {
    return new i(e, t);
  };
});
