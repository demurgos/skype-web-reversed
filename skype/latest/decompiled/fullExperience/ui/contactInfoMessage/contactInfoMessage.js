define("ui/contactInfoMessage/contactInfoMessage", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "utils/common/cafeObservable",
  "swx-i18n",
  "telemetry/chat/contactInfoEvent",
  "ui/modelHelpers/personHelper"
], function (e, t) {
  var n = e("vendor/knockout"), r = e("utils/common/cafeObservable"), i = e("swx-i18n").localization, s = e("telemetry/chat/contactInfoEvent"), o = e("ui/modelHelpers/personHelper");
  t.render = function (t, u, a) {
    function f(e) {
      function s(e) {
        return u.isMyself ? i.fetch({ key: "chat_contactSent_label" }) : o.isKnownPerson(e) ? i.fetch({ key: "contact_information_already_contact" }) : i.fetch({ key: "contact_information_add_to_contacts" });
      }
      var t = {};
      t.name = n.observable(e.id()), t.fullName = n.observable(e.displayName()), t.actionKey = n.observable(s(e)), t.titleKey = n.observable(i.fetch({
        key: "label_text_openConversation",
        params: { displayName: e.displayName() }
      })), t.avatar = r.newObservableProperty(e.avatarUrl, { keepAlive: !0 }), u.contacts.push(t);
    }
    function l(e) {
      return u.isMyself ? i.fetch({ key: "message_text_sentContacts" }) : i.fetch({
        key: "message_text_receivedContacts",
        params: { from: e.sender.displayName() }
      });
    }
    u.contacts = n.observableArray([]), t.contacts().forEach(function (e) {
      f(e), s.publishShowEvent({
        participantsCount: a.participantsCount(),
        timeInStale: u.timestamp.getTime(),
        person: e
      });
    }), u.content = n.observable(l(t));
  }, t.handleContactAdded = function (t, n) {
    n.contacts().forEach(function (e) {
      e.name() === t && e.actionKey(i.fetch({ key: "contact_information_already_contact" }));
    });
  };
})
