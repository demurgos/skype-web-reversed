define("ui/viewModels/calling/screenSharingPreviewViewModel", [
  "require",
  "lodash-compat",
  "swx-utils-common",
  "swx-constants",
  "swx-constants",
  "utils/common/eventMixin",
  "swx-i18n",
  "vendor/knockout",
  "ui/telemetry/actions/actionNames",
  "swx-service-locator-instance"
], function (e) {
  function c(e) {
    var t = this;
    t.DIALOG_NAME = r.CALL_SCREEN_DIALOG.NAME.SCREEN_SHARING_PREVIEW;
    t.cancelButtonHasFocus = u.observable(!1);
    t.previewImage = u.observable(null);
    t.cancelTitle = o.fetch({ key: "action_button_cancel" });
    t.shareScreenTitle = o.fetch({ key: "callscreen_text_shareScreen" });
    t.closePreview = function () {
      t.dispatchEvent(i.events.callScreen.TOGGLE_MODAL_DIALOG, t.DIALOG_NAME, t.DIRECTION.PARENT);
    };
    t.shareScreen = function () {
      e.screenSharingService.start();
      t.closePreview();
      var n = f.resolve(i.serviceLocator.ACTION_TELEMETRY);
      n.recordAction(a.audioVideo.shareScreen);
    };
    t.init = function () {
      t.forwardEvent(i.events.callScreen.TOGGLE_MODAL_DIALOG, t.DIRECTION.PARENT);
      e.screenSharingService.shareableResources.get(0).then(function (e) {
        e._getPreviewImage(l).then(function (e) {
          var n = new Image();
          n.onload = function () {
            t.previewImage(n.src);
          };
          n.onerror = t.closePreview;
          n.src = "data:image/png;base64," + e.data;
          t.cancelButtonHasFocus(!0);
        }, t.closePreview);
      }, t.closePreview);
    };
  }
  var t = e("lodash-compat"), n = e("swx-utils-common").builderMixin, r = e("swx-constants").CALLING, i = e("swx-constants").COMMON, s = e("utils/common/eventMixin"), o = e("swx-i18n").localization, u = e("vendor/knockout"), a = e("ui/telemetry/actions/actionNames"), f = e("swx-service-locator-instance").default, l = 400;
  return t.assign(c, n), t.assign(c.prototype, s), c;
});
