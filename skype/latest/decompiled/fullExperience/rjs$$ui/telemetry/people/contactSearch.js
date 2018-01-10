define("ui/telemetry/people/contactSearch", [
  "require",
  "exports",
  "module",
  "ui/telemetry/people/contactTelemetryHelper",
  "swx-enums",
  "swx-constants"
], function (e, t) {
  function u(e) {
    var t = n.getTrace(s.SEARCH_CONTACT), r = {};
    if (!a(t) || !f(e))
      return;
    r[o.fields.NAME] = l(e.searchScope);
    r[o.fields.SUCCESS] = e.success;
    if (!r[o.fields.NAME])
      return;
    return n.addIfDefined(r, o.fields.BEGIN_TIMESTAMP, t.startTime), n.addIfDefined(r, o.fields.ELAPSED, t.duration), n.addIfDefined(r, o.fields.QUERY_ID, e.queryId), n.addIfDefined(r, o.fields.RESULT_COUNT, e.resultCount), n.addIfDefined(r, o.fields.CLICK_POSITION, e.clickPosition), n.addIfDefined(r, o.fields.SOURCE, e.source), r;
  }
  function a(e) {
    return e && e.startTime && e.duration;
  }
  function f(e) {
    return e && e.searchScope && e.success !== undefined;
  }
  function l(e) {
    return e === r.searchScope.AddressBook ? o.names.SEARCH_ADDRESSBOOK : e === r.searchScope.SkypeDirectory ? o.names.SEARCH_DIRECTORY : e === r.searchScope.Groups ? o.names.SEARCH_GROUPS : e;
  }
  var n = e("ui/telemetry/people/contactTelemetryHelper"), r = e("swx-enums"), i = e("swx-constants").COMMON, s = i.telemetry.performanceMarks.CONTACTS, o = i.telemetry.contactsV2.contactSearch;
  t.onContactSearchStart = function () {
    n.setStart(s.SEARCH_CONTACT);
  };
  t.onContactSearchEnd = function (e) {
    var t = u(e);
    n.send(t, o.TYPE);
  };
});
