define("ui/contextMenu/items/callParticipant/zoom", [
  "require",
  "swx-i18n",
  "ui/contextMenu/menuItem",
  "swx-constants",
  "ui/telemetry/actions/actionNames",
  "swx-service-locator-instance"
], function (e) {
  function o(e, u) {
    function l() {
      c();
      h();
    }
    function c() {
      u() && e(!e());
    }
    function h() {
      var e = s.resolve(r.serviceLocator.ACTION_TELEMETRY);
      e.recordAction(i.audioVideo.participantMenu.zoom);
    }
    var a = e() ? "callscreen_participantMenu_zoomOut" : "callscreen_participantMenu_zoomIn", f = t.fetch({ key: a });
    n.call(this, o.TYPE, f, l);
    this.isEnabled = function () {
      return !0;
    };
  }
  var t = e("swx-i18n").localization, n = e("ui/contextMenu/menuItem"), r = e("swx-constants").COMMON, i = e("ui/telemetry/actions/actionNames"), s = e("swx-service-locator-instance").default;
  return o.prototype = Object.create(n.prototype), o.TYPE = "CallParticipantZoomMenuItem", o;
});
