define("jSkype/services/systemCommands/commands/reportIssue", [
  "require",
  "exports",
  "module",
  "jSkype/services/systemCommands/commandsHelper",
  "jSkype/settings",
  "constants/common",
  "jSkype/telemetry/logging/issueReporter",
  "lodash-compat"
], function (e, t) {
  function u(e, t) {
    n.sendSystemMessage(e, "Thank you for reporting the issue. Your issue id is: " + t.id + ". Logs have been uploaded to: " + t.url + ". If you happened to encounter a calling issue when " + "using Edge browser, make sure to also run the following script to collect media stack logs: " + r.settings.telemetry.issueReportScript);
  }
  function a(e) {
    n.sendSystemMessage(e, "Failed to report the issue.");
  }
  function f() {
    this.isAvailableFor = r.isFeatureOn(i.featureFlags.ISSUE_REPORTING) ? n.availableAlways : n.availableNever;
    this.help = "[text]";
    this.showInHelp = !0;
    this.action = function (e, t) {
      o.isEmpty(o.trim(t)) && (t = "No Message");
      s.report({ message: t }).then(u.bind(this, e), a.bind(this, e));
    };
  }
  var n = e("jSkype/services/systemCommands/commandsHelper"), r = e("jSkype/settings"), i = e("constants/common"), s = e("jSkype/telemetry/logging/issueReporter"), o = e("lodash-compat");
  t.build = function () {
    return new f();
  };
});
