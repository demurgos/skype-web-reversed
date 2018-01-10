(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/telemetry/callInfoTelemetry", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "jskype-settings-instance",
      "swx-mri/lib/mriMaps",
      "swx-enums",
      "swx-utils-common",
      "swx-constants",
      "swx-util-calling-stack",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function h(e, t) {
    return a.get().isInBrowserCallingSupported() ? new c(e, t) : {
      dispose: function () {
      }
    };
  }
  function p(e, t) {
    return l[e.conversationId] || (l[e.conversationId] = h(e, t)), l[e.conversationId];
  }
  function d(e) {
    l[e.conversationId] && (l[e.conversationId].dispose(), delete l[e.conversationId]);
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("jskype-settings-instance"), i = e("swx-mri/lib/mriMaps"), s = e("swx-enums"), o = e("swx-utils-common"), u = e("swx-constants"), a = e("swx-util-calling-stack"), f = e("lodash-compat"), l = {}, c = function () {
      function e(e, t) {
        var r = this;
        this.contactTypes = f.invert(i.contactTypes);
        this.callCorrelationId = o.guid.create();
        this.telemetryManager = n.get()._telemetryManager;
        this.dispose = function () {
          r.connectedSubscription.dispose();
        };
        this.conversation = e;
        this.direction = t;
        this.connectedSubscription = e.selfParticipant.audio.state.once(s.callConnectionState.Connected, function () {
          r.sendCallInfoEvent(u.COMMON.telemetry.calling.CONNECTED_CALL);
        });
      }
      return e.prototype.sendCallInfoEvent = function (e) {
        var t = f.extend({
          callCorrelationId: this.callCorrelationId,
          name: u.COMMON.telemetry.calling.CALL_INFO,
          callState: e,
          direction: this.direction,
          isGroupCall: this.conversation.isGroupConversation(),
          callTechnology: this.conversation._callData.callTechnology(),
          isHostless: this.conversation._callData.isHostless
        }, this.getParticipantsCountPerType());
        this.telemetryManager.sendEvent(r.settings.telemetry.jSkypeTenantToken, u.COMMON.telemetry.calling.MASTER_EVENT, t);
      }, e.prototype.getParticipantsCountPerType = function () {
        var e = this, t = u.COMMON.telemetry.calling.PARTICIPANTS_COUNT_PREFIX, n = {}, r = this.conversation.participants().map(function (t) {
            return e.contactTypes[t.person._type()] || u.COMMON.telemetry.calling.UNKNOWN_CONTACT_TYPE;
          });
        return r.forEach(function (e) {
          n.hasOwnProperty(t + e) ? n[t + e] += 1 : n[t + e] = 1;
        }), n;
      }, e;
    }();
  t.CallInfoTelemetry = c;
  t.build = p;
  t.dispose = d;
}));
