define("ui/viewModels/experience/avatarFilePicker", [
  "require",
  "ui/telemetry/actions/actionNames",
  "ui/telemetry/actions/actionSources",
  "vendor/knockout",
  "swx-constants",
  "swx-cafe-application-instance",
  "swx-i18n",
  "notifications/factory",
  "notifications/common/notificationHub",
  "swx-service-locator-instance",
  "browser/dom"
], function (e) {
  function c(e, c) {
    function g(e) {
      var t = new window.FileReader();
      b(e) && (t.onload = function () {
        var e = t.result;
        y(e, function (e) {
          h.conversation && h.conversation.isGroupConversation() && h.conversation._setGroupAvatar ? S(e) : x(e);
        });
      }, t.readAsDataURL(e));
    }
    function y(e, t) {
      var n = new window.Image();
      n.addEventListener("load", function () {
        var e = document.createElement("canvas"), r = e.getContext("2d"), i = n.height, s = n.width, o = 256, u;
        e.width = o;
        e.height = o;
        s === i ? r.drawImage(n, 0, 0, o, o) : s > i ? (s = Math.floor(o * s / i), i = o, u = Math.floor((s - o) / 2), r.drawImage(n, -u, 0, s, i)) : s < i && (i = Math.floor(o * i / s), s = o, u = Math.floor((i - o) / 2), r.drawImage(n, 0, -u, s, i));
        e.toBlob(t, "image/jpeg", 1);
      }, !1);
      n.setAttribute("src", e);
    }
    function b(e) {
      return e === null ? !1 : w(e.type) ? E(e.size) ? !0 : (a.notify(u.build(i.notifications.AVATAR_TOO_LARGE)), !1) : (a.notify(u.build(i.notifications.AVATAR_NOT_SUPPORTED_IMAGE_TYPE)), !1);
    }
    function w(e) {
      var t = [
        "image/gif",
        "image/png",
        "image/jpeg"
      ];
      return t.indexOf(e) > -1;
    }
    function E(e) {
      return e / 1048576 < 2;
    }
    function S(e) {
      h.avatarUploadDisabled(!0);
      h.conversation._setGroupAvatar(e).then(function () {
        h.avatarUploadDisabled(!1);
      }, function () {
        a.notify(u.build(i.notifications.AVATAR_UPLOAD_ERROR));
        h.avatarUploadDisabled(!1);
      });
    }
    function x(e) {
      var t = new window.FileReader(), n = e.type;
      t.onload = function (t) {
        var r = t.target.result;
        h.avatarUploadDisabled(!0);
        p.updateAvatar(r, n).then(function () {
          var t = new window.FileReader();
          t.onload = function (e) {
            p.updateAvatarUrl(e.target.result);
          };
          t.readAsDataURL(e);
          h.avatarUploadDisabled(!1);
        }, function () {
          a.notify(u.build(i.notifications.AVATAR_UPLOAD_ERROR));
          h.avatarUploadDisabled(!1);
        });
      };
      t.readAsArrayBuffer(e);
    }
    var h = this, p = s.get().personsAndGroupsManager.mePerson, d = { source: n.me.avatar }, v = f.resolve(i.serviceLocator.ACTION_TELEMETRY), m = l.getElement(".avatarFilePickerInput", c);
    h.conversation = e ? e.conversationModel : null;
    h.avatarUploadSupported = !!window.FormData && !!window.FileReader;
    h.avatarUploadDisabled = r.observable(!h.avatarUploadSupported);
    h.uploadProfilePictureText = h.conversation && h.conversation.isGroupConversation() ? o.fetch({ key: "group_avatar_uploadProfilePictureText" }) : o.fetch({ key: "me_avatar_uploadProfilePictureText" });
    h.uploadProfilePictureAriaLabel = o.fetch({ key: "me_avatar_uploadProfilePictureAriaLabel" });
    h.openFilePickerInput = function () {
      m.click();
    };
    h.checkUploadEnabled = function (e, n) {
      return v.recordAction(t.me.avatarFilePickerClicked, d), n.stopPropagation(), !h.avatarUploadDisabled();
    };
    h.processFiles = function (e, t) {
      g(t.target.files[0]);
      t.target.value = null;
    };
  }
  var t = e("ui/telemetry/actions/actionNames"), n = e("ui/telemetry/actions/actionSources"), r = e("vendor/knockout"), i = e("swx-constants").COMMON, s = e("swx-cafe-application-instance"), o = e("swx-i18n").localization, u = e("notifications/factory"), a = e("notifications/common/notificationHub"), f = e("swx-service-locator-instance").default, l = e("browser/dom");
  return c.build = function (e, t) {
    return new c(e, t);
  }, c;
});
