define("jSkype/services/callRegister", [
  "require",
  "jcafe-property-model",
  "jSkype/telemetry/logging/callingLogTracer",
  "jSkype/modelHelpers/propertyModelHelper"
], function (e) {
  function s() {
    function u(e) {
      return e.convoCallId || null;
    }
    function a(e) {
      return Boolean(u(e));
    }
    var e = this, i = {}, s = {}, o = 1;
    e.canPlaceCall = t.property({
      readOnly: !0,
      value: !0
    });
    e.canProcessIncomingCall = function (t) {
      return e.activeCalls(t) ? !0 : e.activeCalls.size() === 0 ? !0 : !1;
    };
    e.wasCallEnded = function (e) {
      return Boolean(s[u(e)]);
    };
    e.registerCall = function (r) {
      n.log("[CallRegister] Register call", r.conversationId);
      e.activeCalls._add(r, r.conversationId);
    };
    e.unregisterCall = function (r, i) {
      s.hasOwnProperty(i) && (s[i] = !0);
      n.log("[CallRegister] Unregister call", r.conversationId);
      e.activeCalls._remove(r.conversationId);
    };
    e.activeCalls = r.exposeReadOnlyCollection(t.collection());
    e.activeCalls.size.changed(function () {
      e.canPlaceCall._set(e.activeCalls.size() < o);
    });
    e.getConversationByCallId = function (t) {
      if (i.hasOwnProperty(t))
        return i[t];
    };
    e.registerCallIdMapping = function (e, t) {
      if (a(t)) {
        var r = u(t);
        return i[r] = e, s.hasOwnProperty(r) || (s[r] = !1), n.log("[CallRegister] New Call Id Registered:", r), !0;
      }
      return n.log("[CallRegister] Call Id is missing"), !1;
    };
  }
  var t = e("jcafe-property-model"), n = e("jSkype/telemetry/logging/callingLogTracer").get(), r = e("jSkype/modelHelpers/propertyModelHelper"), i;
  return {
    get: function () {
      return i = i || new s(), i;
    }
  };
});
