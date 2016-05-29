define("notifications/factory", [
  "require",
  "constants/common",
  "swx-i18n",
  "notifications/types/incomingCall",
  "notifications/types/hardware",
  "notifications/types/avatar",
  "notifications/types/callingNotSupported",
  "notifications/types/unreadMessage",
  "notifications/types/contactRequest",
  "notifications/types/chatRequest"
], function (e) {
  function l(e, l) {
    var c = t.notifications;
    switch (e) {
    case c.INCOMING_CALL:
      return r.build(l.conversation, !0);
    case c.INCOMING_CALL_WITH_NO_PLUGIN:
      return r.build(l.conversation, !1);
    case c.DEVICE_MISSING_CAMERA:
      return i.build(c.WARNING, n.fetch({ key: "notification_text_hardware_camera" }));
    case c.DEVICE_MISSING_MICROPHONE:
      return i.build(c.WARNING, n.fetch({ key: "notification_text_hardware_mic" }));
    case c.DEVICE_MISSING_SPEAKER:
      return i.build(c.ERROR, n.fetch({ key: "notification_text_hardware_speaker" }));
    case c.INCOMING_CALL_BROWSER_NOT_SUPPORTED:
      return o.build(!1, l.conversation);
    case c.INCOMING_CALL_OS_NOT_SUPPORTED:
      return o.build(!0, l.conversation);
    case c.UNREAD_MESSAGE:
      return u.build(l);
    case c.CONTACT_REQUEST:
      return a.build(l);
    case c.CHAT:
      return f.build(l);
    case c.AVATAR_NOT_SUPPORTED_IMAGE_TYPE:
      return s.build(c.ERROR, n.fetch({ key: "notification_text_avatar_not_supported_image_type" }));
    case c.AVATAR_UPLOAD_ERROR:
      return s.build(c.ERROR, n.fetch({ key: "notification_text_avatar_upload_error" }));
    }
  }
  var t = e("constants/common"), n = e("swx-i18n").localization, r = e("notifications/types/incomingCall"), i = e("notifications/types/hardware"), s = e("notifications/types/avatar"), o = e("notifications/types/callingNotSupported"), u = e("notifications/types/unreadMessage"), a = e("notifications/types/contactRequest"), f = e("notifications/types/chatRequest");
  return { build: l };
});
