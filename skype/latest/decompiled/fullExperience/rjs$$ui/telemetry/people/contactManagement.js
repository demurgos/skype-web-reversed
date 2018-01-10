define("ui/telemetry/people/contactManagement", [
  "require",
  "exports",
  "module",
  "ui/telemetry/people/contactTelemetryHelper",
  "swx-constants"
], function (e, t) {
  function o(e, t, r) {
    var i = n.getTrace(e), r = r || {}, o = {};
    return o[s.fields.NAME] = t, o[s.fields.SUCCESS] = r.success, n.addIfDefined(o, s.fields.BEGIN_TIMESTAMP, i.startTime), n.addIfDefined(o, s.fields.ELAPSED, i.duration), n.addIfDefined(o, s.fields.CONTACT_TYPE, r.contactType), n.addIfDefined(o, s.fields.SOURCE, r.source), o;
  }
  var n = e("ui/telemetry/people/contactTelemetryHelper"), r = e("swx-constants").COMMON, i = r.telemetry.performanceMarks.CONTACTS, s = r.telemetry.contactsV2.contactManagement;
  t.onRemoveContactStart = function () {
    n.setStart(i.REMOVE_CONTACT);
  };
  t.onRemoveContactEnd = function (e) {
    var t = o(i.REMOVE_CONTACT, s.names.REMOVE_CONTACT, e);
    n.send(t, s.TYPE);
  };
  t.onAddContactStart = function () {
    n.setStart(i.ADD_CONTACT);
  };
  t.onAddContactEnd = function (e) {
    var t = o(i.ADD_CONTACT, s.names.ADD_CONTACT, e);
    n.send(t, s.TYPE);
  };
});
