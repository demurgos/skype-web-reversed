function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("msr-crypto/lib/index", [
      "require",
      "exports",
      "./msrcrypto.aes",
      "./sha256Auth"
    ], e);
}(function (e, t) {
  t.aes = e("./msrcrypto.aes"), t.sha256Auth = e("./sha256Auth");
})
