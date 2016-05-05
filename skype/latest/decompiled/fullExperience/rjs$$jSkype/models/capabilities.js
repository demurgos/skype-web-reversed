define("jSkype/models/capabilities", [
  "require",
  "jcafe-property-model"
], function (e) {
  function n() {
    this.chat = t.property({
      value: !1,
      readOnly: !0
    }), this.audio = t.property({
      value: !1,
      readOnly: !0
    }), this.video = t.property({
      value: !1,
      readOnly: !0
    }), this.groupAdd = t.property({
      value: !1,
      readOnly: !0
    }), this.screenSharing = t.property({
      value: !1,
      readOnly: !0
    }), this.dataCollaboration = t.property({
      value: !1,
      readOnly: !0
    }), this._groupChat = t.property({
      value: !1,
      readOnly: !0
    });
  }
  var t = e("jcafe-property-model");
  return n;
})
