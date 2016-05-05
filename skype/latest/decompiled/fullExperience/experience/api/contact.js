define("experience/api/contact", [
  "require",
  "exports",
  "module",
  "cafe/applicationInstance",
  "swx-enums",
  "constants/common",
  "ui/telemetry/actions/actionNames",
  "utils/common/cafeObservable",
  "services/serviceLocator"
], function (e, t) {
  var n = e("cafe/applicationInstance"), r = e("swx-enums"), i = e("constants/common"), s = e("ui/telemetry/actions/actionNames"), o = e("utils/common/cafeObservable"), u = e("services/serviceLocator");
  t.getByUri = function (e) {
    function p() {
      var e = c.results().length, t = e ? c.results(0).result : undefined;
      t && (f.status.bindToProperty(t.status), f.displayName.bindToProperty(t.displayName), f.avatar.bindToProperty(t.avatarUrl), f.uri.bindToProperty(t.id)), l.markBeforeRender(), l.addEventData({
        source: "api_contact_search",
        results: e
      }), l.endTrace();
    }
    var t = u.resolve(i.serviceLocator.FEATURE_FLAGS), a = !t.isFeatureOn(i.featureFlags.DISABLE_PERSISTENT_CONTACT_PRESENCE_SUBSCRIPTION), f = {
        status: o.newDeferredObservableProperty(null, { keepAlive: a }),
        displayName: o.newDeferredObservableProperty(),
        avatar: o.newDeferredObservableProperty(),
        uri: o.newDeferredObservableProperty()
      }, l = u.resolve(i.serviceLocator.ACTION_TELEMETRY).createTraceableAction(s.search.started), c = n.get().personsAndGroupsManager.createPersonSearchQuery(), h = r.searchScope.AddressBook;
    return l.startTrace(), c.sources(h).keywords.id = e, c.getMore().then(p), f;
  };
})
