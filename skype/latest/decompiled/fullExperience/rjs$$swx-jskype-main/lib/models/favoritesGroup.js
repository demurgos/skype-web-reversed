(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/favoritesGroup", [
      "require",
      "exports",
      "jcafe-property-model",
      "swx-enums",
      "../services/contactsV2/instance",
      "./group",
      "swx-mri",
      "../modelHelpers/contacts/dataHandlers/rawViewCacheDataHandler"
    ], e);
}(function (e, t) {
  function f(e) {
    var t = n.collection();
    return t.asWritable({
      add: function (n, r, s, a) {
        var f;
        return !t(r) && !o.isGuestId(r) && (a || (f = i.get().addContactToFavorites(e.id(), o.getKey(r, n._type())).then(u.update)), t.add(n, r)), f || Promise.resolve();
      },
      remove: function (n, r) {
        var s, a = t(n);
        return !o.isGuestId(n) && a && (r || (s = i.get().removeContactFromFavorites(e.id(), o.getKey(n, a._type())).then(u.update)), t.remove(n)), s || Promise.resolve();
      }
    });
  }
  var n = e("jcafe-property-model"), r = e("swx-enums"), i = e("../services/contactsV2/instance"), s = e("./group"), o = e("swx-mri"), u = e("../modelHelpers/contacts/dataHandlers/rawViewCacheDataHandler"), a = function (e) {
      function t(t) {
        var n = e.call(this) || this;
        return n.name._set(r.groupType.Favorites), n.type._set(r.groupType.Favorites), n.relationshipLevel._set(r.groupPrivacyRelationshipLevel.None), n.uri._set(r.groupType.Favorites), n.persons = f(t), n;
      }
      return __extends(t, e), t;
    }(s["default"]);
  t.__esModule = !0;
  t["default"] = a;
}));
