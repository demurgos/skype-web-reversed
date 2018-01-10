(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/participantChat", [
      "require",
      "exports",
      "jcafe-property-model",
      "swx-enums",
      "swx-constants"
    ], e);
}(function (e, t) {
  function u(e) {
    return new o(e);
  }
  var n = e("jcafe-property-model"), r = e("swx-enums"), i = e("swx-constants"), s = i.COMMON.isTyping, o = function () {
      function e(e) {
        var t = this;
        this.state = n.property({
          readOnly: !0,
          value: r.callConnectionState.Disconnected
        });
        this.isTyping = n.property({
          readOnly: !0,
          value: !1
        });
        this.onChatModalityChanged = function (e) {
          t.state._set(e ? r.callConnectionState.Connected : r.callConnectionState.Disconnected);
        };
        this._setIsTyping = function (e) {
          clearTimeout(t.isTypingTimeout);
          t.isTyping._set(e);
          t.isTyping && (t.isTypingTimeout = setTimeout(t.expireIsTyping.bind(t), s.EXPIRY));
        };
        this._dispose = function () {
          clearTimeout(t.isTypingTimeout);
          t.conversation.activeModalities.chat.changed.off(t.onChatModalityChanged);
        };
        this.conversation = e;
        e.activeModalities.chat.changed(this.onChatModalityChanged);
      }
      return e.prototype.expireIsTyping = function () {
        this.isTyping._set(!1);
      }, e;
    }();
  t.ParticipantChat = o;
  t.build = u;
}));
