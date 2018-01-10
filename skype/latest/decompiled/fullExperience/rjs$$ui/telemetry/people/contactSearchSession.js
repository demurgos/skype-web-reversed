define("ui/telemetry/people/contactSearchSession", [
  "require",
  "exports",
  "module",
  "ui/telemetry/people/contactTelemetryHelper",
  "swx-constants"
], function (e, t) {
  function o(e, t) {
    var r = n.getTrace(i.SESSION_SEARCH), o = {};
    if (!u(r) || !a(e))
      return;
    return o[s.fields.NAME] = t, o[s.fields.SUCCESS] = e.success, n.addIfDefined(o, s.fields.BEGIN_TIMESTAMP, r.startTime), n.addIfDefined(o, s.fields.ELAPSED, r.duration), n.addIfDefined(o, s.fields.SESSION_ID, e.sessionId), n.addIfDefined(o, s.fields.QUERY_COUNT, e.queryCount), n.addIfDefined(o, s.fields.SUCCESS_CRITERIA, e.successCriteria), n.addIfDefined(o, s.fields.SOURCE, e.source), o;
  }
  function u(e) {
    return e && e.startTime && e.duration;
  }
  function a(e) {
    return e && e.successCriteria && e.success !== undefined;
  }
  var n = e("ui/telemetry/people/contactTelemetryHelper"), r = e("swx-constants").COMMON, i = r.telemetry.performanceMarks.CONTACTS, s = r.telemetry.contactsV2.searchSession;
  t.onSearchSessionStart = function () {
    n.setStart(i.SESSION_SEARCH);
  };
  t.onSearchSessionEnd = function (e) {
    var t = o(e, s.names.SEARCH_SESSION);
    n.send(t, s.TYPE);
  };
});
