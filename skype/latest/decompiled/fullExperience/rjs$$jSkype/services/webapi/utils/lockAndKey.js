define("jSkype/services/webapi/utils/lockAndKey", [], function () {
  "use strict";
  function n() {
    var e = window.chatServerTime || new Date().getTime();
    return Math.round(e / 1000);
  }
  function r(n, r) {
    return n.getMacHash(r, e, t);
  }
  function i(t, n) {
    return "appId=" + e + "; time=" + t + "; lockAndKeyResponse=" + n;
  }
  var e = "msmsgs@msnmsgr.com", t = "Q1P7W2E4J9R8U3S5";
  return function (t) {
    this.generate = function () {
      var e = n(), s = r(t, e);
      return i(e, s);
    };
  };
});
