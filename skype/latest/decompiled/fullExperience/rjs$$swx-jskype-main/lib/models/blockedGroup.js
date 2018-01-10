(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/blockedGroup", [
      "require",
      "exports",
      "jcafe-property-model",
      "swx-enums",
      "../modelHelpers/personsRegistry/instance",
      "./group"
    ], e);
}(function (e, t) {
  function u() {
    var e = n.collection();
    return e.asWritable({
      add: function (t, n) {
        if (!e(n)) {
          var r = i.build(), s = !0;
          r.get(n) || r.add(t, s);
          e.add(t, n);
        }
        return Promise.resolve();
      },
      remove: function (t) {
        return e.remove(t), Promise.resolve();
      }
    });
  }
  var n = e("jcafe-property-model"), r = e("swx-enums"), i = e("../modelHelpers/personsRegistry/instance"), s = e("./group"), o = function (e) {
      function t() {
        var t = e.call(this) || this;
        return t.persons = u(), t.name._set(r.groupPrivacyRelationshipLevel.Blocked), t.type._set(r.groupType.PrivacyRelationship), t.relationshipLevel._set(r.groupPrivacyRelationshipLevel.Blocked), t.uri._set(r.groupPrivacyRelationshipLevel.Blocked), t;
      }
      return __extends(t, e), t;
    }(s["default"]);
  t.__esModule = !0;
  t["default"] = o;
}));
