define("ui/viewModels/chat/recentList", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "swx-service-locator-instance",
  "utils/common/cafeObservable",
  "swx-enums",
  "swx-constants",
  "swx-cafe-application-instance",
  "swx-utils-common",
  "swx-pubsub-instance",
  "swx-utils-chat",
  "utils/common/ko",
  "swx-utils-common",
  "usertiming",
  "swx-i18n",
  "browser/window",
  "ui/viewModels/chat/navigationHelper",
  "utils/common/scroll",
  "utils/common/feedback",
  "experience/settings",
  "utils/common/styleModeHelper"
], function (e) {
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("swx-service-locator-instance").default, i = e("utils/common/cafeObservable"), s = e("swx-enums"), o = e("swx-constants").COMMON, u = o.events.navigation, a = e("swx-cafe-application-instance"), f = e("swx-utils-common").async, l = e("swx-pubsub-instance").default, c = e("swx-utils-chat").dateTime, h = e("utils/common/ko"), p = e("swx-utils-common").array, d = o.telemetry.performanceMarks, v = e("usertiming"), m = e("swx-i18n").localization, g = e("browser/window"), y = e("ui/viewModels/chat/navigationHelper"), b = e("utils/common/scroll"), w = e("utils/common/feedback"), E = e("experience/settings"), S = o.styleMode, x = e("utils/common/styleModeHelper");
  return function (T, N, C, k) {
    function K() {
      return J.isFeatureOn(o.featureFlags.FAVORITES_CONVERSATION_ENABLED);
    }
    function Q() {
      U(c.getDate().toDateString());
    }
    function G() {
      M().forEach(function (e, t) {
        bt(t, e);
      });
      H.valueHasMutated();
    }
    function Y(e, t) {
      l.publish(o.events.interaction.SCROLL_START, t);
    }
    function Z(e) {
      return e.isOnCall();
    }
    function et(e) {
      return e.canJoinCall();
    }
    function tt() {
      function e(e) {
        var t = Z(e), n = et(e);
        return I !== t && (I = t), t || n;
      }
      return H().filter(e);
    }
    function nt(e) {
      return !Z(e) && !et(e);
    }
    function rt(e, t) {
      return !e.isFavorited() && e.timestamp() === null && e.conversation.lastModificationTimestamp._set(new Date()), e.isFavorited() === t.isFavorited() || !K() ? t.timestamp() - e.timestamp() : e.isFavorited() ? -1 : 1;
    }
    function it(e) {
      return !e.isBlocked();
    }
    function st(e) {
      return K() ? !0 : !e.isFavorited() || e.timestamp() !== null;
    }
    function ot(e) {
      return e.isFavorited();
    }
    function ut() {
      var e;
      return e = H().filter(it).filter(nt).filter(st).sort(rt), at(e[0]), e;
    }
    function at(e) {
      if (!e)
        return;
      f.execute(function () {
        St(q, e);
        Nt(e);
        R.update();
        q = e;
      });
    }
    function ft() {
      v.mark(d.TIMELINE.SYNC_START);
      B.mePerson.displayName.get();
      mt();
      g.addEventListener("resize", mt);
    }
    function lt() {
      g.removeEventListener("resize", mt);
      P = !0;
      V = !1;
    }
    function ct() {
      if (V)
        return;
      var e = O.conversations().length > 0;
      e ? yt() : y.navigateToContactsPage(yt);
    }
    function ht(e) {
      z = e;
    }
    function pt() {
      ht(!1);
      mt();
    }
    function dt() {
      return W.clientHeight < X.scrollHeight;
    }
    function vt() {
      return W.scrollTop + W.clientHeight + 100 > X.scrollHeight;
    }
    function mt() {
      !dt() && O.getMoreConversations.enabled() ? (ht(!0), O.getMoreConversations(5).then(pt, ct)) : ct();
    }
    function gt() {
      if (z || !O.getMoreConversations.enabled())
        return;
      vt() && (ht(!0), O.getMoreConversations(5).then(function () {
        ht(!1);
      }));
    }
    function yt() {
      v.mark(d.TIMELINE.SYNC_END_OK);
      var e = new k();
      e.publish();
      l.publish(o.apiUIEvents.SWX_TIMELINE_LOADED, {});
      V = !0;
    }
    function bt(e, t) {
      var n = new N(C);
      n.init(t);
      Ct(n);
      p.insertAt(H(), e, n);
      R.update();
    }
    function wt(e) {
      var t = H()[e];
      t.separator.dispose();
      t.separator = null;
      t.dispose();
      p.removeFrom(H(), e);
      R.update();
    }
    function Et(e) {
      h.handleArrayChanges(H(), e, bt, wt);
      H.valueHasMutated();
      R.update();
    }
    function St(e, t) {
      t && t !== e && t.isActive() && t.lastMessageIsOutgoing() && xt();
    }
    function xt() {
      document.querySelector(A).scrollTop = 0;
    }
    function Tt() {
      return !j.currentPlaceName();
    }
    function Nt(e) {
      if (!P || !e)
        return;
      P = !1;
      Tt() && l.publish(u.OPEN_CONVERSATION, {
        model: e.conversation,
        origin: o.telemetry.historyLoadOrigin.TIMELINE_INIT
      });
    }
    function Ct(e) {
      e.separator = n.computed(function () {
        return K() && e.isFavorited() ? m.fetch({ key: "favorites_recents_category_name" }) : (U(), c.getDateGroup(e.timestamp()));
      });
    }
    var L = this, A = ".timeline .history", O, M, D, P = !0, H, B, j, F, I, q = null, R, U = n.observable(), z = !1, W, X, V = !1, $ = t.debounce(Y, 1000, {
        leading: !0,
        trailing: !1
      }), J = r.resolve(o.serviceLocator.FEATURE_FLAGS);
    L.init = function () {
      Q();
      R = b.build(document.querySelector(".swx .side .timeline .scrollingWrapper"));
      R.init();
      W = document.querySelector(".swx .side .timeline .scrollingWrapper .scrollable");
      X = document.querySelector(".swx .side .timeline .scrollingWrapper .scrollable div");
      O = a.get().conversationsManager;
      B = a.get().personsAndGroupsManager;
      H = n.observableArray();
      L.recentConversations = n.computed(ut);
      L.currentCalls = n.pureComputed(tt);
      L.hasCurrentCall = function () {
        return L.currentCalls().length > 0;
      };
      j = r.resolve(o.serviceLocator.NAVIGATION_CONTEXT);
      L.buttonsDisabled = T.buttonsDisabled;
      L.hasNotificationsToggle = J.isFeatureOn(o.featureFlags.NOTIFICATIONS_TOGGLE_ENABLED);
      L.hasButtonFullSize = J.isFeatureOn(o.featureFlags.FULL_SCREEN_MODE_FROM_SIDEPANE);
      L.hasBetaLabel = J.isFeatureOn(o.featureFlags.HAS_BETA_LABEL);
      L.hasFeedbackLink = J.isFeatureOn(o.featureFlags.HAS_FEEDBACK_LINK);
      L.hasFeedbackIcon = J.isFeatureOn(o.featureFlags.HAS_FEEDBACK_ICON);
      L.feedbackIconURL = E.appBaseUrl + "/assets/images/components/common/feedback.svg";
      I = !1;
      M = i.newObservableCollection(O.conversations);
      D = M.subscribe(Et, null, "arrayChange");
      L.mePersonId = i.newObservableProperty(B.mePerson.id);
      a.get().signInManager.state.when(s.loginState.SignedIn, ft);
      a.get().signInManager.state.when(s.loginState.SignedOut, lt);
      l.subscribe(o.events.system.DATE_CHANGED, Q);
      G();
    };
    L.dispose = function () {
      D.dispose();
      R.dispose();
      L.recentConversations.dispose();
      L.mePersonId.dispose();
      l.unsubscribe(o.events.system.DATE_CHANGED, Q);
      g.removeEventListener("resize", mt);
      F && F.dispose();
    };
    L.showSeparatorIcon = function (n) {
      var r = L.recentConversations(), i = x.get().currentMode() === S.NARROW, s = K() && t.some(L.recentConversations(), ot), o = n === 0 || r[n - 1] && r[n - 1].isFavorited() && !r[n].isFavorited();
      return i && s && L.showSeparator(n) && o;
    };
    L.separatorIconClass = function (t) {
      var n = {}, r = K() && L.recentConversations()[t].isFavorited();
      return n.favourite = r, n.clock = !r, n;
    };
    L.separatorText = function (t) {
      var n = K() && L.recentConversations()[t].isFavorited();
      return n ? "favorites_recents_category_name" : "accessibility_recentItem_recent_group";
    };
    L.showSeparator = function (t) {
      var n = L.recentConversations();
      return t === 0 || n[t - 1].separator() !== n[t].separator();
    };
    L.onScroll = function (e, t) {
      gt();
      $(e, t);
    };
    L.feedbackLabelTitle = function () {
      return m.fetch({ key: "giveFeedback_tooltip" });
    };
    L.feedbackPageUrl = n.pureComputed(function () {
      return w.getFeedbackPageUrl();
    });
    L.feedbackPageTarget = function () {
      return w.getFeedbackPageTarget();
    };
    L.stopSidebarExpanding = function (e, t) {
      t.stopPropagation();
    };
  };
});
