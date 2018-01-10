define("ui/viewModels/me/area", [
  "require",
  "exports",
  "module",
  "ui/telemetry/actions/actionNames",
  "ui/telemetry/actions/actionSources",
  "swx-cafe-application-instance",
  "utils/common/cafeObservable",
  "swx-enums",
  "swx-service-locator-instance",
  "utils/common/statusMapper",
  "swx-constants",
  "swx-i18n",
  "vendor/knockout",
  "experience/settings",
  "experience/api/calling",
  "browser/window",
  "experience/api/authentication",
  "utils/common/eventHelper",
  "utils/common/eventMixin",
  "lodash-compat",
  "browser/dom",
  "experience/api/me",
  "ui/contextMenu/contextMenu",
  "swx-utils-chat",
  "swx-focus-handler",
  "telemetry/calling/pstn/pstn",
  "swx-constants"
], function (e, t) {
  function k(e, t, g) {
    var k = this, L = i.get().personsAndGroupsManager.mePerson, A = L.account, O = p.buildApi(), M = { source: r.me.area }, D = y.now(), P = u.resolve(f.serviceLocator.ACTION_TELEMETRY), H = b.getElement(".Me-displayName", t), B = {
        expand: 1,
        collapse: 2
      }, j = y.once(function (e, t) {
        var i;
        e && (i = y.now() - D);
        P.recordAction(n.me.presenceLoaded, {
          source: r.me.area,
          mePresenceLoadTime: i,
          meStatus: t,
          meStatusLoaded: e
        });
      }), F = function () {
        if (i.get().signInManager.state() !== o.loginState.SignedIn)
          return;
        var e = L.status(), t = e === o.onlineStatus.Online;
        j(!0, e);
        k.notificationAvailabilityText(l.fetch({ key: a.isNotificationOn(e) ? "me_notificationsOn" : "me_notificationsOff" }));
        k.online(t);
        k.availability(a.getMeAvailabilityText(e));
        k.avatarStatusClassName(a.getStatusIconClass(e));
        L.activity() || k.activityMessage(a.getMeAvailabilityText(e));
      }, I = function () {
        var e = L.activity().replace(/class="emoticon extraLarge"/g, "class=\"emoticon\"");
        k.activityMessage(e ? e : k.availability());
      }, q = function () {
        i.get().signInManager.state() === o.loginState.SignedIn && k.displayName(L.displayName());
      }, R = function () {
        i.get().signInManager.state() === o.loginState.SignedIn && k.id(L.id());
      }, U = function () {
        i.get().signInManager.state() === o.loginState.SignedIn && (A._balance() > 0 ? k.displayBalance(A.displayBalance()) : k.displayBalance(""));
      }, z = function (e) {
        return e.target.className.indexOf("collapse") > -1 ? B.collapse : B.expand;
      }, W = function (e) {
        return e.type === "click" || e.type === "keypress" && m.isActivation(e);
      };
    setTimeout(function () {
      j(!1);
    }, C);
    k.id = c.observable(L.id());
    k.displayName = c.observable(L.displayName());
    k.displayNameUnescaped = c.computed(function () {
      return y.unescape(k.displayName());
    });
    k.activityMessage = c.observable();
    k.activityMessageTitle = c.computed(function () {
      return S.stripHTML(k.activityMessage());
    });
    k.displayBalance = c.observable();
    L.id.get().then(function () {
      A.entitlements.get().then(function () {
        A._balance() > 0 && k.displayBalance(A.displayBalance());
      });
    });
    k.purchaseCreditUrl = h.commerce.purchaseCreditUrl;
    k.avatarUrl = s.newObservableProperty(L.avatarUrl);
    k.isExpanded = w.isExpanded;
    k.linkTabIndex = c.computed(function () {
      return w.isExpanded() ? -1 : 0;
    });
    k.accountLinkValue = h.meProfileUrl;
    k.notificationAvailabilityText = c.observable(l.fetch({ key: "me_notificationsOff" }));
    k.online = c.observable(!1);
    k.isFocused = c.observable(!1);
    k.availability = c.observable(l.fetch({ key: "me_pendingPresence" }));
    k.avatarStatusClassName = c.observable(o.onlineStatus.Unknown.toLowerCase());
    k.changePresenceAriaLabel = c.computed(function () {
      return l.fetch({
        key: "accessibility_me_changePresenceStatusAriaLabel",
        params: { currentStatus: k.availability() }
      });
    });
    L.status.changed(F);
    L.activity.changed(I);
    L.displayName.changed(q);
    L.id.changed(R);
    A.displayBalance.changed(U);
    k.triggerPresencePopup = function (e, t, n) {
      return W(n) && (E.hide(n), n.preventDefault(), k.dispatchEvent(f.events.me.PRESENCE_POPUP_SHOW, e, k.DIRECTION.CHILD)), !0;
    };
    k.isPluginInstalled = O.isPluginInstalled;
    k.collapse = function () {
      g.restore();
      k.isExpanded(!1);
      P.recordAction(n.me.collapsed, M);
      x.get().addFocusRequestToQueue(H);
    };
    k.expand = function () {
      g.restrict();
      k.isExpanded(!0);
      k.isFocused(!0);
      P.recordAction(n.me.expanded, M);
    };
    k.addCreditTelemetry = function () {
      return T.addingCredit(N.CREDIT_DISPLAY), !0;
    };
    k.toggleMeSize = function (e, t) {
      if (t.srcElement && t.srcElement.id === "meDisplayBalance")
        return !0;
      if (W(t)) {
        var n = z(t);
        n === B.collapse && k.isExpanded() ? k.collapse() : n === B.expand && !k.isExpanded() && k.expand();
        t.preventDefault();
        t.stopPropagation();
      }
      return !0;
    };
    k.installPlugin = function () {
      O.startPluginInstall();
      P.recordAction(n.me.installPluginLinkClicked, M);
    };
    k.meAccountLinkClicked = function (e, t, r) {
      d.open(e, "_blank");
      P.recordAction(n.me.accountLinkClicked, M);
      r.preventDefault();
    };
    k.meSignOut = function () {
      v.signOut();
      P.recordAction(n.me.signOutClicked, M);
    };
    k.dispose = function () {
      k.avatarUrl.dispose();
      k.linkTabIndex.dispose();
      k.changePresenceAriaLabel.dispose();
      L.status.changed.off(F);
      L.activity.changed.off(I);
      L.id.changed.off(R);
      L.displayName.changed.off(q);
      A.displayBalance.changed.off(U);
    };
  }
  var n = e("ui/telemetry/actions/actionNames"), r = e("ui/telemetry/actions/actionSources"), i = e("swx-cafe-application-instance"), s = e("utils/common/cafeObservable"), o = e("swx-enums"), u = e("swx-service-locator-instance").default, a = e("utils/common/statusMapper"), f = e("swx-constants").COMMON, l = e("swx-i18n").localization, c = e("vendor/knockout"), h = e("experience/settings"), p = e("experience/api/calling"), d = e("browser/window"), v = e("experience/api/authentication"), m = e("utils/common/eventHelper"), g = e("utils/common/eventMixin"), y = e("lodash-compat"), b = e("browser/dom"), w = e("experience/api/me"), E = e("ui/contextMenu/contextMenu"), S = e("swx-utils-chat").messageSanitizer, x = e("swx-focus-handler"), T = e("telemetry/calling/pstn/pstn"), N = e("swx-constants").COMMON.telemetry.meArea, C = 60000;
  y.assign(k.prototype, g);
  t.build = function (e, t, n) {
    return new k(e, t, n);
  };
});
