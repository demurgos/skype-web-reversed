define("notifications/factory", [
  "require",
  "swx-constants",
  "swx-i18n",
  "notifications/types/incomingCall",
  "notifications/types/hardware",
  "notifications/types/avatar",
  "notifications/types/callingNotSupported",
  "notifications/types/unreadMessage",
  "notifications/types/unreadMessageReminder",
  "notifications/types/contactRequest",
  "notifications/types/chatRequest",
  "notifications/types/education"
], function (e) {
  function h(e, h) {
    var p = t.notifications;
    switch (e) {
    case p.INCOMING_CALL:
      return r.build(h.conversation, !0);
    case p.INCOMING_CALL_WITH_NO_PLUGIN:
      return r.build(h.conversation, !1);
    case p.DEVICE_MISSING_CAMERA:
      return i.build(p.WARNING, n.fetch({ key: "notification_text_hardware_camera" }));
    case p.DEVICE_MISSING_MICROPHONE:
      return i.build(p.WARNING, n.fetch({ key: "notification_text_hardware_mic" }));
    case p.DEVICE_MISSING_SPEAKER:
      return i.build(p.ERROR, n.fetch({ key: "notification_text_hardware_speaker" }));
    case p.INCOMING_CALL_BROWSER_NOT_SUPPORTED:
      return o.build(!1, h.conversation);
    case p.INCOMING_CALL_OS_NOT_SUPPORTED:
      return o.build(!0, h.conversation);
    case p.UNREAD_MESSAGE:
      return h.isReminderToast ? a.build(h.unreadConversations) : h.educationalMessage ? c.build(h) : u.build(h);
    case p.CONTACT_REQUEST:
      return f.build(h);
    case p.CHAT:
      return l.build(h);
    case p.AVATAR_NOT_SUPPORTED_IMAGE_TYPE:
      return s.build(p.ERROR, n.fetch({ key: "notification_text_avatar_not_supported_image_type" }));
    case p.AVATAR_TOO_LARGE:
      return s.build(p.ERROR, n.fetch({ key: "notification_text_avatar_too_large" }));
    case p.AVATAR_UPLOAD_ERROR:
      return s.build(p.ERROR, n.fetch({ key: "notification_text_avatar_upload_error" }));
    }
  }
  var t = e("swx-constants").COMMON, n = e("swx-i18n").localization, r = e("notifications/types/incomingCall"), i = e("notifications/types/hardware"), s = e("notifications/types/avatar"), o = e("notifications/types/callingNotSupported"), u = e("notifications/types/unreadMessage"), a = e("notifications/types/unreadMessageReminder"), f = e("notifications/types/contactRequest"), l = e("notifications/types/chatRequest"), c = e("notifications/types/education");
  return { build: h };
});
