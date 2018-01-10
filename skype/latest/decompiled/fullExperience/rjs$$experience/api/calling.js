define("experience/api/calling", [
  "require",
  "vendor/knockout",
  "swx-cafe-application-instance",
  "swx-constants",
  "swx-pubsub-instance",
  "ui/viewModels/calling/helpers/callingFacade",
  "swx-constants",
  "constants/components",
  "swx-enums"
], function (e) {
  function h() {
    p();
    d();
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
  var t = e("vendor/knockout"), n = e("swx-cafe-application-instance"), r = e("swx-constants").CALLING, i = e("swx-pubsub-instance").default, s = e("ui/viewModels/calling/helpers/callingFacade"), o = e("swx-constants").COMMON, u = e("constants/components"), a = e("swx-enums"), f, l = t.observable(!1), c = t.observable(!1);
  return f = { buildApi: g }, f;
});
