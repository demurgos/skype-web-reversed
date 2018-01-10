(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/telemetry/logging/issueReporter", [
      "require",
      "exports",
      "swx-log-tracer",
      "../../services/serviceAccessLayer/requestDispatcher",
      "jskype-settings-instance",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function u(e) {
    var t = { dataType: "html" };
    return typeof e != "undefined" ? s.merge(t, e) : t;
  }
  function a(e) {
    var t = i.settings.telemetry.issueReportUrl, s, a;
    return r.put(t + "/session/unprocessed", u({ headers: { "X-comment": e.message } })).then(function (e) {
      var o = e.response.split("\n"), f = n.getLogs();
      return s = o[0], a = o[2], Promise.all([
        {
          name: "logs.log",
          content: f.all
        },
        {
          name: "errors.log",
          content: f.error
        },
        {
          name: "config.log",
          content: JSON.stringify(i)
        }
      ].map(function (e) {
        return r.put(t + "/upload/" + s + "/" + e.name, u({ payload: e.content }));
      }));
    }).then(function () {
      return r.put(t + "/session/" + s + "/done", u());
    }).then(function () {
      return n.clearLogs(), {
        id: s,
        url: a
      };
    })["catch"](function (e) {
      throw o.error("failed to report issue: ", e), e;
    });
  }
  var n = e("swx-log-tracer"), r = e("../../services/serviceAccessLayer/requestDispatcher"), i = e("jskype-settings-instance"), s = e("lodash-compat"), o = n.getLogger("issueReporter");
  t.report = a;
}));
