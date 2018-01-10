define("notifications/common/browserNativeNotification", [
  "require",
  "exports",
  "module",
  "swx-browser-globals",
  "swx-i18n",
  "swx-constants"
], function (e, t) {
  function s(e, t, r) {
    var i, s = n.getWindow(), u, a = e.title() || e.sender.displayName();
    t.icon = e.sender.avatar();
    e.active(!0);
    i = new s.Notification(a, t);
    u = e.active.subscribe(function (e) {
      e === !1 && i.close();
    });
    e.sound.play();
    e.onshow && e.onshow();
    i.onclick = function () {
      i.close();
      r || (e.open && e.open(), o());
      s.focus();
    };
    i.onclose = function () {
      u && u.dispose();
    };
  }
  function o() {
    var e = n.getWindow();
    e.$WLXIM && e.$WLXIM.showSidebar();
  }
  var n = e("swx-browser-globals"), r = e("swx-i18n").localization, i = e("swx-constants").COMMON;
  return t.create = function (e) {
    var t = i.notifications, n, o = !1;
    switch (e.type) {
    case t.CHAT:
    case t.UNREAD_MESSAGE:
    case t.CONTACT_REQUEST:
      n = { body: e.description() }, s(e, n, o);
      break;
    case t.AUDIO_WITHOUT_VIDEO:
    case t.AUDIO:
    case t.INCOMING_CALL:
      n = { body: r.fetch({ key: "toast_incoming_text_title" }) }, o = !0, s(e, n, o);
    }
  }, t;
});
