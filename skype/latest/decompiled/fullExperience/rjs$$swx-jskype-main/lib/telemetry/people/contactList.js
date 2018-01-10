(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/telemetry/people/contactList", [
      "require",
      "exports",
      "./contactTelemetryHelper",
      "swx-constants"
    ], e);
}(function (e, t) {
  function o() {
    n.setStart(i.LIST_LOAD);
  }
  function u(e) {
    var t = a(i.LIST_LOAD, s.names.QUERY_CONTACT_LIST, e);
    n.send(t, s.TYPE);
  }
  function a(e, t, r) {
    var i = n.getTrace(e), r = r || {}, o = {};
    o[s.fields.NAME] = t;
    o[s.fields.SUCCESS] = r.success;
    o[s.fields.INITIAL_LOAD] = r.firstLoad;
    n.addIfDefined(o, s.fields.SERVICE_ELAPSED, r.serviceElapsed);
    n.addIfDefined(o, s.fields.BEGIN_TIMESTAMP, i.startTime);
    n.addIfDefined(o, s.fields.ELAPSED, i.duration);
    if (r.success) {
      var u = n.getAllContactTypes();
      o[s.fields.FULL_FETCH] = r.isFullFetch;
      o[s.fields.NUM_CONTACTS] = u.total;
      o[s.fields.NUM_AGENTS] = u.agents;
      o[s.fields.NUM_SUGGESTED] = u.suggested;
      o[s.fields.NUM_PENDING] = u.pending;
      o[s.fields.NUM_BLOCKED] = u.blocked;
      o[s.fields.NUM_FAVOURITES] = u.favorites;
    }
    return o;
  }
  var n = e("./contactTelemetryHelper"), r = e("swx-constants"), i = r.COMMON.telemetry.performanceMarks.CONTACTS, s = r.COMMON.telemetry.contactsV2.contactList;
  t.onQueryContactListStart = o;
  t.onQueryContactListEnd = u;
}));
