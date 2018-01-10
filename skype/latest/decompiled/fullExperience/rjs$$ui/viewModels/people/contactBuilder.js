define("ui/viewModels/people/contactBuilder", [
  "require",
  "exports",
  "module",
  "ui/viewModels/people/contact",
  "vendor/knockout",
  "swx-constants",
  "swx-enums",
  "lodash-compat"
], function (e, t) {
  function u(e) {
    function n() {
      return e.hideStrategy() === i.AVAILABLE_ONLY ? !e.status() || e.status() === s.Offline || e.status() === s.Hidden || e.status() === s.Unknown : e.hideStrategy() === i.AGENTS_ONLY ? !e.isAgent() : !1;
    }
    var t = e.dispose;
    return e.hideStrategy = r.observable(), e.isFavorite = r.observable(), e.isHidden = r.computed(n, e), e.dispose = function () {
      t.call(e);
      e.isHidden.dispose();
    }, e;
  }
  var n = e("ui/viewModels/people/contact"), r = e("vendor/knockout"), i = e("swx-constants").PEOPLE.showStrategies, s = e("swx-enums").onlineStatus, o = e("lodash-compat");
  t.build = function (e, t) {
    var r;
    return t = t || {}, o.defaults(t, {
      keepPresenceSubscription: !0,
      keepActivitySubscription: !0,
      keepLastSeenAtSubscription: !0,
      keepEndpointTypeSubscription: !0,
      moodMessageFirst: !1
    }), r = n.build(e, t), t.hideable && (r = u(r)), r;
  };
});
