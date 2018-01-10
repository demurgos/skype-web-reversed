define("services/cqf/trigger", [
  "require",
  "exports",
  "module",
  "msr-crypto",
  "services/cqf/cqfSettings"
], function (e, t) {
  var n = e("msr-crypto").aes, r = e("services/cqf/cqfSettings");
  t.validateCall = function (e) {
    var t = r.build(), i;
    return i = new Promise(function (r, i) {
      t.get().then(function (t) {
        function s(e) {
          return e.hasPSTN ? t.pstnCallPercentage : e.isGroupConversation ? t.groupCallPercentage : t.skypeCallPercentage;
        }
        function o(e) {
          var t = n.utilities.stringToBytes(e), r = n.sha256.computeHash(t), i = n.utilities.bytesToInt32(r);
          return i >>> 0;
        }
        if (!e.callId || e.callEscalated)
          i();
        else if (e.duration < t.minimumCallLength)
          i();
        else {
          var u = s(e), a = o(e.callId), f = a % 100;
          f < u ? r() : i();
        }
      });
    }), i;
  };
});
