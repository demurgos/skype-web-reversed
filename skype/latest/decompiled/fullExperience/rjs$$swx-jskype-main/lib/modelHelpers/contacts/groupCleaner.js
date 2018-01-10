(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/groupCleaner", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "../../../lib/modelHelpers/personsAndGroupsHelper",
      "../../../lib/modelHelpers/contacts/authorizationChange",
      "../../../lib/modelHelpers/personsRegistry/instance",
      "jskype-constants",
      "swx-mri",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function c() {
    return new l();
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("../../../lib/modelHelpers/personsAndGroupsHelper"), i = e("../../../lib/modelHelpers/contacts/authorizationChange"), s = e("../../../lib/modelHelpers/personsRegistry/instance"), o = e("jskype-constants"), u = e("swx-mri"), a = e("lodash-compat"), f = o.PEOPLE.authorizationStates, l = function () {
      function e() {
        var e = this;
        this.registry = s.build();
        this.filter = function (t) {
          var n = e.getContactsToRemove(e.getAllPersonsIdsFromRegistry(), t);
          return n.reduce(function (t, n) {
            return e.removeContact(n) ? t.concat(n) : t;
          }, []);
        };
      }
      return e.prototype.getContactsToRemove = function (e, t) {
        var n = a.map(t, function (e) {
          return u.getId(e.mri);
        });
        return a.difference(e, n);
      }, e.prototype.removeContact = function (e) {
        var t = r.getPersonById(e);
        return t ? (i.setAuthorization(t, f.UNAUTHORIZED), !0) : !1;
      }, e.prototype.getAllPersonsIdsFromRegistry = function () {
        return this.registry.filter(this.keepKnownPersons.bind(this)).map(function (e) {
          return e.id();
        });
      }, e.prototype.keepKnownPersons = function (e) {
        return !!n.get().personsAndGroupsManager.all.persons(e.id());
      }, e;
    }();
  t.GroupCleaner = l;
  t.build = c;
}));
