define("ui/contextMenu/items/addContactToFavorites", [
  "require",
  "lodash-compat",
  "experience/settings",
  "swx-i18n",
  "ui/contextMenu/menuItem",
  "swx-service-locator-instance",
  "swx-constants",
  "swx-telemetry-buckets",
  "ui/modelHelpers/personActionsHelper",
  "ui/modelHelpers/groupHelper",
  "swx-enums",
  "ui/telemetry/telemetryClient"
], function (e) {
  function h() {
    return r.fetch({ key: "favorites_add_to_favorite" });
  }
  function p(e, r) {
    function v() {
      a.addFavorite(d);
      m();
    }
    function m() {
      var e = "favorite_added", t = {
          origin: r || o.telemetry.NOT_AVAILABLE,
          isGroup: !1,
          participantCount: 1,
          participantCountGroup: u.getParticipantCountGroup(1)
        };
      c.get().sendEvent(n.telemetry.uiTenantToken, e, t);
    }
    var d;
    if (!e)
      throw new Error("Parameter missing: contact is required");
    d = t.isFunction(e.getPerson) ? e.getPerson() : e;
    i.call(this, p.TYPE, h(), v);
    this.isEnabled = function () {
      var e = s.resolve(o.serviceLocator.FEATURE_FLAGS).isFeatureOn(o.featureFlags.FAVORITE_CONTACTS_ENABLED), t = f.isPersonInGroup(l.groupType.Favorites, d), n = f.isPersonInGroup(l.groupType.Root, d);
      return e && !t && n;
    };
  }
  var t = e("lodash-compat"), n = e("experience/settings"), r = e("swx-i18n").localization, i = e("ui/contextMenu/menuItem"), s = e("swx-service-locator-instance").default, o = e("swx-constants").COMMON, u = e("swx-telemetry-buckets"), a = e("ui/modelHelpers/personActionsHelper"), f = e("ui/modelHelpers/groupHelper"), l = e("swx-enums"), c = e("ui/telemetry/telemetryClient");
  return p.prototype = Object.create(i.prototype), p.TYPE = "AddToFavoritesMenuItem", p;
});
