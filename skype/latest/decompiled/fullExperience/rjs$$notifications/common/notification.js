define("notifications/common/notification", [
  "require",
  "vendor/knockout",
  "lodash-compat",
  "ui/controls/calling/sounds",
  "swx-constants",
  "notifications/settings",
  "swx-utils-common",
  "telemetry/notifications/notificationActions"
], function (e) {
  var t = e("vendor/knockout"), n = e("lodash-compat"), r = e("ui/controls/calling/sounds"), i = e("swx-constants").COMMON, s = i.telemetry.notificationActionsEvent, o = e("notifications/settings"), u = e("swx-utils-common").url, a = e("telemetry/notifications/notificationActions");
  return function (e, f, l, c) {
    function y() {
      return {
        isDelayedNotification: !!h.wasDelayed,
        displayType: h.displayType
      };
    }
    function b(e) {
      return e = w(e), e;
    }
    function w(e) {
      if (!!e.avatar) {
        var n = typeof e.avatar == "function" ? e.avatar() : e.avatar;
        n.indexOf("returnDefaultImage=false") > -1 && (n = u.removeQueryParameter(n, "returnDefaultImage"));
        e.avatar = typeof e.avatar == "function" ? t.observable(n) : n;
      }
      return e;
    }
    function E() {
      v = h.active.subscribe(function (e) {
        v.dispose();
        e || h.sound.stop();
      });
    }
    function S(e) {
      return e && e.key;
    }
    function x() {
      return o.notificationsSoundMuted() ? !1 : !o.chatNotificationsSoundMuted() || e !== i.notifications.CHAT && e !== i.notifications.UNREAD_MESSAGE ? !0 : !1;
    }
    function T() {
      return !!h.isUnreadMessage;
    }
    var h = this, p = S(c) ? c.key : r.KEYS.MESSAGE_RECEIVED_1, d = S(c) ? c.loop : !1, v, m = a.build(), g = { type: e };
    this.type = e;
    this.sender = b(n.clone(f) || {});
    l = l || {};
    this.title = t.observable("");
    this.description = t.observable("");
    this.active = t.observable();
    this.canPlaySound = x();
    this.accept = function () {
      g.action = s.action.accept;
      h.active() && l.accept && (T() && (arguments[0] = y()), l.accept.apply(null, arguments), m.send(g));
      h.active(!1);
    };
    this.decline = function () {
      g.action = s.action.decline;
      h.active() && l.decline && (l.decline(y()), m.send(g));
      h.active(!1);
    };
    this.open = function () {
      g.action = s.action.open;
      h.active() && l.open && (l.open(y()), m.send(g));
      h.active(!1);
    };
    this.sound = {
      play: function () {
        h.active() && h.canPlaySound && (d ? r.playLoop(p) : r.playOnce(p), E());
      },
      stop: function () {
        r.stop(p);
      }
    };
  };
});
