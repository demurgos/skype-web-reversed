(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/telemetry/people/contactTelemetryHelper", [
      "require",
      "exports",
      "lodash-compat",
      "swx-jskype-internal-application-instance",
      "jskype-settings-instance",
      "jskype-constants",
      "../../modelHelpers/contacts/groupHelper",
      "swx-enums"
    ], e);
}(function (e, t) {
  function f(e) {
    r.get()._telemetryManager.traceStart(e);
  }
  function l(e) {
    return r.get()._telemetryManager.traceDump(e) || {};
  }
  function c(e, t, r) {
    if (n.isNumber(r) || n.isString(r) || n.isBoolean(r))
      e[t] = r;
  }
  function h(e, t) {
    if (n.isEmpty(e))
      return;
    r.get()._telemetryManager.sendEvent(i.settings.telemetry.jSkypeTenantToken, t, e);
  }
  function p() {
    var e = r.get().personsAndGroupsManager.all.persons(), t = {
        total: 0,
        agents: 0,
        suggested: 0,
        pending: 0,
        blocked: 0,
        favorites: 0
      };
    return n.isArray(e) && (t.total = e.length, e.forEach(function (e) {
      var n = e._authorization();
      if (n === a.PENDING_OUTGOING || n === a.PENDING_INCOMING)
        t.pending += 1;
      n === a.SUGGESTED && (t.suggested += 1);
      e.isBlocked() && (t.blocked += 1);
      e.isAgent() && (t.agents += 1);
    }), t.favorites = o.getPersonsFromGroup(u.groupType.Favorites).length), t;
  }
  var n = e("lodash-compat"), r = e("swx-jskype-internal-application-instance"), i = e("jskype-settings-instance"), s = e("jskype-constants"), o = e("../../modelHelpers/contacts/groupHelper"), u = e("swx-enums"), a = s.PEOPLE.authorizationStates;
  t.setStart = f;
  t.getTrace = l;
  t.addIfDefined = c;
  t.send = h;
  t.getAllContactTypes = p;
}));
