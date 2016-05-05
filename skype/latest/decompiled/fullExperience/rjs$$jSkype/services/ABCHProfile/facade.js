define("jSkype/services/ABCHProfile/facade", [
  "require",
  "exports",
  "module",
  "jSkype/settings"
], function (e, t) {
  function r(e, t) {
    function r(e) {
      t.setServiceName(e), t.setHeader("PS-ApplicationId", n.settings.profileService.appId);
    }
    this.getProfile = function () {
      return r("profileServiceGetProfile"), t.build().then(function (t) {
        return e.get(n.settings.profileService.profileEndpoint, t);
      });
    }, this.updatePhoneNumber = function (i) {
      var s = {
        Attributes: [{
            Edit: [{
                Name: i.number,
                Searchable: i.isSearchable,
                Country: i.cc
              }],
            Name: "PersonalContactProfile.Phones",
            Delete: null,
            Add: null
          }]
      };
      return r("profileServiceUpdatePhoneNumber"), t.setOption("payload", JSON.stringify(s)), t.setHeader("Content-Type", "application"), t.build().then(function (t) {
        return e.post(n.settings.profileService.profileEndpoint, t);
      });
    }, this.deletePhoneNumber = function (i) {
      var s = {
        Attributes: [{
            Edit: null,
            Name: "PersonalContactProfile.Phones",
            Delete: [{
                Name: i.number,
                Country: i.cc
              }],
            Add: null
          }]
      };
      return r("profileServiceDeletePhoneNumber"), t.setOption("payload", JSON.stringify(s)), t.setHeader("Content-Type", "application"), t.build().then(function (t) {
        return e.post(n.settings.profileService.profileEndpoint, t);
      });
    };
  }
  var n = e("jSkype/settings");
  t.build = function (e, t) {
    return new r(e, t);
  };
})
