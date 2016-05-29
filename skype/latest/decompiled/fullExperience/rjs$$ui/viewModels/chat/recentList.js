define("ui/viewModels/chat/recentList", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "services/serviceLocator",
  "utils/common/cafeObservable",
  "swx-enums",
  "constants/common",
  "cafe/applicationInstance",
  "utils/common/async",
  "services/pubSub/pubSub",
  "utils/chat/dateTime",
  "utils/common/ko",
  "utils/common/array",
  "usertiming",
  "swx-i18n",
  "browser/window",
  "ui/viewModels/chat/navigationHelper",
  "utils/common/scroll",
  "utils/common/feedback",
  "experience/settings",
  "utils/common/styleModeHelper"
], function (e) {
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("services/serviceLocator"), i = e("utils/common/cafeObservable"), s = e("swx-enums"), o = e("constants/common"), u = o.events.navigation, a = e("cafe/applicationInstance"), f = e("utils/common/async"), l = e("services/pubSub/pubSub"), c = e("utils/chat/dateTime"), h = e("utils/common/ko"), p = e("utils/common/array"), d = o.telemetry.performanceMarks, v = e("usertiming"), m = e("swx-i18n").localization, g = e("browser/window"), y = e("ui/viewModels/chat/navigationHelper"), b = e("utils/common/scroll"), w = e("utils/common/feedback"), E = e("experience/settings"), S = o.styleMode, x = e("utils/common/styleModeHelper");
  return function (T, N, C, k) {
    function J() {
      R(c.getDate().toDateString());
    }
    function K() {
      M().forEach(function (e, t) {
        mt(t, e);
      });
      H.valueHasMutated();
    }
    function Q(e, t) {
      l.publish(o.events.interaction.SCROLL_START, t);
    }
    function G(e) {
      return e.isOnCall();
    }
    function Y(e) {
      return e.canJoinCall();
    }
    function Z() {
      function e(e) {
        var t = G(e), n = Y(e);
        return F !== t && (F = t), t || n;
      }
      return H().filter(e);
    }
    function et(e) {
      return !G(e) && !Y(e);
    }
    function tt(e, t) {
      return e.timestamp() === null && e.conversation.lastModificationTimestamp._set(new Date()), e.isFavorited() === t.isFavorited() ? t.timestamp() - e.timestamp() : e.isFavorited() ? -1 : 1;
    }
    function nt(e) {
      return !e.isBlocked();
    }
    function rt(e) {
      return e.isFavorited();
    }
    function it() {
      var e;
      return e = H().filter(nt).filter(et).sort(tt), st(e[0]), e;
    }
    function st(e) {
      if (!e)
        return;
      f.execute(function () {
        bt(I, e);
        St(e);
        q.update();
        I = e;
      });
    }
    function ot() {
      v.mark(d.TIMELINE.SYNC_START);
      B.mePerson.displayName.get();
      pt();
      g.addEventListener("resize", pt);
    }
    function ut() {
      g.removeEventListener("resize", pt);
      P = !0;
      X = !1;
    }
    function at() {
      if (X)
        return;
      var e = O.conversations().length > 0;
      e ? vt() : y.navigateToContactsPage(vt);
    }
    function ft(e) {
      U = e;
    }
    function lt() {
      ft(!1);
      pt();
    }
    function ct() {
      return z.clientHeight < W.scrollHeight;
    }
    function ht() {
      return z.scrollTop + z.clientHeight + 100 > W.scrollHeight;
    }
    function pt() {
      !ct() && O.getMoreConversations.enabled() ? (ft(!0), O.getMoreConversations(5).then(lt, at)) : at();
    }
    function dt() {
      if (U || !O.getMoreConversations.enabled())
        return;
      ht() && (ft(!0), O.getMoreConversations(5).then(function () {
        ft(!1);
      }));
    }
    function vt() {
      v.mark(d.TIMELINE.SYNC_END_OK);
      var e = new k();
      e.publish();
      l.publish(o.apiUIEvents.SWX_TIMELINE_LOADED, {});
      X = !0;
    }
    function mt(e, t) {
      t._isFavorited && t._isFavorited.changed(yt);
      var n = new N(C);
      n.init(t);
      xt(n);
      p.insertAt(H(), e, n);
      q.update();
    }
    function gt(e) {
      var t = H()[e];
      t.separator.dispose();
      t.separator = null;
      t.conversation._isFavorited && t.conversation._isFavorited.changed.off(yt);
      t.dispose();
      p.removeFrom(H(), e);
      q.update();
    }
    function yt(e) {
      h.handleArrayChanges(H(), e, mt, gt);
      H.valueHasMutated();
      q.update();
    }
    function bt(e, t) {
      t && t !== e && t.isActive() && t.lastMessageIsOutgoing() && wt();
    }
    function wt() {
      document.querySelector(A).scrollTop = 0;
    }
    function Et() {
      return !j.currentPlaceName();
    }
    function St(e) {
      if (!P || !e)
        return;
      P = !1;
      Et() && l.publish(u.OPEN_CONVERSATION, {
        model: e.conversation,
        origin: o.telemetry.historyLoadOrigin.TIMELINE_INIT
      });
    }
    function xt(e) {
      e.separator = n.computed(function () {
        return e.isFavorited() ? m.fetch({ key: "favorites_recents_category_name" }) : (R(), c.getDateGroup(e.timestamp()));
      });
    }
    var L = this, A = ".timeline .history", O, M, D, P = !0, H, B, j, F, I = null, q, R = n.observable(), U = !1, z, W, X = !1, V = t.debounce(Q, 1000, {
        leading: !0,
        trailing: !1
      }), $ = r.resolve(o.serviceLocator.FEATURE_FLAGS);
    L.init = function () {
      J();
      q = b.build(document.querySelector(".swx .side .timeline .scrollingWrapper"));
      q.init();
      z = document.querySelector(".swx .side .timeline .scrollingWrapper .scrollable");
      W = document.querySelector(".swx .side .timeline .scrollingWrapper .scrollable div");
      O = a.get().conversationsManager;
      B = a.get().personsAndGroupsManager;
      H = n.observableArray();
      L.recentConversations = n.computed(it);
      L.currentCalls = n.pureComputed(Z);
      L.hasCurrentCall = function () {
        return L.currentCalls().length > 0;
      };
      j = r.resolve(o.serviceLocator.NAVIGATION_CONTEXT);
      L.buttonsDisabled = T.buttonsDisabled;
      L.hasNotificationsToggle = $.isFeatureOn(o.featureFlags.HAS_TIMELINE_BADGE) && !$.isFeatureOn(o.featureFlags.SINGLE_CONVERSATION_MODE);
      L.hasBetaLabel = $.isFeatureOn(o.featureFlags.HAS_BETA_LABEL);
      L.hasFeedbackLink = $.isFeatureOn(o.featureFlags.HAS_FEEDBACK_LINK);
      L.hasFeedbackIcon = $.isFeatureOn(o.featureFlags.HAS_FEEDBACK_ICON);
      L.feedbackIconURL = E.appBaseUrl + "/assets/images/components/common/feedback.svg";
      F = !1;
      M = i.newObservableCollection(O.conversations);
      D = M.subscribe(yt, null, "arrayChange");
      L.mePersonId = i.newObservableProperty(B.mePerson.id);
      K();
      a.get().signInManager.state.when(s.loginState.SignedIn, ot);
      a.get().signInManager.state.when(s.loginState.SignedOut, ut);
      l.subscribe(o.events.system.DATE_CHANGED, J);
    };
    L.dispose = function () {
      D.dispose();
      q.dispose();
      L.recentConversations.dispose();
      L.mePersonId.dispose();
      l.unsubscribe(o.events.system.DATE_CHANGED, J);
      g.removeEventListener("resize", pt);
    };
    L.showSeparatorIcon = function (t) {
      var n = L.recentConversations(), r = L.recentConversations().filter(rt), i = x.get().currentMode() === S.NARROW, s = r.length > 0, o = t === 0 || n[t - 1] && n[t - 1].isFavorited() && !n[t].isFavorited();
      return i && s && L.showSeparator(t) && o;
    };
    L.separatorIconClass = function (t) {
      var n = {}, r = L.recentConversations()[t].isFavorited();
      return n.favourite = r, n.clock = !r, n;
    };
    L.showSeparator = function (t) {
      var n = L.recentConversations();
      return t === 0 || n[t - 1].separator() !== n[t].separator();
    };
    L.onScroll = function (e, t) {
      dt();
      V(e, t);
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
