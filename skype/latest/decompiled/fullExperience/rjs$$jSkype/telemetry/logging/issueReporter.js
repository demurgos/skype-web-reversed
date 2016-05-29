define("jSkype/telemetry/logging/issueReporter", [
  "require",
  "utils/common/logTracer/api",
  "jSkype/services/serviceAccessLayer/requestDispatcher",
  "lodash-compat",
  "jSkype/settings"
], function (e) {
  function o(e) {
    var t = { dataType: "html" };
    return typeof e != "undefined" ? r.merge(t, e) : t;
  }
  function u(e) {
    var r = i.settings.telemetry.issueReportUrl, u, a;
    return n.put(r + "/session/unprocessed", o({ headers: { "X-comment": e.message } })).then(function (e) {
      var s = e.response.split("\n"), f = t.getLogs();
      return u = s[0], a = s[2], Promise.all([
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
        return n.put(r + "/upload/" + u + "/" + e.name, o({ payload: e.content }));
      }));
    }).then(function () {
      return n.put(r + "/session/" + u + "/done", o());
    }).then(function () {
      return t.clearLogs(), {
        id: u,
        url: a
      };
    }).catch(function (e) {
      throw s.error("failed to report issue: ", e), e;
    });
  }
  var t = e("utils/common/logTracer/api"), n = e("jSkype/services/serviceAccessLayer/requestDispatcher"), r = e("lodash-compat"), i = e("jSkype/settings"), s = t.getLogger("issueReporter");
  return { report: u };
});
