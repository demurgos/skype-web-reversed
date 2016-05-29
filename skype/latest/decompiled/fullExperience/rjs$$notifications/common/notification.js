define("notifications/common/notification", [
  "require",
  "vendor/knockout",
  "ui/controls/calling/sounds",
  "constants/common",
  "telemetry/notifications/notificationActions"
], function (e) {
  var t = e("vendor/knockout"), n = e("ui/controls/calling/sounds"), r = e("constants/common"), i = r.telemetry.notificationActionsEvent, s = e("telemetry/notifications/notificationActions");
  return function (e, r, o, u) {
    function d() {
      c = a.active.subscribe(function (e) {
        c.dispose();
        e || a.sound.stop();
      });
    }
    function v(e) {
      return e && e.key;
    }
    var a = this, f = v(u) ? u.key : n.KEYS.MESSAGE_RECEIVED_1, l = v(u) ? u.loop : !1, c, h = s.build(), p = { type: e };
    this.type = e;
    this.sender = r || {};
    o = o || {};
    this.title = t.observable("");
    this.description = t.observable("");
    this.active = t.observable(!1);
    this.accept = function () {
      p.action = i.action.accept;
      a.active() && o.accept && (o.accept.apply(null, arguments), h.send(p));
      a.active(!1);
    };
    this.decline = function () {
      p.action = i.action.decline;
      a.active() && o.decline && (o.decline(), h.send(p));
      a.active(!1);
    };
    this.open = function () {
      p.action = i.action.open;
      a.active() && o.open && (o.open(), h.send(p));
      a.active(!1);
    };
    this.sound = {
      play: function () {
        a.active() && (l ? n.playLoop(f) : n.playOnce(f), d());
      },
      stop: function () {
        n.stop(f);
      }
    };
  };
});
