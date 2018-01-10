define("ui/contextMenu/items/callParticipant/pin", [
  "require",
  "swx-i18n",
  "ui/contextMenu/menuItem",
  "swx-constants",
  "ui/telemetry/actions/actionNames",
  "swx-service-locator-instance"
], function (e) {
  function o(e, u, a) {
    function c() {
      h();
      p();
    }
    function h() {
      var t = s.resolve(r.serviceLocator.PUBSUB), n = {
          participant: e,
          isScreenSharing: u,
          shouldBePinned: !a
        };
      t.publish(r.events.callScreen.PINNED_PARTICIPANT_CHANGED, n);
    }
    function p() {
      var e = s.resolve(r.serviceLocator.ACTION_TELEMETRY);
      e.recordAction(i.audioVideo.participantMenu.pin);
    }
    var f = a ? "callscreen_participantMenu_unpin" : "callscreen_participantMenu_pin", l = t.fetch({ key: f });
    n.call(this, o.TYPE, l, c);
    this.isEnabled = function () {
      return !0;
    };
  }
  var t = e("swx-i18n").localization, n = e("ui/contextMenu/menuItem"), r = e("swx-constants").COMMON, i = e("ui/telemetry/actions/actionNames"), s = e("swx-service-locator-instance").default;
  return o.prototype = Object.create(n.prototype), o.TYPE = "CallParticipantPinMenuItem", o;
});
