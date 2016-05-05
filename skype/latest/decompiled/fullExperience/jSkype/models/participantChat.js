define("jSkype/models/participantChat", [
  "require",
  "exports",
  "module",
  "jcafe-property-model",
  "swx-enums",
  "constants/common"
], function (e, t) {
  function s(e) {
    function o(e) {
      t.state._set(e ? r.Connected : r.Disconnected);
    }
    function u() {
      t.isTyping._set(!1);
    }
    var t = this, s;
    this.state = n.property({
      readOnly: !0,
      value: r.Disconnected
    }), this.isTyping = n.property({
      readOnly: !0,
      value: !1
    }), e.activeModalities.chat.changed(o), this._setIsTyping = function (e) {
      clearTimeout(s), t.isTyping._set(e), e && (s = setTimeout(u, i.EXPIRY));
    }, this._dispose = function () {
      clearTimeout(s), e.activeModalities.chat.changed.off(o);
    };
  }
  var n = e("jcafe-property-model"), r = e("swx-enums").callConnectionState, i = e("constants/common").isTyping;
  t.build = function (e) {
    return new s(e);
  };
})
