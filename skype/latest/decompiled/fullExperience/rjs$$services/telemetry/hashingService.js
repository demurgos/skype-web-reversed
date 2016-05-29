define("services/telemetry/hashingService", [
  "require",
  "msr-crypto"
], function (e) {
  function n() {
    this.getHash = function (e) {
      var n = t.utilities.stringToBytes(e), r = t.sha256.computeHash(n);
      return t.utilities.bytesToHexString(r);
    };
  }
  var t = e("msr-crypto").aes;
  return new n();
});
