(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/callRegister", [
      "require",
      "exports",
      "../../lib/telemetry/logging/callingLogTracer",
      "../../lib/modelHelpers/propertyModelHelper",
      "jcafe-property-model",
      "swx-enums"
    ], e);
}(function (e, t) {
  function l() {
    return f = f || new a(), f;
  }
  var n = e("../../lib/telemetry/logging/callingLogTracer"), r = e("../../lib/modelHelpers/propertyModelHelper"), i = e("jcafe-property-model"), s = e("swx-enums"), o = n.get(), u = 1, a = function () {
      function e() {
        var e = this;
        this.conversationsByCallId = {};
        this.endedCalls = {};
        this.canPlaceCall = i.property({
          readOnly: !0,
          value: !0
        });
        this.activeCalls = r.exposeReadOnlyCollection(i.collection());
        this.canProcessIncomingCall = function (t) {
          return e.activeCalls(t) ? !0 : e.activeCalls.size() === 0 ? !0 : !1;
        };
        this.wasCallEnded = function (t) {
          return Boolean(e.endedCalls[e.getCallId(t)]);
        };
        this.registerCall = function (t) {
          o.log("[CallRegister] Register call", t.conversationId);
          e.activeCalls._add(t, t.conversationId);
        };
        this.unregisterCall = function (t, n) {
          o.log("[CallRegister] Unregister call", t.conversationId);
          e.endedCalls.hasOwnProperty(n) && (e.endedCalls[n] = !0);
          e.activeCalls._remove(t.conversationId);
          e.conversationsByCallId.hasOwnProperty(n) && delete e.conversationsByCallId[n];
        };
        this.getConversationByCallId = function (t) {
          if (e.conversationsByCallId.hasOwnProperty(t))
            return e.conversationsByCallId[t];
        };
        this.registerCallIdMapping = function (t, n) {
          if (e.hasCallId(n)) {
            var r = e.getCallId(n);
            return e.conversationsByCallId[r] = t, e.endedCalls.hasOwnProperty(r) || (e.endedCalls[r] = !1), o.log("[CallRegister] New Call Id Registered:", r), !0;
          }
          return o.log("[CallRegister] Call Id is missing"), !1;
        };
        this.hasConnectedCall = function () {
          return e.activeCalls().some(function (e) {
            return e.selfParticipant.audio.state() === s.callConnectionState.Connected;
          });
        };
        this.activeCalls.size.changed(function () {
          e.canPlaceCall._set(e.activeCalls.size() < u);
        });
      }
      return e.prototype.getCallId = function (e) {
        return e.convoCallId || null;
      }, e.prototype.hasCallId = function (e) {
        return Boolean(this.getCallId(e));
      }, e;
    }();
  t.CallRegister = a;
  var f;
  t.get = l;
}));
