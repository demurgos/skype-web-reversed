(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/capabilities", [
      "require",
      "exports",
      "jcafe-property-model"
    ], e);
}(function (e, t) {
  var n = e("jcafe-property-model"), r = function () {
      function e() {
        this.chat = n.property({
          value: !1,
          readOnly: !0
        });
        this.audio = n.property({
          value: !1,
          readOnly: !0
        });
        this.video = n.property({
          value: !1,
          readOnly: !0
        });
        this.groupAdd = n.property({
          value: !1,
          readOnly: !0
        });
        this.screenSharing = n.property({
          value: !1,
          readOnly: !0
        });
        this.dataCollaboration = n.property({
          value: !1,
          readOnly: !0
        });
        this._groupChat = n.property({
          value: !1,
          readOnly: !0
        });
        this._gvc = n.property({
          value: !1,
          readOnly: !0
        });
        this._fileSend = n.property({
          value: !1,
          readOnly: !0
        });
        this._contactSend = n.property({
          value: !1,
          readOnly: !0
        });
        this._videoMessageSend = n.property({
          value: !1,
          readOnly: !0
        });
        this._audioMessageSend = n.property({
          value: !1,
          readOnly: !0
        });
        this._mediaMessageSend = n.property({
          value: !1,
          readOnly: !0
        });
        this._annotationSend = n.property({
          value: !1,
          readOnly: !0
        });
        this._photoSend = n.property({
          value: !1,
          readOnly: !0
        });
        this._mojiSend = n.property({
          value: !1,
          readOnly: !0
        });
        this._locationSend = n.property({
          value: !1,
          readOnly: !0
        });
        this._mediaAutoplay = n.property({
          value: !1,
          readOnly: !0
        });
      }
      return e;
    }();
  t.__esModule = !0;
  t["default"] = r;
}));
