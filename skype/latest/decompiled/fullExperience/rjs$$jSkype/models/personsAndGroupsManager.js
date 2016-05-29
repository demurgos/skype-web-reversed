define("jSkype/models/personsAndGroupsManager", [
  "require",
  "swx-enums",
  "jcafe-property-model",
  "jSkype/models/group",
  "jSkype/models/allGroup",
  "jSkype/models/mePerson",
  "jSkype/models/personSearchQuery",
  "jSkype/constants/people"
], function (e) {
  function f() {
    this._initialized = n.property({ value: !1 });
    this.mePerson = new s(u);
    this.all = new i(this.mePerson);
    this.all.groups.add(l(), a);
  }
  function l() {
    var e = new r(t.groupType.PrivacyRelationship);
    return e.relationshipLevel._set(a), e.persons = c(e.persons), e;
  }
  function c(e) {
    return e.asWritable({
      add: function (n) {
        var r = n.id();
        e(r) || e.add(n, r);
      },
      remove: function (n) {
        e.remove(n.id());
      }
    });
  }
  var t = e("swx-enums"), n = e("jcafe-property-model"), r = e("jSkype/models/group"), i = e("jSkype/models/allGroup"), s = e("jSkype/models/mePerson"), o = e("jSkype/models/personSearchQuery"), u = e("jSkype/constants/people").SELF, a = t.groupPrivacyRelationshipLevel.Blocked;
  return f.prototype.createPersonSearchQuery = function () {
    return new o();
  }, f.prototype.createGroupSearchQuery = function () {
    throw new Error("Not implemented!");
  }, f.prototype.createGroup = function () {
    return new r(t.groupType.Custom);
  }, f.prototype._reset = function () {
    this._initialized(!1);
    this.mePerson._reset();
    this.all._reset();
  }, f;
});
