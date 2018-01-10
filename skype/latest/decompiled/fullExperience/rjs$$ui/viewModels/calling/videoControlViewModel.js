define("ui/viewModels/calling/videoControlViewModel", [
  "require",
  "ui/viewModels/calling/baseCallControlViewModel",
  "vendor/knockout",
  "swx-enums",
  "utils/common/cafeObservable",
  "swx-i18n",
  "swx-cafe-application-instance",
  "ui/telemetry/actions/actionNames",
  "swx-constants",
  "ui/modelHelpers/personHelper",
  "swx-service-locator-instance"
], function (e) {
  function c(e) {
    function g(e) {
      e.stream.state.changed(p);
      e.isStarted.set.enabled.changed(function (e) {
        m = e;
        y();
      });
    }
    function y() {
      h(e.videoService.start.enabled() || m);
    }
    function b() {
      var t = e.participants();
      v(t.length === 1 && f.isEchoContact(t[0].person));
    }
    function w(t) {
      e.selfParticipant.video.channels(0).isStarted(t);
    }
    var c = this, h = n.observable(!1), p = n.observable(), d = i.newObservableProperty(o.get().devicesManager.selectedCamera), v = n.observable(!1), m = !1;
    e.videoService.start.enabled.changed(y);
    e.participants.changed(b);
    t.call(c, e, h);
    c.isLocalVideoAvailable = n.computed(function () {
      return d() !== null;
    });
    c.isLocalVideoOn = n.computed(function () {
      return p && c.isLocalVideoAvailable() && !!p() && p() !== r.mediaStreamState.Stopped;
    });
    c.isLocalVideoButtonEnabled = n.computed(function () {
      return c.isLocalVideoAvailable() && c.isCallControlEnabled() && !v();
    });
    c.videoStateText = n.computed(function () {
      return c.isLocalVideoOn() ? s.fetch({ key: "callscreen_text_videoOff" }) : s.fetch({ key: "callscreen_text_videoOn" });
    });
    c.toggleVideo = function () {
      if (!c.isLocalVideoButtonEnabled())
        return;
      var t = l.resolve(a.serviceLocator.ACTION_TELEMETRY);
      t.recordAction(u.audioVideo.toggleVideo);
      c.isLocalVideoOn() ? w(!1) : e.selfParticipant.video.state() === r.callConnectionState.Disconnected && e.videoService.start.enabled() ? e.videoService.start().then(function () {
        w(!0);
      }) : w(!0);
    };
    c.dispose = function () {
      d.dispose();
      c.videoStateText.dispose();
      e.selfParticipant.video.channels.added.off(g);
      e.participants.changed.off(b);
      e.videoService.start.enabled.changed.off(y);
    };
    e.selfParticipant.video.channels.added(g);
  }
  var t = e("ui/viewModels/calling/baseCallControlViewModel"), n = e("vendor/knockout"), r = e("swx-enums"), i = e("utils/common/cafeObservable"), s = e("swx-i18n").localization, o = e("swx-cafe-application-instance"), u = e("ui/telemetry/actions/actionNames"), a = e("swx-constants").COMMON, f = e("ui/modelHelpers/personHelper"), l = e("swx-service-locator-instance").default;
  return c.prototype = Object.create(t.prototype), c.prototype.constructor = c, {
    build: function (e) {
      return new c(e);
    }
  };
});
