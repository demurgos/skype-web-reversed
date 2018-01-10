(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/personsAndGroupsManager", [
      "require",
      "exports",
      "swx-enums",
      "jcafe-property-model",
      "./group",
      "./allGroup",
      "./favoritesGroup",
      "./blockedGroup",
      "./mePerson",
      "./personSearchQuery",
      "swx-constants",
      "jskype-settings-instance",
      "jskype-constants",
      "../services/invite/instance",
      "../modelHelpers/contacts/dataHandlers/factory"
    ], e);
}(function (e, t) {
  var n = e("swx-enums"), r = e("jcafe-property-model"), i = e("./group"), s = e("./allGroup"), o = e("./favoritesGroup"), u = e("./blockedGroup"), a = e("./mePerson"), f = e("./personSearchQuery"), l = e("swx-constants"), c = e("jskype-settings-instance"), h = e("jskype-constants"), p = e("../services/invite/instance"), d = e("../modelHelpers/contacts/dataHandlers/factory"), v = function () {
      function e() {
        this._contactsCacheRestored = r.property({ value: !1 });
        this._initialized = r.property({ value: !1 });
        this.mePerson = new a["default"](h.PEOPLE.SELF);
        this.all = new s["default"](this.mePerson);
        var e = new u["default"]();
        this.all.groups.add(e, e.uri());
        if (c.isFeatureOn(l.COMMON.featureFlags.FAVORITE_CONTACTS_ENABLED)) {
          var t = new o["default"](this.mePerson);
          this.all.groups.add(t, t.uri());
        }
      }
      return e.prototype.createPersonSearchQuery = function () {
        return new f["default"]();
      }, e.prototype.createGroupSearchQuery = function () {
        throw new Error("Not implemented!");
      }, e.prototype.createGroup = function () {
        return new i["default"](n.groupType.Custom);
      }, e.prototype._autoBuddyFromInvite = function (e, t) {
        return p.get().autoBuddy(e).then(function () {
          return d.getContactAutoBuddyHandlers().onSuccess(t), Promise.resolve();
        });
      }, e.prototype._reset = function () {
        this._initialized(!1);
        this.mePerson._reset();
        this.all._reset();
        this.all.groups().forEach(function (e) {
          return e.persons.empty();
        });
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = v;
}));
