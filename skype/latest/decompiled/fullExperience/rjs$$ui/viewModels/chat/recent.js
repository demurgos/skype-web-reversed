define("ui/viewModels/chat/recent", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "swx-i18n",
  "constants/common",
  "swx-enums",
  "services/pubSub/pubSub",
  "services/serviceLocator",
  "services/telemetry/common/telemetryContext",
  "services/telemetry/logging/perf/main",
  "utils/common/cafeObservable",
  "utils/common/ko",
  "ui/contextMenu/contextMenu",
  "ui/contextMenu/items/all",
  "ui/contextMenu/menuItemHelper",
  "ui/telemetry/actions/actionSources",
  "ui/viewModels/calling/helpers/textFormatter",
  "ui/viewModels/chat/conversationActivity",
  "ui/viewModels/chat/conversationTile",
  "ui/viewModels/chat/conversationTopic"
], function (e) {
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("swx-i18n").localization, i = e("constants/common"), s = e("swx-enums"), o = e("services/pubSub/pubSub"), u = e("services/serviceLocator"), a = e("services/telemetry/common/telemetryContext"), f = e("services/telemetry/logging/perf/main"), l = e("utils/common/cafeObservable"), c = e("utils/common/ko"), h = e("ui/contextMenu/contextMenu"), p = e("ui/contextMenu/items/all"), d = e("ui/contextMenu/menuItemHelper"), v = e("ui/telemetry/actions/actionSources"), m = e("ui/viewModels/calling/helpers/textFormatter"), g = e("ui/viewModels/chat/conversationActivity"), y = e("ui/viewModels/chat/conversationTile"), b = e("ui/viewModels/chat/conversationTopic"), w = i.events.navigation;
  return function (E) {
    function I() {
      S.hasUnseenHearts(N.historyService._messagesWithUnseenHearts.size() > 0);
    }
    function q(e, t) {
      var n = !e;
      if (e && t)
        return "accessibility_recentItem_group_unread";
      if (e)
        return "accessibility_recentItem_group";
      if (n && t)
        return "accessibility_recentItem_oneToOne_unread";
      if (n)
        return "accessibility_recentItem_oneToOne";
    }
    function R(e) {
      var t = 50, n = e();
      return n >= t ? t + "+" : n === 0 ? "" : n;
    }
    function U() {
      var e = L();
      return e ? e.direction === s.direction.Outgoing : !1;
    }
    function z() {
      return A.currentPlaceModel() === N;
    }
    function W() {
      return S.unreadCount() === 0 && (!S.unreadWithKeywordsCount || S.unreadWithKeywordsCount() === 0);
    }
    function X() {
      var e = L();
      if (!e)
        return;
      return e.model.type() === s.activityType.ContactRequestIsNowContact ? r.fetch({
        key: "message_text_isNowAContact",
        params: { id: e.model.sender.id() }
      }) : e.content();
    }
    function V() {
      var e = C(), n = e[e.length - 1], r;
      if (!n || t.isEmpty(n))
        return null;
      if (x && n.key() === x.clientmessageid)
        return x;
      r = new E({
        noUrlPreview: !0,
        noTranslationItem: !0
      });
      r.init(n, N);
      S.isLiveSession(r.group() === i.activityItemGroups.CALL);
      S.isInfoMessage(r.group() === i.activityItemGroups.CONTACT_REQUEST);
      if (S.isLiveSession.peek())
        S.callAction(r.callAction || ""), k("live-session");
      else if (S.isInfoMessage.peek()) {
        var s = r.model.type(), o = $(s);
        S.infoType(o);
        k("info");
      } else
        k("message");
      return x && x.dispose(), x = r, r;
    }
    function $(e) {
      return e === s.activityType.ContactRequestIncoming ? "contactAdd" : e === s.activityType.ContactRequestIsNowContact ? "contact" : "";
    }
    function J() {
      var e, t = S.isRead();
      return e = {
        message: t,
        "live-session": !1,
        "file-transfer": !1,
        info: !1,
        unknown: !1,
        contact: !1,
        media: !1
      }, t || (e[k()] = !0), e.read = t, e.unread = !t, e.lightNotification = !S.notificationEnabled() && (!S.unreadWithKeywordsCount || S.unreadWithKeywordsCount() === 0), e.hide = S.isOnCall() || S.isBlocked() || S.canJoinCall(), e.active = S.isActive(), e.group = S.isGroupConversation(), e.unseenHeart = S.displayUnseenHeartsIcon(), e;
    }
    function K() {
      var e = O.callDuration();
      return e < 0 ? "" : m.getFormattedDuration(e);
    }
    var S = this, x, T, N, C, k, L, A, O, M, D = 300, P = u.resolve(i.serviceLocator.FEATURE_FLAGS), H, B, j, F;
    S.init = function (t) {
      N = t;
      O = g.build(t);
      M = b.build(t);
      k = n.observable("message");
      T = y.build(N);
      A = u.resolve(i.serviceLocator.NAVIGATION_CONTEXT);
      H = P.isFeatureOn(i.featureFlags.HEARTS_ENABLED);
      B = P.isFeatureOn(i.featureFlags.HEARTS_NOTIFICATION_ENABLED);
      j = P.isFeatureOn(i.featureFlags.FAVORITES_CONVERSATION_ENABLED);
      S.displayMessage = T.displayMessage;
      S.isBlocked = T.isBlocked;
      S.topic = M.topic;
      S.unreadCount = l.newObservableProperty(N.historyService.unreadActivityItemsCount);
      C = l.newObservableCollection(N.historyService.activityItems);
      S.isLiveSession = n.observable(!1);
      S.callAction = n.observable("");
      S.isOnCall = O.isOnCall;
      S.canJoinCall = O.canJoinCall;
      S.isFavorited = N._isFavorited ? l.newObservableProperty(N._isFavorited) : n.observable(!1);
      S.isInfoMessage = n.observable(!1);
      S.infoType = n.observable("");
      S.isGroupConversation = l.newObservableProperty(N.isGroupConversation);
      S.avatarUrl = l.newObservableProperty(N.avatarUrl, { keepAlive: !0 });
      S.timestamp = l.newObservableProperty(N.lastModificationTimestamp);
      S.statusClassName = T.statusClassName;
      S.groupSearchResults = 0;
      S.conversation = N;
      S.isAgent = T.isAgent;
      S.isCertifiedAgent = T.isCertifiedAgent;
      S.isPstn = T.isPstn;
      S.unreadActivityItemsCount = n.computed(R.bind(null, S.unreadCount));
      N.historyService._unreadActivityItemsWithKeywordsCount ? (S.unreadWithKeywordsCount = l.newObservableProperty(N.historyService._unreadActivityItemsWithKeywordsCount), S.unreadActivityItemsWithKeywordsCount = n.computed(R.bind(null, S.unreadWithKeywordsCount))) : S.unreadActivityItemsWithKeywordsCount = n.observable(!1);
      S.notificationEnabled = n.observable(!0);
      L = n.computed(V);
      S.lastMessageIsOutgoing = n.computed(U);
      S.content = n.computed(X);
      S.isActive = n.computed(z);
      S.isRead = n.computed(W).extend({ rateLimit: D });
      S.hasUnseenHearts = n.observable(!1);
      S.displayUnseenHeartsIcon = n.computed(function () {
        return B && S.hasUnseenHearts() && !S.isActive();
      });
      H && B && N.historyService._messagesWithUnseenHearts.changed(I);
      S.cssClass = n.computed(J);
      S.callDuration = n.computed(K);
      N._notificationsEnabled && (F = N._notificationsEnabled.changed(function (e) {
        S.notificationEnabled(e);
      }));
    };
    S.dispose = function () {
      S.unreadActivityItemsCount.dispose();
      L.dispose();
      S.lastMessageIsOutgoing.dispose();
      S.content.dispose();
      S.isActive.dispose();
      S.isRead.dispose();
      S.cssClass.dispose();
      M.dispose();
      T.dispose();
      x && (x.dispose(), x = null);
      O.dispose();
      H && B && N.historyService._messagesWithUnseenHearts.changed.off(I);
      S.displayUnseenHeartsIcon.dispose();
      F && F.dispose();
      S.unreadActivityItemsWithKeywordsCount && S.unreadActivityItemsWithKeywordsCount.dispose && S.unreadActivityItemsWithKeywordsCount.dispose();
    };
    S.showContextMenu = function (e, n) {
      function u() {
        if (!j)
          return;
        S.isFavorited() ? s.push(new p.RemoveFromFavoritesMenuItem(N, v.recentItem)) : s.push(new p.AddToFavoritesMenuItem(N, v.recentItem));
      }
      function a(e) {
        var t = {
            source: v.contextMenuItem.block,
            parent: v.recentItem
          }, i = {
            source: v.contextMenuItem.deleteItem,
            parent: v.recentItem
          };
        s.push(d.getConversationContextMenuItemGroup(e, r, o));
        s.push(new p.BlockContactMenuItem(e, t));
        s.push(new p.DeleteContactMenuItem(e, r, i));
        d.sortMenuItems(s);
        h.show(s, n, o);
      }
      var r = i.telemetry.historyLoadOrigin.TIMELINE_CLICK, s = [
          new p.LeaveConversationMenuItem(N),
          new p.RemoveConversationMenuItem(N)
        ], o = {
          source: v.recentItem,
          isGroupConversation: !1
        };
      u();
      S.isGroupConversation() ? (o.isGroupConversation = !0, h.show(s, n, o)) : c.once(T.contact, t.isObject, a);
    };
    S.handleClick = function (t, n) {
      var r = i.telemetry.historyLoadOrigin.TIMELINE_CLICK;
      f.getInstance().startTrace("navigateConversation");
      n.preventDefault();
      if (!t.model.isActive()) {
        var s = a.get();
        s.timelineInSearchMode && (r = i.telemetry.historyLoadOrigin.GROUP_SEARCH);
      }
      o.publish(w.OPEN_CONVERSATION, {
        model: N,
        origin: r
      });
    };
    S.ariaLabel = n.pureComputed(function () {
      var e, t;
      return e = S.unreadCount() > 0, t = q(S.isGroupConversation(), e), r.fetch({
        key: t,
        count: S.unreadCount(),
        params: { topic: S.topic() }
      });
    });
    S.getSearchItemDetails = function (e) {
      var t = "";
      return S.isGroupConversation() ? (S.displayMessage() ? t = r.fetch({
        key: "accessibility_searchItem_group_displayMessage",
        params: {
          groupName: S.topic(),
          displayMessage: S.displayMessage(),
          index: e + 1,
          totalResults: S.groupSearchResults
        }
      }) : t = r.fetch({
        key: "accessibility_searchItem_group",
        params: {
          groupName: S.topic(),
          index: e + 1,
          totalResults: S.groupSearchResults
        }
      }), t) : t;
    };
  };
});
