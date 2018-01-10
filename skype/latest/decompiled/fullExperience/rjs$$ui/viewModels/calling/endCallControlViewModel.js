define("ui/viewModels/calling/endCallControlViewModel", [
  "require",
  "ui/viewModels/calling/baseCallControlViewModel",
  "ui/telemetry/actions/actionNames",
  "swx-constants",
  "swx-service-locator-instance",
  "ui/calling/unansweredCallHandler"
], function (e) {
  function o(e, o) {
    function u() {
      var e = i.resolve(r.serviceLocator.ACTION_TELEMETRY), t = o ? n.audioVideo.endCall : n.audioVideo.timeline.endCall;
      e.recordAction(t);
    }
    t.call(this, e);
    this.endCall = function () {
      e.audioService.stop();
      s.callHungUpByCaller();
      u();
    };
  }
  var t = e("ui/viewModels/calling/baseCallControlViewModel"), n = e("ui/telemetry/actions/actionNames"), r = e("swx-constants").COMMON, i = e("swx-service-locator-instance").default, s = e("ui/calling/unansweredCallHandler");
  return o.prototype = Object.create(t.prototype), o.prototype.constructor = o, {
    build: function (e, t) {
      return new o(e, t);
    }
  };
});
