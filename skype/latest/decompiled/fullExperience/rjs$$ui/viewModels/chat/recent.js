define("ui/viewModels/chat/recent", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "swx-i18n",
  "swx-constants",
  "swx-enums",
  "swx-pubsub-instance",
  "swx-service-locator-instance",
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
  "ui/viewModels/chat/conversationTopic",
  "utils/common/styleModeHelper"
], function (e) {
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("swx-i18n").localization, i = e("swx-constants").COMMON, s = e("swx-enums"), o = e("swx-pubsub-instance").default, u = e("swx-service-locator-instance").default, a = e("services/telemetry/common/telemetryContext"), f = e("services/telemetry/logging/perf/main"), l = e("utils/common/cafeObservable"), c = e("utils/common/ko"), h = e("ui/contextMenu/contextMenu"), p = e("ui/contextMenu/items/all"), d = e("ui/contextMenu/menuItemHelper"), v = e("ui/telemetry/actions/actionSources"), m = e("ui/viewModels/calling/helpers/textFormatter"), g = e("ui/viewModels/chat/conversationActivity"), y = e("ui/viewModels/chat/conversationTile"), b = e("ui/viewModels/chat/conversationTopic"), w = e("utils/common/styleModeHelper"), E = i.events.navigation;
  return function (S) {
    function R() {
      x.hasUnseenHearts(C.historyService._messagesWithUnseenHearts.size() > 0);
    }
    function U(e, t) {
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
    function z(e) {
      var t = 50, n = e();
      return n >= t ? t + "+" : n === 0 ? "" : n;
    }
    function W() {
      var e = A();
      return e ? e.direction === s.direction.Outgoing : !1;
    }
    function X() {
      return O.currentPlaceModel() === C;
    }
    function V() {
      return x.unreadCount() === 0 && (!x.unreadWithKeywordsCount || x.unreadWithKeywordsCount() === 0);
    }
    function $() {
      var e = A(), t;
      if (!e)
        return;
      return e.model.type() === s.activityType.ContactRequestIsNowContact ? r.fetch({
        key: "message_text_isNowAContact",
        params: { id: e.model.sender.id() }
      }) : (t = e.content(), /<\/a>/i.test(t) && (t = t.replace(/ onclick="[^"]+"/i, ""), t = t.replace(/ title="[^"]+"/i, "")), t);
    }
    function J() {
      var e = k(), n = e[e.length - 1], r;
      if (!n || t.isEmpty(n))
        return null;
      if (T && n.key() === T.clientmessageid)
        return T;
      r = new S({
        noUrlPreview: !0,
        noTranslationItem: !0
      });
      r.init(n, C);
      x.isLiveSession(r.group() === i.activityItemGroups.CALL);
      x.isInfoMessage(r.group() === i.activityItemGroups.CONTACT_REQUEST);
      if (x.isLiveSession.peek())
        x.callAction(r.callAction || ""), L("live-session");
      else if (x.isInfoMessage.peek()) {
        var s = r.model.type(), o = K(s);
        x.infoType(o);
        L("info");
      } else
        L("message");
      return T && T.dispose(), T = r, r;
    }
    function K(e) {
      return e === s.activityType.ContactRequestIncoming ? "contactAdd" : e === s.activityType.ContactRequestIsNowContact ? "contact" : "";
    }
    function Q() {
      var e, t = x.isRead();
      return e = {
        message: t,
        "live-session": !1,
        "file-transfer": !1,
        info: !1,
        unknown: !1,
        contact: !1,
        media: !1
      }, t || (e[L()] = !0), e.read = t, e.unread = !t, e.lightNotification = !x.notificationEnabled() && (!x.unreadWithKeywordsCount || x.unreadWithKeywordsCount() === 0), e.hide = x.isOnCall() || x.isBlocked() || x.canJoinCall(), e.active = x.isActive(), e.group = x.isGroupConversation(), e.unseenHeart = x.displayUnseenHeartsIcon(), e;
    }
    function G() {
      var e = M.callDuration(), t = w.get().currentMode() === i.styleMode.NARROW;
      return e < 0 ? "" : m.getFormattedDuration(e, t);
    }
    var x = this, T, N, C, k, L, A, O, M, D, P = 300, H = u.resolve(i.serviceLocator.FEATURE_FLAGS), B, j, F, I, q;
    x.init = function (t) {
      C = t;
      M = g.build(t);
      D = b.build(t);
      L = n.observable("message");
      N = y.build(C);
      O = u.resolve(i.serviceLocator.NAVIGATION_CONTEXT);
      B = H.isFeatureOn(i.featureFlags.HEARTS_ENABLED);
      j = H.isFeatureOn(i.featureFlags.HEARTS_NOTIFICATION_ENABLED);
      F = H.isFeatureOn(i.featureFlags.FAVORITES_CONVERSATION_ENABLED);
      I = H.isFeatureOn(i.featureFlags.MUTE_SPECIFIC_CONVERSATIONS_ENABLED);
      x.displayMessage = N.displayMessage;
      x.isBlocked = N.isBlocked;
      x.topic = D.topic;
      x.displayName = D.displayName;
      x.isPstn = N.isPstn;
      x.unreadCount = l.newObservableProperty(C.historyService.unreadActivityItemsCount);
      k = l.newObservableCollection(C.historyService.activityItems);
      x.isLiveSession = n.observable(!1);
      x.callAction = n.observable("");
      x.isOnCall = M.isOnCall;
      x.canJoinCall = M.canJoinCall;
      x.isFavorited = C._isFavorited ? l.newObservableProperty(C._isFavorited) : n.observable(!1);
      x.isInfoMessage = n.observable(!1);
      x.infoType = n.observable("");
      x.isGroupConversation = l.newObservableProperty(C.isGroupConversation);
      x.avatarUrl = l.newObservableProperty(C.avatarUrl, { keepAlive: !0 });
      x.timestamp = l.newObservableProperty(C.lastModificationTimestamp);
      x.statusClassName = N.statusClassName;
      x.groupSearchResults = n.observable(0);
      x.ariaRole = n.computed(function () {
        return w.get().isIntegratedProperty() ? "presentation" : "menuitem";
      });
      x.conversation = C;
      x.isAgent = N.isAgent;
      x.isCertifiedAgent = N.isCertifiedAgent;
      x.isPstn = N.isPstn;
      x.unreadActivityItemsCount = n.computed(z.bind(null, x.unreadCount));
      C.historyService._unreadActivityItemsWithKeywordsCount ? (x.unreadWithKeywordsCount = l.newObservableProperty(C.historyService._unreadActivityItemsWithKeywordsCount), x.unreadActivityItemsWithKeywordsCount = n.computed(z.bind(null, x.unreadWithKeywordsCount))) : x.unreadActivityItemsWithKeywordsCount = n.observable(!1);
      x.notificationEnabled = n.observable(!0);
      x.displayNotificationsDisabledIndicator = n.computed(function () {
        return I && !x.notificationEnabled();
      });
      A = n.computed(J);
      x.lastMessageIsOutgoing = n.computed(W);
      x.content = n.computed($);
      x.isActive = n.computed(X);
      x.isRead = n.computed(V).extend({ rateLimit: P });
      x.hasUnseenHearts = n.observable(!1);
      x.displayUnseenHeartsIcon = n.computed(function () {
        return j && x.hasUnseenHearts() && !x.isActive();
      });
      B && j && C.historyService._messagesWithUnseenHearts.changed(R);
      x.cssClass = n.computed(Q);
      x.callDuration = n.computed(G);
      C._notificationsEnabled && (q = C._notificationsEnabled.changed(function (e) {
        x.notificationEnabled(e);
      }));
    };
    x.dispose = function () {
      x.unreadActivityItemsCount.dispose();
      A.dispose();
      x.lastMessageIsOutgoing.dispose();
      x.content.dispose();
      x.isActive.dispose();
      x.isRead.dispose();
      x.cssClass.dispose();
      D.dispose();
      N.dispose();
      T && (T.dispose(), T = null);
      M.dispose();
      B && j && C.historyService._messagesWithUnseenHearts.changed.off(R);
      x.displayUnseenHeartsIcon.dispose();
      q && q.dispose();
      x.unreadActivityItemsWithKeywordsCount && x.unreadActivityItemsWithKeywordsCount.dispose && x.unreadActivityItemsWithKeywordsCount.dispose();
    };
    x.showContextMenu = function (e, n) {
      function u() {
        if (!F)
          return;
        x.isFavorited() ? x.isGroupConversation() ? s.push(new p.RemoveGroupConversationFromFavoritesMenuItem(C, v.recentItem)) : s.push(new p.RemoveContactFromFavoritesMenuItem(C.participants(0).person, v.recentItem)) : x.isGroupConversation() ? s.push(new p.AddGroupConversationToFavoritesMenuItem(C, v.recentItem)) : s.push(new p.AddContactToFavoritesMenuItem(C.participants(0).person, v.recentItem));
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
        s.push(new p.DeleteContactMenuItem(e, i));
        d.sortMenuItems(s);
        h.show(s, n, o, !0);
      }
      if (x.isOnCall())
        return;
      var r = i.telemetry.historyLoadOrigin.TIMELINE_CLICK, s = [
          new p.LeaveConversationMenuItem(C),
          new p.RemoveConversationMenuItem(C),
          new p.MuteConversationMenuItem(C),
          new p.UnmuteConversationMenuItem(C),
          new p.MarkConversationAsReadMenuItem(C),
          new p.MarkAllConversationsAsReadMenuItem(C)
        ], o = {
          source: v.recentItem,
          isGroupConversation: !1
        };
      u();
      x.isGroupConversation() ? (o.isGroupConversation = !0, h.show(s, n, o, !0)) : c.once(N.contact, t.isObject, a);
    };
    x.handleClick = function (t, n) {
      var r = i.telemetry.historyLoadOrigin.TIMELINE_CLICK;
      f.getInstance().startTrace("navigateConversation");
      n.preventDefault();
      if (!t.model.isActive()) {
        var s = a.get();
        s.timelineInSearchMode && (r = i.telemetry.historyLoadOrigin.GROUP_SEARCH);
      }
      o.publish(E.OPEN_CONVERSATION, {
        model: C,
        origin: r
      });
    };
    x.ariaLabel = n.pureComputed(function () {
      var e, t, n;
      return e = x.unreadCount() > 0, t = U(x.isGroupConversation(), e), n = x.displayNotificationsDisabledIndicator() ? r.fetch({ key: "accessibility_recentItem_conversation_muted" }) : "", r.fetch({
        key: t,
        count: x.unreadCount(),
        params: {
          topic: x.topic(),
          muted: n
        }
      });
    });
    x.getSearchItemDetails = function (e) {
      var t = "";
      return x.isGroupConversation() ? (x.displayMessage() ? t = r.fetch({
        key: "accessibility_searchItem_group_displayMessage",
        params: {
          groupName: x.topic(),
          displayMessage: x.displayMessage(),
          index: e + 1,
          totalResults: x.groupSearchResults()
        }
      }) : t = r.fetch({
        key: "accessibility_searchItem_group",
        params: {
          groupName: x.topic(),
          index: e + 1,
          totalResults: x.groupSearchResults()
        }
      }), t) : t;
    };
  };
});
