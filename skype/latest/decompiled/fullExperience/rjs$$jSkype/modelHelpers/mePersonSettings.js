define("jSkype/modelHelpers/mePersonSettings", [
  "require",
  "exports",
  "module",
  "jSkype/client",
  "jSkype/services/serviceFactory",
  "swx-enums",
  "jSkype/modelHelpers/personsAndGroupsHelper",
  "jSkype/modelHelpers/contacts/dataHandlers/factory"
], function (e, t) {
  function u() {
    function u(e) {
      if (e === i.selfSettings.autoBuddy) {
        var t, u = o.getPeopleSettingsHandlers();
        return t = r.getPeopleService().getSettings().then(u.onSuccess, u.onError), t.then(a.bind(null, e), a.bind(null, e, !1)), t;
      }
      return e === i.selfSettings.linkedMSA ? new Promise(function (t) {
        n.get().signInManager._skypeToken().then(function (n) {
          var r = !1, i = s.extractCIDFromToken(n);
          i !== undefined && (r = !0);
          a(e, r);
          t(r);
        });
      }) : Promise.reject("Key not recognized");
    }
    function a(e, n) {
      t[e] = n;
    }
    var e = this, t = {};
    e.get = function (e) {
      return typeof t[e] != "undefined" ? Promise.resolve(t[e]) : u(e);
    };
  }
  var n = e("jSkype/client"), r = e("jSkype/services/serviceFactory"), i = e("swx-enums"), s = e("jSkype/modelHelpers/personsAndGroupsHelper"), o = e("jSkype/modelHelpers/contacts/dataHandlers/factory");
  t.build = function () {
    return new u();
  };
});
