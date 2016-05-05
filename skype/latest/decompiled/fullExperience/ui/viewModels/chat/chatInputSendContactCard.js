define("ui/viewModels/chat/chatInputSendContactCard", [
  "require",
  "exports",
  "module",
  "constants/common",
  "utils/common/eventMixin",
  "lodash-compat",
  "swx-i18n",
  "services/pubSub/pubSub",
  "telemetry/chat/sendContactsTelemetry"
], function (e, t) {
  function a(e) {
    var t = this;
    t.conversationModel = e.conversationModel, t.isDisabled = e.isDisabled, t.openShareControl = function () {
      var e = u.build(t.conversationModel), r = function (n) {
          n.length > 0 && (t.conversationModel.sendContactInfo(n), e.numberOfContacts = n.length, e.confirmed());
        }, i = {
          conversationModel: t.conversationModel,
          title: s.fetch({ key: "send_contacts_action_title" }),
          description: s.fetch({ key: "send_contacts_action_text" }),
          confirmButtonTitleKey: "action_button_send",
          onConfirm: r,
          onCancel: function () {
            e.canceled();
          }
        };
      t.dispatchEvent(n.events.mediaPicker.CLOSE_PICKER, t.DIRECTION.PARENT), o.publish(n.events.shareControl.SHARE_CONTROL_SHOW, i);
    }, t.registerEvent(n.events.mediaPicker.SEND_CONTACTS_SELECTED, t.openShareControl);
  }
  var n = e("constants/common"), r = e("utils/common/eventMixin"), i = e("lodash-compat"), s = e("swx-i18n").localization, o = e("services/pubSub/pubSub"), u = e("telemetry/chat/sendContactsTelemetry");
  t.build = function (e) {
    return new a(e);
  }, i.assign(a.prototype, r);
})
