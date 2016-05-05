define("notifications/modelObservers/unreadMessageObserver", [
  "require",
  "cafe/applicationInstance",
  "constants/common",
  "services/serviceLocator",
  "swx-enums",
  "notifications/factory",
  "notifications/common/notificationHub",
  "notifications/settings"
], function (e) {
  function a() {
    function c(e, r, s) {
      function o() {
        return f ? n.mentions.meIdentifier.test(r.html()) : !1;
      }
      function l() {
        return !e.chatService.shouldNotify || e.chatService.shouldNotify(r.text()) || o();
      }
      function c() {
        var e = r.sender.id() === t.get().personsAndGroupsManager.mePerson.id();
        return s ? !e : e;
      }
      function h() {
        return r.isDeleted();
      }
      function p() {
        return r.sender.isBlocked();
      }
      function d(e) {
        return /^sip:.+@anonymous\.invalid$/.test(e.id());
      }
      function v() {
        if (a)
          return !0;
        var e = t.get().personsAndGroupsManager.mePerson;
        return d(e) ? !0 : e.status() === i.onlineStatus.Online;
      }
      return r.type() !== i.activityType.TextMessage ? !1 : !u.chatNotificationsMuted() && !c() && !p() && !h() && l() && v();
    }
    function h(e) {
      e.historyService.activityItems.added(function (t) {
        p(e, t);
      }), l && e.historyService._messagesWithUnseenHearts.added(function (t) {
        d(e, t);
      });
    }
    function p(e, t) {
      c(e, t) && t.isRead.once(!1, function () {
        v(e, t);
      });
    }
    function d(e, t) {
      var r, i = {
          conversation: e,
          message: t,
          likeAdded: !0
        };
      if (!c(e, t, !0))
        return;
      r = s.build(n.notifications.UNREAD_MESSAGE, i), m(r);
    }
    function v(e, t) {
      function u() {
        r.active(!1), o.dispose();
      }
      var r, i = {
          conversation: e,
          message: t
        }, o;
      r = s.build(n.notifications.UNREAD_MESSAGE, i), m(r), o = t.html.changed(function () {
        r.description(t.text());
      }), t.isDeleted.once(!0, u), t.isRead.once(!0, u);
    }
    function m(e) {
      function n() {
        t.dispose();
      }
      var t;
      e.sender.uri() ? o.notify(e) : t = e.sender.uri.subscribe(function (t) {
        t && (o.notify(e), n());
      });
    }
    var e = r.resolve(n.serviceLocator.FEATURE_FLAGS), a = e.isFeatureOn(n.featureFlags.NOTIFY_HOST_EVEN_WHEN_ME_NOTAVAILABLE), f = e.isFeatureOn(n.featureFlags.ENABLE_AGGRESSIVE_MENTIONS_TOAST), l = e.isFeatureOn(n.featureFlags.HEARTS_ENABLED);
    this.observe = function (e) {
      e.conversationsManager.conversations.added(h);
    };
  }
  var t = e("cafe/applicationInstance"), n = e("constants/common"), r = e("services/serviceLocator"), i = e("swx-enums"), s = e("notifications/factory"), o = e("notifications/common/notificationHub"), u = e("notifications/settings");
  return {
    build: function () {
      return new a();
    }
  };
})
