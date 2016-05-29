define("jSkype/services/keyEncryption", [
  "require",
  "jSkype/services/serviceAccessLayer/serviceLocator",
  "jSkype/services/stratus/optionsBuilder",
  "jSkype/settings",
  "constants/common"
], function (e) {
  function s() {
    function o(e) {
      var t = new n();
      return t.setOption("payload", JSON.stringify(e)), t.build();
    }
    var e = r.isFeatureOn(i.featureFlags.KEY_ENCRYPTION_SERVICE_V2_ENABLED) ? r.settings.keyEncryptionServiceHostV2 : r.settings.keyEncryptionServiceHost, s = t.build(e);
    this.decrypt = function (e) {
      return o(e).then(function (e) {
        return s.post("/key", e);
      });
    };
    this.encrypt = function (e) {
      return o(e).then(function (e) {
        return s.post("/newkey", e);
      });
    };
  }
  var t = e("jSkype/services/serviceAccessLayer/serviceLocator"), n = e("jSkype/services/stratus/optionsBuilder"), r = e("jSkype/settings"), i = e("constants/common");
  return s;
});
