define("ui/viewModels/chat/chatLog", [
  "require",
  "lodash-compat",
  "browser/document",
  "vendor/knockout",
  "utils/common/ko",
  "utils/common/array",
  "utils/common/cafeObservable",
  "constants/common",
  "constants/common",
  "utils/common/eventMixin",
  "ui/contextMenu/contextMenu",
  "ui/contextMenu/items/all",
  "utils/chat/conversationCache",
  "utils/common/async",
  "services/serviceLocator",
  "utils/common/appVisibilityProvider",
  "swx-i18n",
  "ui/telemetry/actions/actionSources",
  "utils/chat/messageSanitizer",
  "experience/settings",
  "cafe/applicationInstance",
  "swx-enums",
  "ui/modelHelpers/personHelper"
], function (e) {
  function N(e) {
    function X(t) {
      var n = new e();
      return n.init(t, f.conversation), N[n.clientmessageid] = n, n;
    }
    function V(e, t) {
      (!t.text || bt(t.text())) && s.insertAt(f.collection(), e, X(t));
    }
    function $(e, t) {
      var n = s.removeFrom(f.collection(), e);
      delete N[n.clientmessageid];
    }
    function J() {
      var e = {}, t = f.collection();
      t.forEach(function (t) {
        e = C.processMessage(t, e);
      }), C.processMyLastMessageIfAny(t), f.collection.valueHasMutated();
    }
    function K(e) {
      i.handleArrayChanges(f.collection(), e, V, $), J();
    }
    function Q() {
      D = A.activityItems.subscribe();
    }
    function G() {
      k = O.subscribe(K, null, "arrayChange");
    }
    function Y() {
      if (!O)
        return;
      F.start(), Q();
      var e = O(), t;
      e.length < x && p.execute(rt);
      if (e.length === 0) {
        G(), f.dispatchEvent(u.events.conversation.MESSAGES_LOADED, e, f.DIRECTION.PARENT);
        return;
      }
      t = e.filter(function (e) {
        return !e.text || bt(e.text());
      }), t = t.map(function (e) {
        return X(e);
      }), r.utils.arrayPushAll(f.collection(), t), J(), G(), f.dispatchEvent(u.events.conversation.MESSAGES_LOADED, e, f.DIRECTION.PARENT);
    }
    function Z() {
      H && j.isVisible() && v.hasFocus() && !B && j.isScrolledCloseToBottom() && A.markAllAsRead();
    }
    function et() {
      if (!j)
        return;
      if (it())
        return;
      f._updatingMessages = !0, j.showNewMessages(), f._updatingMessages = !1, U && U(), C.processMyBeforeLastMessageIfAny(f.collection()), Z(), !j.isScrollable() && !M && p.execute(rt), F.registerSync();
    }
    function tt() {
      F.registerSync(), M = !1, et(!0);
    }
    function nt() {
      F.registerError();
    }
    function rt() {
      A.getMoreActivityItems.enabled() && (M = !0, A.getMoreActivityItems(T).then(tt, nt));
    }
    function it() {
      return f.collection && f.collection().filter(function (e) {
        return !e.isRendered;
      }).length > 0;
    }
    function st() {
      it() || p.execute(et);
    }
    function ot() {
      j.restoreScrollPosition();
    }
    function ut() {
      if (j.isScrollPositionStored())
        return;
      j.storeScrollPosition();
    }
    function at(e) {
      H = !0, j.onShow(), Z(), lt(), e && e.messageId && ft(e.messageId);
    }
    function ft(e) {
      var t, n = f.collection();
      U = null;
      for (t = 0; t < n.length; t++) {
        var r = n[t];
        if (r.clientmessageid === e) {
          j.scrollToMessage(r), A._messagesWithUnseenHearts.remove(e), U = null;
          return;
        }
      }
      U = ft.bind(null, e), rt();
    }
    function lt() {
      j.isScrollable() || rt();
    }
    function ct() {
      Z(), H = !1, j.onHide();
    }
    function ht() {
      function e(e) {
        I.publish(a.interaction.SCROLL_START, e);
      }
      return t.debounce(e, 1000, {
        leading: !0,
        trailing: !1
      });
    }
    function pt(e) {
      B = e, e || Z();
    }
    function dt() {
      A.isHistoryDisclosed() && rt();
    }
    function vt() {
      var e = n.fullScreenElement && n.fullScreenElement !== null || n.mozFullScreen || n.webkitIsFullScreen;
      return e || R;
    }
    function mt() {
      R = !0;
    }
    function gt(e) {
      R = !1, e && ft(e);
    }
    function yt() {
      function n(e) {
        j.isMessageVisible(e.id) && A._messagesWithUnseenHearts.remove(e.id);
      }
      var e = A._messagesWithUnseenHearts();
      if (e.length === 0)
        return;
      t.forEach(e, n);
    }
    function bt(e) {
      var n = b.messageFilters && b.messageFilters.chatLogMessageFilter ? b.messageFilters.chatLogMessageFilter : null;
      return t.isFunction(n) ? n(e) : !0;
    }
    function wt(e, t) {
      f.conversation.historyService.removeCustomActivityItem(E.activityType.ContactRequestOutgoing), f.conversation.historyService.removeCustomActivityItem(E.activityType.ContactRequestIsNowContact), f.conversation.historyService.addCustomActivityItem(e, { sender: t });
    }
    function Et(e) {
      var t = f.participants(0).person;
      e.id() === t.id() && wt(E.activityType.ContactRequestOutgoing, t);
    }
    function St() {
      var e;
      if (!z.isFeatureOn(u.featureFlags.ENABLE_BUSINESS_CONTACT_MANAGEMENT))
        return;
      if (f.conversation.isGroupConversation() || f.participants.size() !== 1)
        return;
      e = f.participants(0).person, S.isKnownPerson(e) || wt(E.activityType.ContactRequestOutgoing, e), w.get().personsAndGroupsManager.all.persons.removed(Et);
    }
    function xt() {
      var e, t, n;
      f.showIntroText = z.isFeatureOn(u.featureFlags.SHOW_CHAT_INTRO_TEXT);
      if (!f.showIntroText)
        return;
      f.introMessages = [], b.chatIntroText && b.chatIntroText.key && (e = b.chatIntroText.key);
      if (!e)
        return;
      b.chatIntroText && b.chatIntroText.delimiter && (n = b.chatIntroText.delimiter), t = m.fetch({ key: e });
      if (!t)
        return;
      n ? t.split(n).forEach(function (e) {
        f.introMessages.push({ text: e.trim() });
      }) : f.introMessages.push({ text: t.trim() });
    }
    var f = this, N = {}, C, k, L, A, O, M, D, P, H = !0, B, j, F, I = d.resolve(u.serviceLocator.PUBSUB), q = ht(), R, U, z = d.resolve(u.serviceLocator.FEATURE_FLAGS), W = z.isFeatureOn(u.featureFlags.HEARTS_ENABLED);
    this.collection = r.observableArray(), this.participants = null, this.init = function (e, t, n, r) {
      I.subscribe(u.events.narrowMode.SIDEBAR_STATE_CHANGED, pt), I.subscribe(u.events.videoPlayer.FULLSCREEN_ON, mt), I.subscribe(u.events.videoPlayer.FULLSCREEN_OFF, gt), j = t, C = n, A = e.historyService, h.forModel(e), O = o.newObservableCollection(A.activityItems), f.conversation = e, f.participants = e.participants, j.init({
        onContextMenu: f.showContextMenu,
        onMessageVisibilityChange: f.messageVisibilityChange
      }, e), L = v.hasFocus.subscribe(Z), P = A.isHistoryDisclosed.changed(dt), this.registerEvent(a.message.RENDERED, st), this.registerEvent(a.navigation.FRAGMENT_SHOW, at, this.DIRECTION.PARENT), this.registerEvent(a.navigation.FRAGMENT_BEFORE_HIDE, ct, this.DIRECTION.PARENT), this.forwardEvent(a.navigation.FRAGMENT_BEFORE_HIDE, this.DIRECTION.CHILD, null), this.forwardEvent(a.conversation.OPEN_PROFILE, this.DIRECTION.PARENT, null, this.DIRECTION.CHILD), this.registerEvent(a.conversation.MARK_AS_READ, Z), this.registerEvent(a.message.BEFORE_EXPANDED, ut), this.registerEvent(a.message.AFTER_EXPANDED, ot), this.registerEvent(u.events.videoPlayer.FULLSCREEN_ON, ut), this.registerEvent(u.events.videoPlayer.FULLSCREEN_OFF, ot), W && f.conversation.historyService._messagesWithUnseenHearts && A._messagesWithUnseenHearts.changed(yt), F = r, p.execute(Y), St(), xt();
    }, this.onScroll = function (e, t) {
      j && (q(t), j.onScroll(t), j.isScrolledToTop() && !f._updatingMessages && !vt() && rt(), Z());
    }, this.dispose = function () {
      j.dispose(), D && D.dispose(), k && k.dispose(), P && P.dispose(), L.dispose(), f.ariaForNewMessage.dispose(), F.dispose(), I.unsubscribe(u.events.narrowMode.SIDEBAR_STATE_CHANGED, pt), I.unsubscribe(u.events.videoPlayer.FULLSCREEN_ON, mt), I.unsubscribe(u.events.videoPlayer.FULLSCREEN_OFF, gt), k = null, f.collection = null, j = null, O = null, N = null, W && A._messagesWithUnseenHearts && A._messagesWithUnseenHearts.changed.off(yt), z.isFeatureOn(u.featureFlags.ENABLE_BUSINESS_CONTACT_MANAGEMENT) && w.get().personsAndGroupsManager.all.persons.removed.off(Et);
    }, this.showContextMenu = function (e, t) {
      var n = N[e], r = n && n.model, i = [], s = { source: g.conversation.messageItem }, o, u = f.conversation.chatService.sendMessage.enabled();
      if (!r || !u)
        return;
      o = {
        source: g.contextMenuItem.removeMessage,
        parent: g.conversation.messageItem
      }, i.push(new c.QuoteMessageMenuItem(f, r)), i.push(new c.EditMessageMenuItem(f, r)), i.push(new c.RemoveMessageMenuItem(r, o)), i.push(new c.CopyLinkMenuItem(f, n)), i.push(new c.OpenLinkMenuItem(f, n)), i.push(new c.SaveVideoMessageMenuItem(r)), l.show(i, t, s);
    }, this.messageVisibilityChange = function (e) {
      function n(e) {
        var t = e.attributes["data-id"].value, n = A._messagesWithUnseenHearts(t);
        n && A._messagesWithUnseenHearts.remove(t);
      }
      W && A._messagesWithUnseenHearts && H && A._messagesWithUnseenHearts.size() > 0 && t.forEach(e, n), f.dispatchEvent(u.events.conversation.VIEWPORT_CHANGED, e, f.DIRECTION.PARENT);
    }, this.ariaForNewMessage = r.computed(function () {
      var e, t, n, r, i = f.collection();
      return i === undefined || i.length <= 0 ? "" : (n = i[i.length - 1], n.authorName && (e = n.authorName()), n.author && n.author.displayName && (e = n.author.displayName()), r = y.stripHTML(n.content()), t = m.fetch({
        key: "accessibility_chatLog_newMessage",
        params: {
          author: e,
          content: r
        }
      }), t);
    }), this.navigateToHeartedMessage = function () {
      function t(e, t) {
        return !e || !t ? 0 : parseInt(e.id) - parseInt(t.id);
      }
      if (!W)
        return;
      var e = A._messagesWithUnseenHearts();
      if (e.length === 0)
        return;
      var n = e.sort(t), r = n[0];
      ft(r.id), n = null;
    };
  }
  var t = e("lodash-compat"), n = e("browser/document"), r = e("vendor/knockout"), i = e("utils/common/ko"), s = e("utils/common/array"), o = e("utils/common/cafeObservable"), u = e("constants/common"), a = e("constants/common").events, f = e("utils/common/eventMixin"), l = e("ui/contextMenu/contextMenu"), c = e("ui/contextMenu/items/all"), h = e("utils/chat/conversationCache"), p = e("utils/common/async"), d = e("services/serviceLocator"), v = e("utils/common/appVisibilityProvider"), m = e("swx-i18n").localization, g = e("ui/telemetry/actions/actionSources"), y = e("utils/chat/messageSanitizer"), b = e("experience/settings"), w = e("cafe/applicationInstance"), E = e("swx-enums"), S = e("ui/modelHelpers/personHelper"), x = 10, T = 10;
  return t.assign(N.prototype, f), N;
})
