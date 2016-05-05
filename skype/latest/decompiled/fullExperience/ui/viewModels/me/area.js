define("ui/viewModels/me/area", [
  "require",
  "exports",
  "module",
  "ui/telemetry/actions/actionNames",
  "ui/telemetry/actions/actionSources",
  "cafe/applicationInstance",
  "utils/common/cafeObservable",
  "swx-enums",
  "services/serviceLocator",
  "utils/common/statusMapper",
  "constants/common",
  "swx-i18n",
  "vendor/knockout",
  "experience/settings",
  "experience/api/calling",
  "browser/window",
  "browser/document",
  "experience/api/authentication",
  "utils/common/eventHelper",
  "utils/common/eventMixin",
  "lodash-compat",
  "browser/dom",
  "experience/api/me",
  "ui/contextMenu/contextMenu"
], function (e, t) {
  function T(e, t, y) {
    var T = this, N = i.get().personsAndGroupsManager.mePerson, C = u.resolve(f.serviceLocator.FEATURE_FLAGS), k = p.buildApi(), L = { source: r.me.area }, A = b.now(), O = u.resolve(f.serviceLocator.ACTION_TELEMETRY), M = w.getElement(".Me-displayName", t), D = b.once(function (e, t) {
        var i;
        e && (i = b.now() - A), O.recordAction(n.me.presenceLoaded, {
          source: r.me.area,
          mePresenceLoadTime: i,
          meStatus: t,
          meStatusLoaded: e
        });
      }), P = function () {
        if (i.get().signInManager.state() !== o.loginState.SignedIn)
          return;
        var e = N.status(), t = e === o.onlineStatus.Online;
        D(!0, e), T.notificationAvailabilityText(l.fetch({ key: t ? "me_notificationsOn" : "me_notificationsOff" })), T.availabilityToggleAriaLabel(l.fetch({ key: t ? "accessibility_me_availabilityOnAriaLabel" : "accessibility_me_availabilityOffAriaLabel" })), T.online(t), T.availability(a.getAvailabilityText(e)), T.avatarStatusClassName(a.getStatusIconClass(e));
      }, H = function () {
        i.get().signInManager.state() === o.loginState.SignedIn && T.displayName(N.displayName());
      }, B = function (e) {
        g.isDeactivation(e) && T.collapse(null, e);
      }, j = function (e) {
        return e.type === "click" || e.type === "keypress" && g.isActivation(e);
      };
    setTimeout(function () {
      D(!1);
    }, x), T.displayName = c.observable(N.displayName()), T.avatarUrl = s.newObservableProperty(N.avatarUrl), T.isExpanded = E.isExpanded, T.linkTabIndex = c.computed(function () {
      return E.isExpanded() ? -1 : 0;
    }), T.accountLinkValue = h.meProfileUrl, T.notificationAvailabilityText = c.observable(l.fetch({ key: "me_notificationsOff" })), T.availabilityToggleAriaLabel = c.observable(l.fetch({ key: "accessibility_me_availabilityOffAriaLabel" })), T.online = c.observable(!1), T.isFocused = c.observable(!1), T.availability = c.observable(l.fetch({ key: "me_pendingPresence" })), T.avatarStatusClassName = c.observable(o.onlineStatus.Unknown.toLowerCase()), N.status.changed(P), N.displayName.changed(H), T.threeStatePresenceControlEnabled = C.isFeatureOn(f.featureFlags.NEW_SELF_PRESENCE), T.toggleStatus = function () {
      var e = N.status(), t = T.online() ? o.onlineStatus.Hidden : o.onlineStatus.Online;
      N.status(t), O.recordAction(n.me.presenceChanged, {
        source: r.me.area,
        pickerVersion: "twoState",
        oldStatus: e,
        newStatus: t,
        meExpanded: !1
      });
    }, T.triggerPresencePopup = function (e, t, n) {
      return j(n) && (S.hide(n), n.preventDefault(), T.dispatchEvent(f.events.me.PRESENCE_POPUP_SHOW, e, T.DIRECTION.CHILD)), !0;
    }, T.isPluginInstalled = k.isPluginInstalled, T.collapse = function (e, t) {
      y.restore(), T.isExpanded(!1), O.recordAction(n.me.collapsed, L), M.focus(), t.stopPropagation(), v.removeEventListener("keydown", B);
    }, T.expand = function () {
      y.restrict(), T.isExpanded(!0), T.isFocused(!0), v.addEventListener("keydown", B), O.recordAction(n.me.expanded, L);
    }, T.toggleMeSize = function (e, t) {
      if (j(t)) {
        if (T.isExpanded() && t.target === t.currentTarget)
          return T.collapse(e, t), !0;
        T.isExpanded() || T.expand();
      }
      return !0;
    }, T.installPlugin = function () {
      k.startPluginInstall(), O.recordAction(n.me.installPluginLinkClicked, L);
    }, T.meAccountLinkClicked = function (e, t, r) {
      d.open(e, "_blank"), O.recordAction(n.me.accountLinkClicked, L), r.preventDefault();
    }, T.meSignOut = function () {
      m.signOut(), O.recordAction(n.me.signOutClicked, L);
    }, T.dispose = function () {
      T.avatarUrl.dispose(), T.linkTabIndex.dispose(), N.status.changed.off(P), N.displayName.changed.off(H);
    };
  }
  var n = e("ui/telemetry/actions/actionNames"), r = e("ui/telemetry/actions/actionSources"), i = e("cafe/applicationInstance"), s = e("utils/common/cafeObservable"), o = e("swx-enums"), u = e("services/serviceLocator"), a = e("utils/common/statusMapper"), f = e("constants/common"), l = e("swx-i18n").localization, c = e("vendor/knockout"), h = e("experience/settings"), p = e("experience/api/calling"), d = e("browser/window"), v = e("browser/document"), m = e("experience/api/authentication"), g = e("utils/common/eventHelper"), y = e("utils/common/eventMixin"), b = e("lodash-compat"), w = e("browser/dom"), E = e("experience/api/me"), S = e("ui/contextMenu/contextMenu"), x = 60000;
  b.assign(T.prototype, y), t.build = function (e, t, n) {
    return new T(e, t, n);
  };
})
