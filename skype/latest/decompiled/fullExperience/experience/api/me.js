define("experience/api/me", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "cafe/applicationInstance",
  "swx-enums",
  "ui/modelHelpers/personHelper",
  "utils/common/cafeObservable",
  "ui/telemetry/actions/actionNames",
  "ui/telemetry/actions/actionTelemetryApi"
], function (e, t) {
  var n = e("vendor/knockout"), r = e("cafe/applicationInstance"), i = e("swx-enums"), s = e("ui/modelHelpers/personHelper"), o = e("utils/common/cafeObservable"), u = e("ui/telemetry/actions/actionNames"), a = e("ui/telemetry/actions/actionTelemetryApi"), f = n.observable(!1);
  t.isExpanded = f, t.expose = function () {
    function v() {
      var e = [];
      return d() ? (e = h().filter(function (e) {
        return !s.isAgent(e);
      }), e.length) : 0;
    }
    function m(t) {
      e.status(t), p.recordAction(u.presence.change, { presence: t });
    }
    function g() {
      e.status.reset();
    }
    var e = r.get().personsAndGroupsManager.mePerson, t = n.observable(!1), l = o.newObservableProperty(e.status, { keepAlive: !0 }), c = {
        read: function () {
          return l();
        },
        write: m
      }, h = o.newObservableCollection(r.get().personsAndGroupsManager.all.persons, { keepAlive: !0 }), p = a.build(), d = n.observable(!1);
    return r.get().signInManager.state.changed(function (e) {
      t(e === i.loginState.SignedIn || e === i.loginState.SigningOut);
    }), e.id.get().then(function () {
      d(!0);
    }), {
      authenticated: t,
      uri: o.newObservableProperty(e.id),
      displayName: o.newObservableProperty(e.displayName),
      avatar: o.newObservableProperty(e.avatarUrl),
      status: n.computed(c),
      resetStatus: g,
      mood: o.newObservableProperty(e.activity),
      numberOfNonAgentContacts: n.computed({ read: v }),
      isExpanded: f
    };
  };
})
