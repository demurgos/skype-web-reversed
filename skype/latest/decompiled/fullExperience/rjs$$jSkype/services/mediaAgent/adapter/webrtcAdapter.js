define("jSkype/services/mediaAgent/adapter/webrtcAdapter", [
  "./webkitAdapter",
  "../userAgentAdapter"
], function (e, t) {
  function n() {
    function e() {
    }
    this.toRemote = e;
  }
  function r() {
    return typeof t.window.webkitRTCPeerConnection != "undefined";
  }
  function i() {
    return typeof t.window.mozRTCPeerConnection != "undefined";
  }
  return {
    build: function () {
      return r() ? e.build() : i() ? new n() : new n();
    }
  };
});
