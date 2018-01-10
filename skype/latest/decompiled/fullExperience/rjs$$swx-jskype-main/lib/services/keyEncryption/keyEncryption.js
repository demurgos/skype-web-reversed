(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/keyEncryption/keyEncryption", [
      "require",
      "exports",
      "../../../lib/services/serviceAccessLayer/decorations/reporting",
      "../../../lib/services/optionsBuilder",
      "swx-xhr-dispatcher",
      "jskype-settings-instance",
      "swx-constants"
    ], e);
}(function (e, t) {
  var n = e("../../../lib/services/serviceAccessLayer/decorations/reporting"), r = e("../../../lib/services/optionsBuilder"), i = e("swx-xhr-dispatcher"), s = e("jskype-settings-instance"), o = e("swx-constants"), u = function () {
      function e() {
        var e = this;
        this.isVersion2 = s.isFeatureOn(o.COMMON.featureFlags.KEY_ENCRYPTION_SERVICE_V2_ENABLED);
        this.serviceName = "KES_" + (this.isVersion2 ? "V2_" : "V1_");
        this.keyEncryptionServiceHost = this.isVersion2 ? s.settings.keyEncryptionServiceHostV2 : s.settings.keyEncryptionServiceHost;
        this.xhrDispatcher = i.build({
          host: this.keyEncryptionServiceHost,
          decorations: [n]
        });
        this.decrypt = function (t) {
          return e.buildOptions("decrypt", t).then(function (t) {
            return e.xhrDispatcher.post("/key", t);
          });
        };
        this.encrypt = function (e) {
          var t = this;
          return this.buildOptions("encrypt", e).then(function (e) {
            return t.xhrDispatcher.post("/newkey", e);
          });
        };
      }
      return e.build = function () {
        return new e();
      }, e.prototype.buildOptions = function (e, t) {
        var n = new r["default"]();
        return n.setServiceName(this.serviceName + e), n.setOption("payload", JSON.stringify(t)), n.build();
      }, e;
    }();
  return u;
}));
