define("jSkype/modelHelpers/contacts/groupCleaner", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "jSkype/client",
  "jSkype/modelHelpers/personsAndGroupsHelper",
  "jSkype/constants/people",
  "jSkype/modelHelpers/contacts/authorizationChange",
  "jSkype/modelHelpers/personsRegistry/instance"
], function (e, t) {
  function a(e) {
    function u() {
      return e.filter(a).map(function (e) {
        return e.id();
      });
    }
    function a(e) {
      return !!r.get().personsAndGroupsManager.all.persons(e.id());
    }
    var t = this;
    this.filter = function (e) {
      var r = n.difference(u(), n.pluck(e, "id"));
      return r.reduce(function (e, n) {
        return t.removeContact(n) ? e.concat(n) : e;
      }, []);
    };
    this.removeContact = function (e) {
      var t = i.getPersonById(e);
      return t ? (o.setAuthorization(t, s.UNAUTHORIZED), !0) : !1;
    };
  }
  var n = e("lodash-compat"), r = e("jSkype/client"), i = e("jSkype/modelHelpers/personsAndGroupsHelper"), s = e("jSkype/constants/people").authorizationStates, o = e("jSkype/modelHelpers/contacts/authorizationChange"), u = e("jSkype/modelHelpers/personsRegistry/instance");
  t.build = function () {
    var e = u.build();
    return new a(e);
  };
});
