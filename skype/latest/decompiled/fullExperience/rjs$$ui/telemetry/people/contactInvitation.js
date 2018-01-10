define("ui/telemetry/people/contactInvitation", [
  "require",
  "exports",
  "module",
  "ui/telemetry/people/contactTelemetryHelper",
  "swx-constants"
], function (e, t) {
  function o(e, t, r) {
    var i = n.getTrace(e), r = r || {}, o = {};
    return o[s.fields.NAME] = t, o[s.fields.SUCCESS] = r.success, n.addIfDefined(o, s.fields.BEGIN_TIMESTAMP, i.startTime), n.addIfDefined(o, s.fields.ELAPSED, i.duration), n.addIfDefined(o, s.fields.RESEND, r.resend), n.addIfDefined(o, s.fields.SOURCE, r.source), o;
  }
  var n = e("ui/telemetry/people/contactTelemetryHelper"), r = e("swx-constants").COMMON, i = r.telemetry.performanceMarks.CONTACTS, s = r.telemetry.contactsV2.invitation;
  t.onSendContactRequestStart = function () {
    n.setStart(i.SEND_REQUEST);
  };
  t.onSendContactRequestEnd = function (e) {
    var t = o(i.SEND_REQUEST, s.names.SEND_CONTACT_REQUEST, e);
    n.send(t, s.TYPE);
  };
  t.onAcceptContactRequestStart = function () {
    n.setStart(i.ACCEPT_REQUEST);
  };
  t.onAcceptContactRequestEnd = function (e) {
    var t = o(i.ACCEPT_REQUEST, s.names.ACCEPT_CONTACT_REQUEST, e);
    n.send(t, s.TYPE);
  };
  t.onDeclineContactRequestStart = function () {
    n.setStart(i.DECLINE_REQUEST);
  };
  t.onDeclineContactRequestEnd = function (e) {
    var t = o(i.DECLINE_REQUEST, s.names.DECLINE_CONTACT_REQUEST, e);
    n.send(t, s.TYPE);
  };
});
