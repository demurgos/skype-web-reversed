define("jSkype/services/trouter/handlers/incomingCallMessageHandler", [
  "require",
  "exports",
  "module",
  "jSkype/modelHelpers/personHelper",
  "constants/common",
  "jSkype/telemetry/logging/callingLogTracer",
  "jSkype/services/calling/incomingCallMessageProxy",
  "jSkype/settings",
  "jSkype/modelHelpers/propertyValidator",
  "constants/common"
], function (e, t) {
  function c() {
    function t(e) {
      return e.eventId === i.INCOMING_CALL;
    }
    function r(e) {
      return e.eventId === i.INCOMING_SKYPE_NGC_CALL || e.eventId === i.INCOMING_SKYPE_NGC_GVC_CALL || e.eventId === i.INCOMING_LYNC_NGC_CALL;
    }
    function c(e) {
      return t(e) || r(e);
    }
    function p(e) {
      return f.isPhoneNumber(e.body.callerId);
    }
    function d() {
      return a.isFeatureOn(l.featureFlags.NG_CALLING);
    }
    function v() {
      return a.isFeatureOn(l.featureFlags.PSTN_ENABLED);
    }
    function m(e) {
      var t = {
          evt: e.body.evt,
          callerId: e.body.callerId,
          displayName: e.body.displayName,
          convoCallId: e.body.convoCallId,
          nsp: e.body.nsp,
          body: { gp: e.body.gp }
        }, r = e.body.conversationId || e.body.callerId;
      return r ? (t.conversationId = n.getKey(r), o.log("Incoming P2P payload", t), t) : (o.log("Rejecting due to missing conversationId in payload"), !1);
    }
    function g(e) {
      var t = {}, r, i;
      try {
        r = atob(e.body.gp);
        i = JSON.parse(r);
      } catch (s) {
        return o.error("Error when parsing gp payload", e.body.gp), !1;
      }
      return i.callNotification ? (t.conversationId = i.groupChat && i.groupChat.threadId ? i.groupChat.threadId : i.callNotification.from.id, t.callerId = n.getId(i.callNotification.from.id), t.convoCallId = i.debugContent.callId, t.ngcCall = !0, t.nsp = e.body.nsp || "", t.body = e.body, t.evt = e.body.evt, o.log("Incoming NGC payload", t), t) : (o.log("Unable to create incoming NGC payload"), !1);
    }
    var e = u.build();
    this.handleMessage = function (n) {
      var i;
      o.log("Incoming trouter notification", n);
      if (!c(n))
        return h(!1);
      if (p(n) && !v())
        return o.log("Rejecting due to PSTN incoming calls not enabled"), h(!0, s.preconditionFailed);
      if (t(n)) {
        i = m(n);
        if (!i)
          return h(!0, s.unprocessableEntity);
      }
      if (r(n) && d()) {
        i = g(n);
        if (!i)
          return h(!0, s.badRequest);
      }
      return i ? (e.handleMessage(i), h(!0, s.OK)) : h(!0, s.unprocessableEntity);
    };
  }
  function h(e, t) {
    return {
      isHandled: e,
      resultCode: t
    };
  }
  var n = e("jSkype/modelHelpers/personHelper"), r = e("constants/common"), i = r.events.trouter, s = r.httpStatusCodes, o = e("jSkype/telemetry/logging/callingLogTracer").get(), u = e("jSkype/services/calling/incomingCallMessageProxy"), a = e("jSkype/settings"), f = e("jSkype/modelHelpers/propertyValidator"), l = e("constants/common");
  t.build = function () {
    return new c();
  };
});
