(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/telemetry/people/contactInvitation", [
      "require",
      "exports",
      "./contactTelemetryHelper",
      "swx-constants"
    ], e);
}(function (e, t) {
  function o() {
    n.setStart(i.QUERY_INVITATION_LIST);
  }
  function u(e) {
    var t = a(i.QUERY_INVITATION_LIST, s.names.QUERY_INVITATION_LIST, e);
    n.send(t, s.TYPE);
  }
  function a(e, t, r) {
    var i = n.getTrace(e), r = r || {}, o = {};
    return o[s.fields.NAME] = t, o[s.fields.SUCCESS] = r.success, n.addIfDefined(o, s.fields.BEGIN_TIMESTAMP, i.startTime), n.addIfDefined(o, s.fields.ELAPSED, i.duration), n.addIfDefined(o, s.fields.SERVICE_ELAPSED, r.serviceElapsed), n.addIfDefined(o, s.fields.INVITATION_COUNT, r.invitationCount), o;
  }
  var n = e("./contactTelemetryHelper"), r = e("swx-constants"), i = r.COMMON.telemetry.performanceMarks.CONTACTS, s = r.COMMON.telemetry.contactsV2.invitation;
  t.onQueryInvitationListStart = o;
  t.onQueryInvitationListEnd = u;
}));
