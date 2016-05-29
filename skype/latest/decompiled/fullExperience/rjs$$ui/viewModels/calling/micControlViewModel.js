define("ui/viewModels/calling/micControlViewModel", [
  "require",
  "ui/viewModels/calling/baseCallControlViewModel",
  "vendor/knockout",
  "utils/common/cafeObservable",
  "swx-i18n",
  "cafe/applicationInstance",
  "utils/common/eventHelper",
  "ui/telemetry/actions/actionNames",
  "constants/common",
  "services/serviceLocator"
], function (e) {
  function l(e, l) {
    function v() {
      var e = f.resolve(a.serviceLocator.ACTION_TELEMETRY), t = l ? u.audioVideo.toggleMute : u.audioVideo.timeline.toggleMute;
      e.recordAction(t);
    }
    var c = this, h = r.newObservableProperty(s.get().devicesManager.selectedMicrophone), p = r.newObservableProperty(e.selfParticipant.audio.isMuted), d = r.newObservableProperty(e.selfParticipant.audio.isMuted.set.enabled);
    t.call(c, e, d);
    c.isMicrophoneAvailable = n.computed(function () {
      return h() !== null;
    });
    c.isMicrophoneOn = n.computed(function () {
      return c.isMicrophoneAvailable() && !p();
    });
    c.microphoneStateText = n.computed(function () {
      return c.isMicrophoneOn() ? i.fetch({ key: "callscreen_text_microphoneOff" }) : i.fetch({ key: "callscreen_text_microphoneOn" });
    });
    c.isMicrophoneButtonEnabled = n.computed(function () {
      return c.isMicrophoneAvailable() && c.isCallControlEnabled();
    });
    c.toggleMicrophone = function (t, n) {
      c.isMicrophoneButtonEnabled() && (e.selfParticipant.audio.isMuted(c.isMicrophoneOn()), v());
      o.swallow(n);
    };
    c.dispose = function () {
      h.dispose();
      c.microphoneStateText.dispose();
      p.dispose();
    };
  }
  var t = e("ui/viewModels/calling/baseCallControlViewModel"), n = e("vendor/knockout"), r = e("utils/common/cafeObservable"), i = e("swx-i18n").localization, s = e("cafe/applicationInstance"), o = e("utils/common/eventHelper"), u = e("ui/telemetry/actions/actionNames"), a = e("constants/common"), f = e("services/serviceLocator");
  return l.prototype = Object.create(t.prototype), l.prototype.constructor = l, {
    build: function (e, t) {
      return new l(e, t);
    }
  };
});
