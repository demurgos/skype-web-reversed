define("ui/viewModels/chat/filePicker", [
  "require",
  "vendor/knockout",
  "swx-i18n",
  "constants/common",
  "services/serviceLocator",
  "telemetry/chat/mediaPickerTelemetry",
  "utils/common/eventMixin",
  "lodash-compat",
  "browser/dom",
  "browser/detect"
], function (e) {
  function l(e, o) {
    function h() {
      var t = {};
      return e.icon && (t.iconfont = !0, t[e.icon] = !0), t;
    }
    function p() {
      var e = a.getElement(".fileInput", o.element);
      f.getBrowserInfo().browserName === f.BROWSERS.FIREFOX ? e.focus() : e.click();
    }
    var u = this, l = i.resolve(r.serviceLocator.FEATURE_FLAGS), c = l.isFeatureOn(r.featureFlags.FILE_TRANSFER_ENABLED);
    u.conversationModel = e.conversationModel, e.text && (u.text = n.fetch({ key: e.text })), u.isDisabled = e.isDisabled, u.iconCssClass = t.computed(h, this), u.isFocused = t.observable(!1), u.supportedFileTypes = c ? "" : r.fileTransfer.SUPPORTED_PICTURE_TYPES, u.mediaPickerTelemetryEvent = e.mediaPickerTelemetryEvent || s.build(), u.init = function () {
      u.registerEvent(r.events.mediaPicker.FILE_PICKER_SELECTED, p);
    }, u.onOpenDialog = function () {
      return u.mediaPickerTelemetryEvent.data.filePickerClicked = !0, u.mediaPickerTelemetryEvent.publish(), u.dispatchEvent(r.events.mediaPicker.CLOSE_PICKER, u.DIRECTION.PARENT), u.isFocused(!1), !0;
    }, u.processFiles = function (e, t) {
      u.conversationModel.fileTransferService.send(t.target.files), t.target.value = null;
    }, u.dispose = function () {
      u.iconCssClass.dispose();
    };
  }
  var t = e("vendor/knockout"), n = e("swx-i18n").localization, r = e("constants/common"), i = e("services/serviceLocator"), s = e("telemetry/chat/mediaPickerTelemetry"), o = e("utils/common/eventMixin"), u = e("lodash-compat"), a = e("browser/dom"), f = e("browser/detect");
  return u.assign(l.prototype, o), {
    build: function (e, t) {
      return new l(e, t);
    }
  };
})
