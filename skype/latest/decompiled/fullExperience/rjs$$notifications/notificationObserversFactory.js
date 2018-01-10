define("notifications/notificationObserversFactory", [
  "require",
  "exports",
  "module",
  "notifications/modelObservers/incomingCallObserver",
  "notifications/modelObservers/unreadMessageObserver",
  "notifications/modelObservers/contactRequestObserver",
  "notifications/modelObservers/chatRequestObserver",
  "swx-constants",
  "swx-service-locator-instance"
], function (e, t) {
  function a() {
    var e = [], t = u.resolve(o.serviceLocator.FEATURE_FLAGS);
    return t.isFeatureOn(o.featureFlags.INCOMING_CALL_TOAST_NOTIFICATIONS) && e.push(n.build()), t.isFeatureOn(o.featureFlags.UNREAD_MESSAGE_TOAST_NOTIFICATIONS) && e.push(r.build()), t.isFeatureOn(o.featureFlags.CONTACT_REQUEST_TOAST_NOTIFICATIONS) && e.push(i.build()), t.isFeatureOn(o.featureFlags.CHAT_REQUEST_TOAST_NOTIFICATIONS) && e.push(s.build()), e;
  }
  var n = e("notifications/modelObservers/incomingCallObserver"), r = e("notifications/modelObservers/unreadMessageObserver"), i = e("notifications/modelObservers/contactRequestObserver"), s = e("notifications/modelObservers/chatRequestObserver"), o = e("swx-constants").COMMON, u = e("swx-service-locator-instance").default;
  t.getObservers = a;
});
