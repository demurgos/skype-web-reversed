define("notifications/types/contactRequest", [
  "require",
  "cafe/applicationInstance",
  "notifications/common/notification",
  "services/pubSub/pubSub",
  "constants/common",
  "swx-enums"
], function (e) {
  function o(e) {
    function h() {
      r.publish(i.events.navigation.OPEN_CONVERSATION, {
        model: o,
        origin: i.telemetry.historyLoadOrigin.NOTIFICATION_CONV
      });
    }
    function p() {
      var e = u.sender;
      t.get().personsAndGroupsManager.all.persons.add(e, e.id(), undefined, s.activityType.ContactRequestIncoming), h();
    }
    function d() {
      t.get().conversationsManager.conversations.remove(o, s.activityType.ContactRequestIncoming);
    }
    var o = e.conversation, u = e.activityItem, a, f = i.notifications.CONTACT_REQUEST, l, c;
    return l = {
      uri: u.sender.id,
      status: u.sender.status,
      displayName: u.sender.displayName,
      avatar: u.sender.avatarUrl,
      capabilities: u.sender.capabilities
    }, c = {
      accept: p,
      decline: d,
      open: h
    }, a = new n(f, l, c), a.description(u.greeting()), a.title(u.sender.title()), a;
  }
  var t = e("cafe/applicationInstance"), n = e("notifications/common/notification"), r = e("services/pubSub/pubSub"), i = e("constants/common"), s = e("swx-enums");
  return { build: o };
})
