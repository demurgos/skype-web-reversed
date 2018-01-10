(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/trouter/handlers/incomingCallMessageHandler", [
      "require",
      "exports",
      "swx-constants",
      "../../../../lib/telemetry/logging/callingLogTracer",
      "../../callController",
      "jskype-settings-instance",
      "../../../../lib/modelHelpers/propertyValidator",
      "swx-constants",
      "swx-mri"
    ], e);
}(function (e, t) {
  function p(e, t) {
    return {
      isHandled: e,
      resultCode: t
    };
  }
  function d() {
    return new h();
  }
  var n = e("swx-constants"), r = e("../../../../lib/telemetry/logging/callingLogTracer"), i = e("../../callController"), s = e("jskype-settings-instance"), o = e("../../../../lib/modelHelpers/propertyValidator"), u = e("swx-constants"), a = e("swx-mri"), f = r.get(), l = n.COMMON.events.trouter, c = n.COMMON.httpStatusCodes, h = function () {
      function e() {
        var e = this;
        this.handleMessage = function (t) {
          var n;
          f.log("Incoming trouter notification", t);
          if (!e.isSupportedNotification(t))
            return p(!1);
          if (e.isPSTNNotification(t) && !e.isPSTNSupported())
            return f.log("Rejecting due to PSTN incoming calls not enabled"), p(!0, c.preconditionFailed);
          if (e.isValidP2PNotification(t)) {
            n = e.buildP2PCallPayload(t);
            if (!n)
              return p(!0, c.unprocessableEntity);
          }
          if (e.isValidNGCNotification(t) && e.isNGCSupported()) {
            n = e.buildNGCCallPayload(t);
            if (!n)
              return p(!0, c.badRequest);
          }
          return n ? (i.handleIncoming(n), p(!0, c.OK)) : p(!0, c.unprocessableEntity);
        };
      }
      return e.prototype.isValidP2PNotification = function (e) {
        return e.eventId === l.INCOMING_SKYPE_P2P_CALL;
      }, e.prototype.isValidNGCNotification = function (e) {
        return e.eventId === l.INCOMING_SKYPE_NGC_CALL || e.eventId === l.INCOMING_SKYPE_NGC_GVC_CALL || e.eventId === l.INCOMING_LYNC_NGC_CALL || e.eventId === l.INCOMING_SKYPE_NGC_PSTN_CALL;
      }, e.prototype.isSupportedNotification = function (e) {
        return this.isValidP2PNotification(e) || this.isValidNGCNotification(e);
      }, e.prototype.isPSTNNotification = function (e) {
        return o.isPhoneNumber(e.body.callerId);
      }, e.prototype.isNGCSupported = function () {
        return s.isFeatureOn(u.COMMON.featureFlags.NG_CALLING);
      }, e.prototype.isPSTNSupported = function () {
        return s.isFeatureOn(u.COMMON.featureFlags.PSTN_ENABLED);
      }, e.prototype.buildP2PCallPayload = function (e) {
        var t = {
            evt: e.body.evt,
            callerId: e.body.callerId,
            displayName: e.body.displayName,
            conversationId: undefined,
            convoCallId: e.body.convoCallId,
            nsp: e.body.nsp,
            body: { gp: e.body.gp }
          }, n = e.body.conversationId || e.body.callerId;
        return n ? (t.conversationId = a.getKey(n), f.log("Incoming P2P payload", t), t) : (f.log("Rejecting due to missing conversationId in payload"), null);
      }, e.prototype.buildNGCCallPayload = function (e) {
        var t;
        try {
          var n = atob(e.body.gp);
          t = JSON.parse(n);
        } catch (r) {
          return f.error("Error when parsing gp payload", e.body.gp), null;
        }
        if (t.callNotification) {
          var i = {
            conversationId: t.groupChat && t.groupChat.threadId ? t.groupChat.threadId : t.callNotification.from.id,
            callerId: a.getId(t.callNotification.from.id),
            convoCallId: t.debugContent.callId,
            ngcCall: !0,
            nsp: e.body.nsp || "",
            body: e.body,
            evt: e.body.evt
          };
          return f.log("Incoming NGC payload", i), i;
        }
        return f.log("Unable to create incoming NGC payload"), null;
      }, e;
    }();
  t.MessageHandler = h;
  t.build = d;
}));
