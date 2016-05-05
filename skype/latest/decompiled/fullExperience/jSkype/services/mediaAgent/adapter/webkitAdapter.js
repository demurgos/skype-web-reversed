define("jSkype/services/mediaAgent/adapter/webkitAdapter", [], function () {
  function e() {
    function e(e) {
      return "RTP/SAVPF" !== e.protocol;
    }
    this.toRemote = function (t) {
      t.media.forEach(function (t) {
        !e(t) && t.port === 0 && !t.crypto && (t.crypto = [{
            id: 1,
            suite: "AES_CM_128_HMAC_SHA1_80",
            config: "inline",
            sessionConfig: "PS1uQCVeeCFCanVmcjkpPywjNWhcYD0mXXtxaVBR|2^20|1:32"
          }]);
      });
    };
  }
  return {
    build: function () {
      return new e();
    }
  };
})
