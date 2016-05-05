define("jSkype/services/people/facade", [
  "require",
  "exports",
  "module",
  "jSkype/settings"
], function (e, t) {
  function r(e, t) {
    function r(e) {
      t.setServiceName(e), t.setHeader("X-AppId", n.settings.peopleService.appId), t.setHeader("X-SerializeAs", "purejson");
    }
    this.getSettings = function () {
      return r("peopleServiceGetSettings"), t.build().then(function (t) {
        return e.get(n.settings.peopleService.settingsEndpoint, t);
      });
    }, this.setSettings = function (i) {
      var s = {
        Settings: [{
            Name: "Skype.AutoBuddy",
            Value: !!i
          }]
      };
      return r("peopleServiceSetSettings"), t.setOption("payload", JSON.stringify(s)), t.build().then(function (t) {
        return e.post(n.settings.peopleService.settingsEndpoint, t);
      });
    };
  }
  var n = e("jSkype/settings");
  t.build = function (e, t) {
    return new r(e, t);
  };
})
