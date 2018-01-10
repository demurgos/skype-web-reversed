(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/personSearchQuery", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "jcafe-property-model",
      "./searchQuery",
      "swx-enums",
      "../modelHelpers/search/main",
      "../modelHelpers/propertyModelHelper"
    ], e);
}(function (e, t) {
  function f(e) {
    var t = n.get().personsAndGroupsManager;
    if (!t._initialized())
      return l(e);
    var r = e.sources(), i = t.all.persons, u;
    switch (r) {
    case s.searchScope.Agent:
      u = o.agents();
      break;
    case s.searchScope.AddressBook:
      u = o.addressBook(i, e);
      break;
    case s.searchScope.SkypeDirectory:
      u = o.skypeDirectory(e);
      break;
    case s.searchScope.All:
      u = o.all(i, e);
      break;
    default:
      return Promise.reject(new Error("Required property sources was not valid."));
    }
    return u.then(function (t) {
      for (var n = 0, r = t; n < r.length; n++) {
        var i = r[n];
        e.results._add(i);
      }
    });
  }
  function l(e) {
    var t = n.get().personsAndGroupsManager;
    return new Promise(function (n) {
      t._initialized.changed(function (t) {
        t && n(f(e));
      });
    });
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("jcafe-property-model"), i = e("./searchQuery"), s = e("swx-enums"), o = e("../modelHelpers/search/main"), u = e("../modelHelpers/propertyModelHelper"), a = function (e) {
      function t() {
        var t = e.call(this) || this;
        t.getMore = r.command(f.bind(null, t), t.moreResultsAvailable);
        var n = r.collection();
        return n.add("id", "id"), n.add("phoneNumber", "phoneNumber"), t.supportedKeywords = u.exposeReadOnlyCollection(n), t;
      }
      return __extends(t, e), t;
    }(i["default"]);
  t.__esModule = !0;
  t["default"] = a;
}));
