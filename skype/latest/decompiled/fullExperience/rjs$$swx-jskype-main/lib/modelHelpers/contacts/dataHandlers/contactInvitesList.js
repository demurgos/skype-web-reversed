(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataHandlers/contactInvitesList", [
      "require",
      "exports",
      "../../../../lib/modelHelpers/contacts/dataProcessors/contactInvitesList",
      "../../../../lib/telemetry/people/contactInvitation",
      "swx-utils-common",
      "../../../../lib/services/contactsV2/instance",
      "swx-jskype-internal-application-instance",
      "swx-constants",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function c(e) {
    var t;
    return e && e.response && (t = n.process(e.response), r.onQueryInvitationListEnd({
      success: !0,
      invitationCount: a.size(e.response),
      serviceElapsed: e.duration
    }), p(e)), t || Promise.resolve();
  }
  function h(e) {
    r.onQueryInvitationListEnd({ success: !1 });
  }
  function p(e) {
    if (v(e)) {
      var t = m(e);
      t && a.delay(d, t * 1000);
    }
  }
  function d() {
    r.onQueryInvitationListStart();
    s.get().getInvites(o.get().personsAndGroupsManager.mePerson.id()).then(c, h);
  }
  function v(e) {
    return e.request.status === f.OK;
  }
  function m(e) {
    var n;
    try {
      n = l.getResponseHeader(e, t.RETRY_AFTER_HEADER);
      n = n && parseInt(n, 10);
    } catch (r) {
    }
    return n || null;
  }
  var n = e("../../../../lib/modelHelpers/contacts/dataProcessors/contactInvitesList"), r = e("../../../../lib/telemetry/people/contactInvitation"), i = e("swx-utils-common"), s = e("../../../../lib/services/contactsV2/instance"), o = e("swx-jskype-internal-application-instance"), u = e("swx-constants"), a = e("lodash-compat"), f = u.COMMON.httpStatusCodes, l = i.http;
  t.RETRY_AFTER_HEADER = "Retry-after";
  t.onSuccess = c;
  t.onError = h;
}));
