define("jSkype/services/mediaAgent/capabilities", ["./userAgentAdapter"], function (e) {
  function t(t) {
    function r() {
      return typeof n.RTCPeerConnection != "undefined";
    }
    function i() {
      return typeof n.RTCIceGatherer != "undefined";
    }
    function s() {
      return !!n.navigator.getUserMedia;
    }
    function o(e, n) {
      return t.settings.capabilities && typeof t.settings.capabilities[e] != "undefined" ? t.settings.capabilities[e] : n;
    }
    var n = e.window;
    this.audio = !!o("audio", s() && (i() || r())), this.video = !!o("video", s() && i());
  }
  return {
    build: function (e) {
      return new t(e);
    }
  };
})
