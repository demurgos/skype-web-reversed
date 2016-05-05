define("notifications/modelObservers/contactRequestObserver", [
  "require",
  "constants/common",
  "swx-enums",
  "notifications/factory",
  "notifications/common/notificationHub"
], function (e) {
  function s() {
    function e(e) {
      e.historyService.activityItems.added(function (t) {
        s(e, t);
      });
    }
    function s(e, t) {
      t.type() === n.activityType.ContactRequestIncoming && t.isRead.once(!1, function () {
        o(e, t);
      });
    }
    function o(e, n) {
      var i, s = {
          conversation: e,
          activityItem: n
        };
      i = r.build(t.notifications.CONTACT_REQUEST, s), u(i), n.isRead.once(!0, function () {
        i.active(!1);
      });
    }
    function u(e) {
      function n() {
        t.dispose();
      }
      var t;
      e.sender.uri() ? i.notify(e) : t = e.sender.uri.subscribe(function (t) {
        t && (i.notify(e), n());
      });
    }
    this.observe = function (t) {
      t.conversationsManager.conversations.added(e);
    };
  }
  var t = e("constants/common"), n = e("swx-enums"), r = e("notifications/factory"), i = e("notifications/common/notificationHub");
  return {
    build: function () {
      return new s();
    }
  };
})
