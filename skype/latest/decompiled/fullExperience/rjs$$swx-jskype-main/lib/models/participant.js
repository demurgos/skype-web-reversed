(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/participant", [
      "require",
      "exports",
      "jcafe-property-model",
      "swx-enums",
      "../../lib/models/participantAudio",
      "../../lib/models/participantVideo",
      "../../lib/models/participantChat",
      "swx-mri",
      "../../lib/models/participantScreenSharing"
    ], e);
}(function (e, t) {
  function f(e) {
    return /^guest:/.test(e);
  }
  function l(e) {
    return e.chat.state() === r.callConnectionState.Disconnected && e.audio.state() === r.callConnectionState.Disconnected && e.video.state() === r.callConnectionState.Disconnected && e.screenSharing.state() === r.callConnectionState.Disconnected ? r.participantState.Disconnected : r.participantState.Connected;
  }
  var n = e("jcafe-property-model"), r = e("swx-enums"), i = e("../../lib/models/participantAudio"), s = e("../../lib/models/participantVideo"), o = e("../../lib/models/participantChat"), u = e("swx-mri"), a = e("../../lib/models/participantScreenSharing"), c = function () {
      function e(e, t, u) {
        var c = this;
        this.lastReadTimestamp = n.property({
          readOnly: !0,
          value: null
        });
        this.updateParticipantState = function () {
          c.state._set(l(c));
        };
        this.updateIsAnonymous = function (e) {
          c.isAnonymous._set(f(e));
        };
        this.updateParticipantScreenSharingCapability = function (e) {
          var t = /^(\+)?\d+$/.test(e);
          c.person.capabilities.screenSharing._set(!t);
        };
        this._dispose = function () {
          c.chat.state.changed.off(c.updateParticipantState);
          c.audio.state.changed.off(c.updateParticipantState);
          c.video.state.changed.off(c.updateParticipantState);
          c.screenSharing.state.changed.off(c.updateParticipantState);
          c.conversation.selfParticipant.role.changed.off(c.onSelfParticipantRoleChanged);
          c.chat._dispose();
          c.audio._dispose();
          c.video._dispose();
          c.screenSharing._dispose();
          c.person.id.changed.off(c.updateIsAnonymous);
          c.audio.endpoint.changed.off(c.updateParticipantScreenSharingCapability);
        };
        this.onSelfParticipantRoleChanged = function (e) {
          c.canSetRole(e === r.participantRole.Leader);
        };
        this.apiHandler = u;
        this.conversation = t;
        this.person = e;
        this.canSetRole = n.boolProperty(t.selfParticipant && t.selfParticipant.role() === r.participantRole.Leader);
        this.setRoleCommand = n.command(this.setRole.bind(this), this.canSetRole);
        this.role = n.property({
          value: r.participantRole.Attendee,
          set: this.setRoleCommand
        });
        this.isAnonymous = n.property({
          readOnly: !0,
          value: f(e.id())
        });
        t.selfParticipant && t.selfParticipant.role.changed(this.onSelfParticipantRoleChanged);
        this.chat = o.build(t);
        this.audio = i.build(t, e);
        this.video = s.build(t, e);
        this.screenSharing = a.build(t, e);
        this.state = n.property({
          readOnly: !0,
          value: l(this)
        });
        this.chat.state.changed(this.updateParticipantState);
        this.audio.state.changed(this.updateParticipantState);
        this.video.state.changed(this.updateParticipantState);
        this.screenSharing.state.changed(this.updateParticipantState);
        e.id.changed(this.updateIsAnonymous.bind(this));
        this.person.phoneNumbers.size() && this.audio.endpoint.changed(this.updateParticipantScreenSharingCapability.bind(this));
      }
      return e.prototype.setRole = function (e) {
        return this.role() === e || !r.participantRole[e] ? this.role() : (this.apiHandler.addParticipant(this.conversation.conversationId, u.getKey(this.person.id(), this.person._type()), e), e);
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = c;
}));
