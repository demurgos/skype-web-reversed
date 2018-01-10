define("ui/viewModels/chat/chatLog", [
  "require",
  "lodash-compat",
  "browser/document",
  "vendor/knockout",
  "utils/common/ko",
  "swx-utils-common",
  "utils/common/cafeObservable",
  "swx-constants",
  "swx-constants",
  "utils/common/eventMixin",
  "ui/contextMenu/contextMenu",
  "ui/contextMenu/items/all",
  "swx-utils-chat",
  "swx-utils-common",
  "swx-service-locator-instance",
  "utils/common/appVisibilityProvider",
  "swx-i18n",
  "ui/telemetry/actions/actionSources",
  "swx-utils-chat",
  "experience/settings",
  "swx-cafe-application-instance",
  "utils/common/accessibility",
  "swx-enums",
  "ui/modelHelpers/personHelper",
  "swx-log-tracer",
  "browser/dom",
  "ui/players/mediaPlayerController"
], function (e) {
  function _(e, f) {
    function tt(t) {
      var n = new e();
      return n.setContext(f), n.init(t, _.conversation), D[n.clientmessageid] = n, n;
    }
    function nt(e, t) {
      (!t.text || _t(t.text())) && s.insertAt(_.collection(), e, tt(t));
    }
    function rt(e, t) {
      var n = s.removeFrom(_.collection(), e);
      delete D[n.clientmessageid];
      n.clientmessageid !== t.key() && T.warn("Removing wrong element ! There was de-synchronization between model activityItems and viewmodel messages ! Crash !");
    }
    function it() {
      var e = {}, t = _.collection();
      t.forEach(function (t) {
        e = P.processMessage(t, e);
      });
      P.processMyLastMessageIfAny(t);
      _.collection.valueHasMutated();
    }
    function st(e) {
      i.handleArrayChanges(_.collection(), e, nt, rt);
      it();
    }
    function ot() {
      q = j.activityItems.subscribe();
    }
    function ut() {
      H = F.subscribe(st, null, "arrayChange");
    }
    function at() {
      if (!F)
        return;
      X.start();
      ot();
      var e = F(), t;
      e.length < k && p.execute(gt);
      if (e.length === 0) {
        ut();
        _.dispatchEvent(u.events.conversation.MESSAGES_LOADED, e, _.DIRECTION.PARENT);
        return;
      }
      t = e.filter(function (e) {
        return !e.text || _t(e.text());
      });
      t = t.map(function (e) {
        return tt(e);
      });
      r.utils.arrayPushAll(_.collection(), t);
      it();
      ut();
      _.dispatchEvent(u.events.conversation.MESSAGES_LOADED, e, _.DIRECTION.PARENT);
    }
    function ft() {
      var e = [];
      return t.forEach(_.collection(), function (t) {
        W.isMessageVisible(t.clientmessageid) && e.push(t.model);
      }), e;
    }
    function lt() {
      var e = j.unreadActivityItemsCount(), t = _.collection(), n = ct(t);
      if (e > t.length) {
        gt();
        return;
      }
      W.isVisible() && e > 0 && e < M && n && W.isScrolledToBottom() && W.scrollToMessage(n);
    }
    function ct(e) {
      return t.find(e, function (e) {
        return !e.model.isRead();
      });
    }
    function ht(e) {
      if (U && W.isVisible() && (e || v.hasFocus()) && !z) {
        var t = [];
        Y && (t = ft());
        j.markAllAsRead(t);
      }
    }
    function pt(e) {
      e && e.suggestedActions && e.suggestedActions().length ? (_.suggestedActions(e.suggestedActions()), _.suggestedActionsAuthor = e.author, _.showSuggestedActions(!0)) : (_.suggestedActions([]), _.suggestedActionsAuthor = {}, _.showSuggestedActions(!1));
    }
    function dt() {
      if (!W)
        return;
      if (yt())
        return;
      _._updatingMessages = !0;
      W.showNewMessages();
      Y && lt();
      _._updatingMessages = !1;
      K && K();
      P.processMyBeforeLastMessageIfAny(_.collection());
      !W.isScrollable() && !I && p.execute(gt);
      X.registerSync();
    }
    function vt() {
      X.registerSync();
      I = !1;
      dt();
    }
    function mt() {
      X.registerError();
    }
    function gt() {
      j.getMoreActivityItems.enabled() && (I = !0, j.getMoreActivityItems(L).then(vt, mt));
    }
    function yt() {
      return _.collection && _.collection().filter(function (e) {
        return !e.isRendered;
      }).length > 0;
    }
    function bt() {
      yt() || p.execute(dt);
    }
    function wt() {
      W.restoreScrollPosition();
    }
    function Et() {
      if (W.isScrollPositionStored())
        return;
      W.storeScrollPosition();
    }
    function St(e) {
      U = !0;
      W.onShow();
      if (!W.isScrollable()) {
        gt();
        ht();
        return;
      }
      Y && lt();
      e && e.messageId && xt(e.messageId);
    }
    function xt(e) {
      var t, n = _.collection();
      K = null;
      for (t = 0; t < n.length; t++) {
        var r = n[t];
        if (r.clientmessageid === e) {
          W.scrollToMessage(r);
          K = null;
          return;
        }
      }
      K = xt.bind(null, e);
      gt();
    }
    function Tt() {
      ht();
      U = !1;
      W.onHide();
    }
    function Nt() {
      function e(e) {
        V.publish(a.interaction.SCROLL_START, e);
      }
      return t.debounce(e, 1000, {
        leading: !0,
        trailing: !1
      });
    }
    function Ct(e) {
      z = e;
      e || ht();
    }
    function kt() {
      j.isHistoryDisclosed() && gt();
    }
    function Lt() {
      var e = n.fullScreenElement && n.fullScreenElement !== null || n.mozFullScreen || n.webkitIsFullScreen;
      return e || J;
    }
    function At() {
      J = !0;
    }
    function Ot(e) {
      J = !1;
      e && xt(e);
    }
    function Mt() {
      function n(e) {
        W.isMessageVisible(e.id) && j._messagesWithUnseenHearts.remove(e.id);
      }
      var e = j._messagesWithUnseenHearts();
      if (e.length === 0)
        return;
      t.forEach(e, n);
    }
    function _t(e) {
      var n = b.messageFilters && b.messageFilters.chatLogMessageFilter ? b.messageFilters.chatLogMessageFilter : null;
      return t.isFunction(n) ? n(e) : !0;
    }
    function Dt(e, t) {
      _.conversation.historyService.removeCustomActivityItem(S.activityType.ContactRequestOutgoing);
      _.conversation.historyService.removeCustomActivityItem(S.activityType.ContactRequestIsNowContact);
      _.conversation.historyService.addCustomActivityItem(e, { sender: t });
    }
    function Pt(e) {
      var t = _.participants(0).person;
      e.id() === t.id() && Dt(S.activityType.ContactRequestOutgoing, t);
    }
    function Ht(e) {
      var t = _.participants(0).person;
      e.id() === t.id() && _.conversation.historyService.removeCustomActivityItem(S.activityType.ContactRequestOutgoing);
    }
    function Bt() {
      var e;
      if (!Q.isFeatureOn(u.featureFlags.ENABLE_BUSINESS_CONTACT_MANAGEMENT))
        return;
      var t = d.resolve(u.serviceLocator.SUBSCRIPTION_PROVIDER);
      t.getContacts().then(function () {
        if (_.conversation.isGroupConversation() || _.participants.size() !== 1)
          return;
        e = _.participants(0).person;
        !x.isKnownPerson(e) && !x.isWelcomeAgent(e) && Dt(S.activityType.ContactRequestOutgoing, e);
        w.get().personsAndGroupsManager.all.persons.removed(Pt);
        w.get().personsAndGroupsManager.all.persons.added(Ht);
      });
    }
    function jt() {
      var e, t, n;
      _.showIntroText = Q.isFeatureOn(u.featureFlags.SHOW_CHAT_INTRO_TEXT);
      if (!_.showIntroText)
        return;
      _.introMessages = [];
      b.chatIntroText && b.chatIntroText.key && (e = b.chatIntroText.key);
      if (!e)
        return;
      b.chatIntroText && b.chatIntroText.delimiter && (n = b.chatIntroText.delimiter);
      t = m.fetch({ key: e });
      if (!t)
        return;
      n ? t.split(n).forEach(function (e) {
        _.introMessages.push({ text: e.trim() });
      }) : _.introMessages.push({ text: t.trim() });
    }
    function Ft() {
      function i() {
        return t.model.type() === S.activityType.UnblockContact || t.model.type() === S.activityType.ContactRequestOutgoing;
      }
      var e, t, n, r = _.collection();
      if (r === undefined || r.length <= 0)
        return;
      t = r[r.length - 1];
      if (i())
        return;
      t.authorName && (e = t.authorName());
      t.author && t.author.displayName && (e = t.author.displayName());
      n = y.stripHTML(t.content());
      e ? E.announce({
        key: "accessibility_chatLog_newMessage",
        params: {
          author: e,
          content: n
        }
      }, { key: t.clientmessageid }) : E.announce({
        key: "accessibility_chatLog_newMessage_withoutAuthor",
        params: { content: n }
      }, { key: t.clientmessageid });
      pt(t);
    }
    function It(e) {
      var t = N.getElement("[data-id=\"" + e + "\"]");
      t && t.focus();
    }
    var _ = this, D = {}, P, H, B, j, F, I, q, R, U = !0, z, W, X, V = d.resolve(u.serviceLocator.PUBSUB), $ = Nt(), J, K, Q = d.resolve(u.serviceLocator.FEATURE_FLAGS), G = Q.isFeatureOn(u.featureFlags.HEARTS_ENABLED), Y = Q.isFeatureOn(u.featureFlags.MARK_READ_MESSAGES_V2_ENABLED), Z, et = null;
    this.collection = r.observableArray();
    this.participants = null;
    this.init = function (e, t, i, s) {
      V.subscribe(u.events.narrowMode.SIDEBAR_STATE_CHANGED, Ct);
      V.subscribe(u.events.videoPlayer.FULLSCREEN_ON, At);
      V.subscribe(u.events.videoPlayer.FULLSCREEN_OFF, Ot);
      V.subscribe(u.events.message.REMOVED, It);
      W = t;
      P = i;
      j = e.historyService;
      h.forModel(e);
      F = o.newObservableCollection(j.activityItems);
      _.conversation = e;
      _.participants = e.participants;
      _.isMouseOver = r.observable();
      _.suggestedActionsEnabled = Q.isFeatureOn(u.featureFlags.SUGGESTED_ACTIONS_ENABLED);
      _.showSuggestedActions = r.observable(!1);
      _.hasSuggestedActionOnLeft = r.observable(!1);
      _.hasSuggestedActionOnRight = r.observable(!1);
      _.suggestedActionsAuthor = {};
      _.suggestedActions = r.observableArray([]);
      _.showBotDetails = r.pureComputed(function () {
        return e.isGroupConversation() && _.showSuggestedActions() && !!_.suggestedActionsAuthor.displayName && !!_.suggestedActionsAuthor.avatar;
      });
      _.suggestionChanged = function () {
        var e = W ? W.getArrowsPositions() : null;
        if (!e)
          return;
        _.hasSuggestedActionOnLeft(e.left);
        _.hasSuggestedActionOnRight(e.right);
      };
      _.scrollLeft = function () {
        W.scrollSuggestedArea("left", _.suggestionChanged);
      };
      _.scrollRight = function () {
        W.scrollSuggestedArea("right", _.suggestionChanged);
      };
      W.init({
        onContextMenu: _.showContextMenu,
        onMessageVisibilityChange: _.messageVisibilityChange
      }, e);
      B = v.hasFocus.subscribe(ht);
      Z = _.collection.subscribe(Ft);
      R = j.isHistoryDisclosed.changed(kt);
      this.registerEvent(a.message.RENDERED, bt);
      this.registerEvent(a.navigation.FRAGMENT_BEFORE_HIDE, Tt, this.DIRECTION.PARENT);
      this.forwardEvent(a.navigation.FRAGMENT_SHOW, this.DIRECTION.CHILD, St, this.DIRECTION.PARENT);
      this.forwardEvent(a.navigation.FRAGMENT_BEFORE_HIDE, this.DIRECTION.CHILD, null);
      this.forwardEvent(a.conversation.OPEN_PROFILE, this.DIRECTION.PARENT, null, this.DIRECTION.CHILD);
      this.forwardEvent(a.message.ADD_CONTACT, this.DIRECTION.PARENT, null, this.DIRECTION.CHILD);
      this.registerEvent(a.conversation.MARK_AS_READ, ht);
      this.registerEvent(a.message.BEFORE_EXPANDED, Et);
      this.registerEvent(a.message.AFTER_EXPANDED, wt);
      this.registerEvent(u.events.videoPlayer.FULLSCREEN_ON, Et);
      this.registerEvent(u.events.videoPlayer.FULLSCREEN_OFF, wt);
      G && _.conversation.historyService._messagesWithUnseenHearts && j._messagesWithUnseenHearts.changed(Mt);
      X = s;
      p.execute(at);
      Bt();
      jt();
      _.suggestedActionsEnabled && (n.addEventListener("resize", _.suggestionChanged), window.setTimeout(function () {
        _.suggestionChanged();
      }, 100));
    };
    this.onMouseOver = function () {
      _.isMouseOver(!0);
    };
    this.onMouseOut = function () {
      _.isMouseOver(!1);
    };
    this.onScroll = function (e, t) {
      W && ($(t), W.onScroll(t, A), W.isScrolledToTop() && !_._updatingMessages && !Lt() && gt(), Y ? (clearTimeout(et), et = setTimeout(function () {
        ht(_.isMouseOver());
      }, O)) : ht());
    };
    this.dispose = function () {
      W.dispose();
      q && q.dispose();
      H && H.dispose();
      R && R.dispose();
      _.showBotDetails.dispose();
      B.dispose();
      Z.dispose();
      X.dispose();
      V.unsubscribe(u.events.narrowMode.SIDEBAR_STATE_CHANGED, Ct);
      V.unsubscribe(u.events.videoPlayer.FULLSCREEN_ON, At);
      V.unsubscribe(u.events.videoPlayer.FULLSCREEN_OFF, Ot);
      V.unsubscribe(u.events.message.REMOVED, It);
      H = null;
      _.collection = null;
      W = null;
      F = null;
      D = null;
      G && j._messagesWithUnseenHearts && j._messagesWithUnseenHearts.changed.off(Mt);
      Q.isFeatureOn(u.featureFlags.ENABLE_BUSINESS_CONTACT_MANAGEMENT) && (w.get().personsAndGroupsManager.all.persons.removed.off(Pt), w.get().personsAndGroupsManager.all.persons.added.off(Ht));
      _.suggestedActionsEnabled && n.removeEventListener("resize", _.suggestionChanged);
    };
    this.showContextMenu = function (e, t, n) {
      var r = D[e], i = r && r.model, s = [], o = { source: g.conversation.messageItem }, u, a = _.conversation.chatService.sendMessage.enabled();
      if (!i || !a)
        return;
      return n ? (s.push(new c.CopySelectionMenuItem(_, i, n)), s.push(new c.CopySelectionTextMenuItem(_, i, n))) : (u = {
        source: g.contextMenuItem.removeMessage,
        parent: g.conversation.messageItem
      }, s.push(new c.CopyMessageMenuItem(_, i)), s.push(new c.QuoteMessageMenuItem(_, i)), s.push(new c.EditMessageMenuItem(_, i)), s.push(new c.RemoveMessageMenuItem(i, u)), s.push(new c.CopyLinkMenuItem(_, r, t)), s.push(new c.OpenLinkMenuItem(_, r, t)), s.push(new c.SaveVideoMessageMenuItem(i))), l.show(s, t, o), l.isVisible();
    };
    this.messageVisibilityChange = function (e) {
      if (!U)
        return;
      var t = [];
      e.forEach(function (e) {
        t.push(e.getAttribute("data-id"));
      });
      C.onVisibleViewPortChanged(_.conversation.conversationId, t);
    };
  }
  var t = e("lodash-compat"), n = e("browser/document"), r = e("vendor/knockout"), i = e("utils/common/ko"), s = e("swx-utils-common").array, o = e("utils/common/cafeObservable"), u = e("swx-constants").COMMON, a = e("swx-constants").COMMON.events, f = e("utils/common/eventMixin"), l = e("ui/contextMenu/contextMenu"), c = e("ui/contextMenu/items/all"), h = e("swx-utils-chat").conversationCache, p = e("swx-utils-common").async, d = e("swx-service-locator-instance").default, v = e("utils/common/appVisibilityProvider"), m = e("swx-i18n").localization, g = e("ui/telemetry/actions/actionSources"), y = e("swx-utils-chat").messageSanitizer, b = e("experience/settings"), w = e("swx-cafe-application-instance"), E = e("utils/common/accessibility").narrator, S = e("swx-enums"), x = e("ui/modelHelpers/personHelper"), T = e("swx-log-tracer").getLogger(), N = e("browser/dom"), C = e("ui/players/mediaPlayerController"), k = 10, L = 10, A = 300, O = 400, M = 51;
  return t.assign(_.prototype, f), _;
});
