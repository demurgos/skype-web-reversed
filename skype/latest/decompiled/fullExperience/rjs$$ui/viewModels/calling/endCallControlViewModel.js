define("ui/viewModels/calling/endCallControlViewModel", [
  "require",
  "vendor/knockout",
  "ui/viewModels/calling/baseCallControlViewModel",
  "ui/telemetry/actions/actionNames",
  "constants/common",
  "services/serviceLocator"
], function (e) {
  function o(e, o) {
    function u() {
      var e = s.resolve(i.serviceLocator.ACTION_TELEMETRY), t = o ? r.audioVideo.endCall : r.audioVideo.timeline.endCall;
      e.recordAction(t);
    }
    n.call(this, e);
    this.endCall = function () {
      e.audioService.stop();
      u();
    };
    this.isButtonFocused = t.observable(!0);
  }
  var t = e("vendor/knockout"), n = e("ui/viewModels/calling/baseCallControlViewModel"), r = e("ui/telemetry/actions/actionNames"), i = e("constants/common"), s = e("services/serviceLocator");
  return o.prototype = Object.create(n.prototype), o.prototype.constructor = o, {
    build: function (e, t) {
      return new o(e, t);
    }
  };
});
