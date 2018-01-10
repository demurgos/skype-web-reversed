define("ui/viewModels/experience/eduCarousel", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "swx-service-locator-instance",
  "swx-constants",
  "experience/settings",
  "swx-i18n",
  "utils/common/localStorage",
  "ui/telemetry/telemetryClient"
], function (e, t) {
  function l() {
    function v(e, t) {
      a.get().sendEvent(s.telemetry.uiTenantToken, e, t || {});
    }
    function m(e) {
      var t = e === null || e === h.length ? 0 : e;
      return h[t];
    }
    function g() {
      var e = u.get(p), t = parseInt(e, 10);
      return e === null || isNaN(t) ? null : t;
    }
    var e = this, t = r.resolve(i.serviceLocator.FEATURE_FLAGS), l = t.isFeatureOn(i.featureFlags.SHOW_EDU_CAROUSEL), c = r.resolve(i.serviceLocator.PUBSUB), h = [
        {
          id: "1",
          name: "conversation",
          header: o.fetch({ key: "splashScreen_eduCarousel_conversation_header" }),
          text: o.fetch({ key: "splashScreen_eduCarousel_conversation_text" })
        },
        {
          id: "2",
          name: "findFriends",
          header: o.fetch({ key: "splashScreen_eduCarousel_find_friends_header" }),
          text: o.fetch({ key: "splashScreen_eduCarousel_find_friends_text" })
        }
      ], p = "eduCarouselLastSeenId", d;
    e.isVisible = n.observable(!1);
    e.itemName = n.observable();
    e.itemHeader = n.observable();
    e.itemText = n.observable();
    e.init = function () {
      if (!l)
        return;
      var t = g();
      e.showItem(m(t));
      c.subscribe(f.action.HIDE, e.hideCarousel);
    };
    e.showItem = function (t) {
      if (!t)
        return;
      e.itemName(t.name);
      e.itemHeader(t.header);
      e.itemText(t.text);
      e.isVisible(!0);
      d = new Date();
      v(f.telemetry.START, { displayed: t.name });
      u.set(p, t.id);
    };
    e.hideCarousel = function (t) {
      e.isVisible(!1);
      c.unsubscribe(f.action.HIDE, e.hideCarousel);
      d && (v(f.telemetry.FINISH, {
        displayedTimeSeconds: Math.round((new Date() - d) / 1000),
        origin: t
      }), d = null);
    };
    e.dispose = function () {
      e.isVisible(!1);
    };
  }
  var n = e("vendor/knockout"), r = e("swx-service-locator-instance").default, i = e("swx-constants").COMMON, s = e("experience/settings"), o = e("swx-i18n").localization, u = e("utils/common/localStorage"), a = e("ui/telemetry/telemetryClient"), f = i.telemetry.eduCarouselEvents;
  t.build = function () {
    return new l();
  };
});
