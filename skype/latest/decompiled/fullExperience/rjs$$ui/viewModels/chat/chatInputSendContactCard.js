define("ui/viewModels/chat/chatInputSendContactCard", [
  "require",
  "exports",
  "module",
  "swx-constants",
  "utils/common/eventMixin",
  "lodash-compat",
  "swx-i18n",
  "swx-pubsub-instance",
  "telemetry/chat/sendContactsTelemetry",
  "utils/common/accessibility",
  "swx-focus-handler",
  "browser/dom"
], function (e, t) {
  function c(e) {
    function r() {
      var e = ".swx .chat .inputField", t = l.getElement(e);
      t && f.get().addFocusRequestToQueue(t);
    }
    var t = this;
    t.conversationModel = e.conversationModel;
    t.isDisabled = e.isDisabled;
    t.openShareControl = function () {
      var e = u.build(t.conversationModel), i = function (n) {
          n.length > 0 && (t.conversationModel.sendContactInfo(n), r(), e.numberOfContacts = n.length, e.confirmed(), a.announce({ key: "accessibility_contact_sent" }));
        }, f = {
          conversationModel: t.conversationModel,
          title: s.fetch({ key: "send_contacts_action_title" }),
          description: s.fetch({ key: "send_contacts_action_text" }),
          confirmButtonTitleKey: "action_button_send",
          onConfirm: i,
          onCancel: function () {
            e.canceled();
          }
        };
      t.dispatchEvent(n.events.mediaPicker.CLOSE_PICKER, t.DIRECTION.PARENT);
      o.publish(n.events.shareControl.SHARE_CONTROL_SHOW, f);
    };
    t.registerEvent(n.events.mediaPicker.SEND_CONTACTS_SELECTED, t.openShareControl);
  }
  var n = e("swx-constants").COMMON, r = e("utils/common/eventMixin"), i = e("lodash-compat"), s = e("swx-i18n").localization, o = e("swx-pubsub-instance").default, u = e("telemetry/chat/sendContactsTelemetry"), a = e("utils/common/accessibility").narrator, f = e("swx-focus-handler"), l = e("browser/dom");
  t.build = function (e) {
    return new c(e);
  };
  i.assign(c.prototype, r);
});
