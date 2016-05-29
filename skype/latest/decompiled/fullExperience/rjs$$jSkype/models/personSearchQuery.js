define("jSkype/models/personSearchQuery", [
  "require",
  "jSkype/client",
  "jcafe-property-model",
  "jSkype/models/searchQuery",
  "jSkype/settings",
  "swx-enums",
  "lodash-compat",
  "jSkype/modelHelpers/search/main",
  "jSkype/modelHelpers/propertyModelHelper",
  "constants/common"
], function (e) {
  function l() {
    function c() {
      var r, i, o, a, f = t.get().personsAndGroupsManager;
      if (!f._initialized())
        return p(f);
      r = n.task();
      o = e.sources();
      a = f.all.persons;
      switch (o) {
      case s.searchScope.Agent:
        i = u.agents(e);
        break;
      case s.searchScope.AddressBook:
        i = u.addressBook(a, e);
        break;
      case s.searchScope.SkypeDirectory:
        i = u.skypeDirectory(e);
        break;
      case s.searchScope.All:
        i = u.all(a, e);
        break;
      default:
        return r.reject(new Error("Required property sources was not valid.")), r.promise;
      }
      return i.then(function (n) {
        n.forEach(function (t) {
          e.results._add(t);
        });
        h(o, e.text(), n);
        r.resolve();
      }, function (t) {
        r.reject(t);
      }), r.promise;
    }
    function h(e, n, r) {
      var o = {}, u = n ? n.length : 0, a = r ? r.length : 0;
      o.name = e;
      o.queryLength = u;
      o.resultCount = a;
      if (e === s.searchScope.AddressBook) {
        var l = t.get().personsAndGroupsManager.all.persons().length;
        o.totalContactsCount = l;
      }
      i.isFeatureOn(f.featureFlags.TELEMETRY_SEARCH_ENABLED) && t.get()._telemetryManager.sendEvent(i.settings.telemetry.jSkypeTenantToken, f.telemetry.search.TYPE, o);
    }
    function p() {
      var e = n.task(), r = t.get().personsAndGroupsManager;
      return r._initialized.changed(function (t) {
        t && c().then(e.resolve.bind(e), e.reject.bind(e));
      }), e.promise;
    }
    var e = this, l = n.collection();
    o.merge(e, new r());
    l.add("id", "id");
    l.add("phoneNumber", "phoneNumber");
    e.supportedKeywords = a.exposeReadOnlyCollection(l);
    e.getMore = n.command(c, e.moreResultsAvailable);
  }
  var t = e("jSkype/client"), n = e("jcafe-property-model"), r = e("jSkype/models/searchQuery"), i = e("jSkype/settings"), s = e("swx-enums"), o = e("lodash-compat"), u = e("jSkype/modelHelpers/search/main"), a = e("jSkype/modelHelpers/propertyModelHelper"), f = e("constants/common");
  return l;
});
