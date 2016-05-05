define("experience/api/calling", [
  "require",
  "vendor/knockout",
  "cafe/applicationInstance",
  "constants/calling",
  "services/pubSub/pubSub",
  "ui/viewModels/calling/helpers/callingFacade",
  "constants/common",
  "constants/components",
  "swx-enums"
], function (e) {
  function h() {
    p(), d();
  }
  function p() {
    i.subscribe(r.EVENTS.FULLSCREEN_CHANGED, function (e) {
      l(e);
    });
  }
  function d() {
    n.get().personsAndGroupsManager.mePerson.capabilities.audio.changed(function (e, t) {
      var n = t !== a.callingNotSupportedReasons.PluginNotInstalled;
      c(n);
    });
  }
  function v() {
    s.installPlugin("callingApi");
  }
  function m() {
    var e = {
      page: u.calling.SKYPEOUT_PAGE,
      origin: o.telemetry.historyLoadOrigin.SKYPEOUT_PAGE_API
    };
    i.publish(o.events.navigation.NAVIGATE, e);
  }
  function g() {
    return h(), {
      isPluginInstalled: t.computed(function () {
        return c();
      }),
      openPstnPage: m,
      startPluginInstall: v,
      isFullScreen: t.computed(function () {
        return l();
      })
    };
  }
  var t = e("vendor/knockout"), n = e("cafe/applicationInstance"), r = e("constants/calling"), i = e("services/pubSub/pubSub"), s = e("ui/viewModels/calling/helpers/callingFacade"), o = e("constants/common"), u = e("constants/components"), a = e("swx-enums"), f, l = t.observable(!1), c = t.observable(!1);
  return f = { buildApi: g }, f;
})
