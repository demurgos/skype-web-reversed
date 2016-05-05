define("ui/viewModels/calling/baseCallControlViewModel", [
  "require",
  "vendor/knockout",
  "utils/common/cafeObservable",
  "swx-enums"
], function (e) {
  function i(e, i) {
    var o = n.newObservableProperty(e.selfParticipant.audio.state);
    this.isCallControlEnabled = t.computed(function () {
      var e = o();
      return s(e) && (!i || i());
    }), this.isCallConnected = t.computed(function () {
      var e = o();
      return e === r.callConnectionState.Connected;
    }), this.dispose = function () {
      o.dispose(), this.isCallControlEnabled.dispose(), this.isCallConnected.dispose();
    };
  }
  function s(e) {
    return e === r.callConnectionState.Connecting || e === r.callConnectionState.Ringing || e === r.callConnectionState.EarlyMedia || e === r.callConnectionState.Connected;
  }
  var t = e("vendor/knockout"), n = e("utils/common/cafeObservable"), r = e("swx-enums");
  return i;
})
