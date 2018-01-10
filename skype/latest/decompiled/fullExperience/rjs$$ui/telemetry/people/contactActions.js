define("ui/telemetry/people/contactActions", [
  "require",
  "exports",
  "module",
  "ui/telemetry/people/contactTelemetryHelper",
  "swx-constants"
], function (e, t) {
  function o(e, t, r) {
    var i = n.getTrace(e), r = r || {}, o = {};
    return o[s.fields.NAME] = t, o[s.fields.SUCCESS] = r.success, n.addIfDefined(o, s.fields.BEGIN_TIMESTAMP, i.startTime), n.addIfDefined(o, s.fields.ELAPSED, i.duration), n.addIfDefined(o, s.fields.CONTACT_TYPE, r.contactType), n.addIfDefined(o, s.fields.REASON, r.reason), n.addIfDefined(o, s.fields.REPORT_ABUSE, r.reportAbuse), n.addIfDefined(o, s.fields.SOURCE, r.source), o;
  }
  var n = e("ui/telemetry/people/contactTelemetryHelper"), r = e("swx-constants").COMMON, i = r.telemetry.performanceMarks.CONTACTS, s = r.telemetry.contactsV2.contactAction;
  t.onBlockContactStart = function () {
    n.setStart(i.BLOCK_CONTACT);
  };
  t.onBlockContactEnd = function (e) {
    var t = o(i.BLOCK_CONTACT, s.names.BLOCK_CONTACT, e);
    n.send(t, s.TYPE);
  };
  t.onUnblockContactStart = function () {
    n.setStart(i.UNBLOCK_CONTACT);
  };
  t.onUnblockContactEnd = function (e) {
    var t = o(i.UNBLOCK_CONTACT, s.names.UNBLOCK_CONTACT, e);
    n.send(t, s.TYPE);
  };
  t.onAddToFavoritesStart = function () {
    n.setStart(i.ADD_TO_FAVORITES);
  };
  t.onAddToFavoritesEnd = function (e) {
    var t = o(i.ADD_TO_FAVORITES, s.names.ADD_TO_FAVORITES, e);
    n.send(t, s.TYPE);
  };
  t.onRemoveFromFavoritesStart = function () {
    n.setStart(i.REMOVE_FROM_FAVORITES);
  };
  t.onRemoveFromFavoritesEnd = function (e) {
    var t = o(i.REMOVE_FROM_FAVORITES, s.names.REMOVE_FROM_FAVORITES, e);
    n.send(t, s.TYPE);
  };
});
