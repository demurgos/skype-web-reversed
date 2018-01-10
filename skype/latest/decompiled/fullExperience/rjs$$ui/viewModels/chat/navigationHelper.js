define("ui/viewModels/chat/navigationHelper", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-pubsub-instance",
  "swx-constants",
  "constants/components"
], function (e, t) {
  var n = e("lodash-compat"), r = e("swx-pubsub-instance").default, i = e("swx-constants").COMMON, s = e("constants/components");
  t.navigateToContactsPage = function (t) {
    function o() {
      r.publish(i.events.navigation.NAVIGATE, { page: s.people.CONTACTS_PAGE });
      t();
    }
    t = n.isFunction(t) ? t : n.noop;
    o();
  };
  t.navigateToConversation = function (t, n) {
    r.publish(i.events.navigation.OPEN_CONVERSATION, {
      model: t,
      origin: n
    });
  };
});
