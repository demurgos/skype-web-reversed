define("ui/viewModels/me/avatarFilePicker", [
  "require",
  "ui/telemetry/actions/actionNames",
  "ui/telemetry/actions/actionSources",
  "vendor/knockout",
  "constants/common",
  "cafe/applicationInstance",
  "swx-i18n",
  "notifications/factory",
  "notifications/common/notificationHub",
  "services/serviceLocator",
  "browser/dom"
], function (e) {
  function c(e, c) {
    function g(e) {
      var t, n = new window.FileReader(), r = [
          "image/gif",
          "image/png",
          "image/jpeg"
        ];
      if (e === null)
        return;
      t = e.type;
      if (r.indexOf(t) === -1) {
        a.notify(u.build(i.notifications.AVATAR_NOT_SUPPORTED_IMAGE_TYPE));
        return;
      }
      n.onload = function () {
        var e = n.result;
        y(e, function (e) {
          b(e);
        });
      }, n.readAsDataURL(e);
    }
    function y(e, t) {
      var n = new window.Image();
      n.addEventListener("load", function () {
        var e = document.createElement("canvas"), r = e.getContext("2d"), i = n.height, s = n.width, o = 256, u;
        e.width = o, e.height = o, s === i ? r.drawImage(n, 0, 0, o, o) : s > i ? (s = Math.floor(o * s / i), i = o, u = Math.floor((s - o) / 2), r.drawImage(n, -u, 0, s, i)) : s < i && (i = Math.floor(o * i / s), s = o, u = Math.floor((i - o) / 2), r.drawImage(n, 0, -u, s, i)), e.toBlob(t, "image/jpeg", 1);
      }, !1), n.setAttribute("src", e);
    }
    function b(e) {
      var t = new window.FileReader(), n = e.type;
      t.onload = function (t) {
        var r = t.target.result;
        h.avatarUploadDisabled(!0), p.updateAvatar(r, n).then(function () {
          var t = new window.FileReader();
          t.onload = function (e) {
            p.updateAvatarUrl(e.target.result);
          }, t.readAsDataURL(e), h.avatarUploadDisabled(!1);
        }, function () {
          a.notify(u.build(i.notifications.AVATAR_UPLOAD_ERROR)), h.avatarUploadDisabled(!1);
        });
      }, t.readAsArrayBuffer(e);
    }
    var h = this, p = s.get().personsAndGroupsManager.mePerson, d = { source: n.me.avatar }, v = f.resolve(i.serviceLocator.ACTION_TELEMETRY), m = l.getElement(".Me-avatarFilePickerInput", c);
    h.avatarUploadSupported = !!window.FormData && !!window.FileReader, h.avatarUploadDisabled = r.observable(!h.avatarUploadSupported), h.uploadProfilePictureText = o.fetch({ key: "me_avatar_uploadProfilePictureText" }), h.uploadProfilePictureAriaLabel = o.fetch({ key: "me_avatar_uploadProfilePictureAriaLabel" }), h.openFilePickerInput = function () {
      m.click();
    }, h.checkUploadEnabled = function (e, n) {
      return v.recordAction(t.me.avatarFilePickerClicked, d), n.stopPropagation(), !h.avatarUploadDisabled();
    }, h.processFiles = function (e, t) {
      g(t.target.files[0]), t.target.value = null;
    };
  }
  var t = e("ui/telemetry/actions/actionNames"), n = e("ui/telemetry/actions/actionSources"), r = e("vendor/knockout"), i = e("constants/common"), s = e("cafe/applicationInstance"), o = e("swx-i18n").localization, u = e("notifications/factory"), a = e("notifications/common/notificationHub"), f = e("services/serviceLocator"), l = e("browser/dom");
  return c.build = function (e, t) {
    return new c(e, t);
  }, c;
})
