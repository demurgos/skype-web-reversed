(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/systemCommands/commands/reportIssue", [
      "require",
      "exports",
      "../../../../lib/services/systemCommands/commandsHelper",
      "jskype-settings-instance",
      "swx-constants",
      "../../../../lib/telemetry/logging/issueReporter",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function u(e, t) {
    n.sendSystemMessage(e, "Thank you for reporting the issue. Your issue id is: " + t.id + ". Logs have been uploaded to: " + t.url + ". If you happened to encounter a calling issue when " + "using Edge browser, make sure to also run the following script to collect media stack logs: " + r.settings.telemetry.issueReportScript);
  }
  function a(e) {
    n.sendSystemMessage(e, "Failed to report the issue.");
  }
  function l() {
    return new f();
  }
  var n = e("../../../../lib/services/systemCommands/commandsHelper"), r = e("jskype-settings-instance"), i = e("swx-constants"), s = e("../../../../lib/telemetry/logging/issueReporter"), o = e("lodash-compat"), f = function () {
      function e() {
        var e = this;
        this.isAvailableFor = r.isFeatureOn(i.COMMON.featureFlags.ISSUE_REPORTING) ? n.availableAlways : n.availableNever;
        this.help = "[text]";
        this.showInHelp = !0;
        this.action = function (t, n) {
          o.isEmpty(o.trim(n)) && (n = "No Message");
          s.report({ message: n }).then(u.bind(e, t), a.bind(e, t));
        };
      }
      return e;
    }();
  t.ReportIssue = f;
  t.build = l;
}));
