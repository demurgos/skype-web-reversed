define("notifications/notificationObserversFactory", [
  "require",
  "exports",
  "module",
  "notifications/modelObservers/incomingCallObserver",
  "notifications/modelObservers/unreadMessageObserver",
  "notifications/modelObservers/contactRequestObserver",
  "notifications/modelObservers/chatRequestObserver"
], function (e, t) {
  function o() {
    var e = [];
    return e.push(n.build()), e.push(r.build()), e.push(i.build()), e.push(s.build()), e;
  }
  var n = e("notifications/modelObservers/incomingCallObserver"), r = e("notifications/modelObservers/unreadMessageObserver"), i = e("notifications/modelObservers/contactRequestObserver"), s = e("notifications/modelObservers/chatRequestObserver");
  t.getObservers = o;
})
