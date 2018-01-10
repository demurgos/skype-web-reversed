define("ui/viewModels/chat/filePicker", [
  "require",
  "vendor/knockout",
  "swx-i18n",
  "swx-constants",
  "browser/dom",
  "swx-service-locator-instance",
  "telemetry/chat/mediaPickerTelemetry",
  "utils/common/eventMixin",
  "lodash-compat",
  "swx-browser-detect",
  "swx-focus-handler"
], function (e) {
  function p(e, f, p) {
    function y() {
      var t = {}, n = l.isFunction(e.icon) ? e.icon() : e.icon;
      return n && (t.iconfont = !0, t[n] = !0), t;
    }
    function b() {
      var e = i.getElement(".fileInput", f.element);
      c.getBrowserInfo().browserName === c.BROWSERS.FIREFOX ? h.get().addFocusRequestToQueue(e) : e.click();
    }
    function w() {
      return i.getElement(u, i.getParentMatching(p, a));
    }
    function E() {
      var e = w();
      e && h.get().addFocusRequestToQueue(e);
    }
    var d = this, v = s.resolve(r.serviceLocator.FEATURE_FLAGS), m = v.isFeatureOn(r.featureFlags.FILE_TRANSFER_ENABLED), g = l.isFunction(e.text) ? e.text() : e.text;
    d.conversationModel = e.conversationModel;
    g && (d.text = n.fetch({ key: g }));
    d.isDisabled = e.isDisabled;
    d.iconCssClass = t.computed(y, this);
    d.isFocused = t.observable(!1);
    d.supportedFileTypes = m ? "" : r.fileTransfer.SUPPORTED_PICTURE_TYPES;
    d.mediaPickerTelemetryEvent = e.mediaPickerTelemetryEvent || o.build();
    d.init = function () {
      d.registerEvent(r.events.mediaPicker.FILE_PICKER_SELECTED, b);
    };
    d.onOpenDialog = function () {
      return d.mediaPickerTelemetryEvent.data.filePickerClicked = !0, d.mediaPickerTelemetryEvent.publish(), d.dispatchEvent(r.events.mediaPicker.CLOSE_PICKER, d.DIRECTION.PARENT), d.isFocused(!1), !0;
    };
    d.processFiles = function (e, t) {
      d.conversationModel.fileTransferService.send(t.target.files);
      t.target.value = null;
      E();
    };
    d.dispose = function () {
      d.iconCssClass.dispose();
    };
  }
  var t = e("vendor/knockout"), n = e("swx-i18n").localization, r = e("swx-constants").COMMON, i = e("browser/dom"), s = e("swx-service-locator-instance").default, o = e("telemetry/chat/mediaPickerTelemetry"), u = ".swx .chat .inputField", a = ".swx .chat", f = e("utils/common/eventMixin"), l = e("lodash-compat"), c = e("swx-browser-detect").default, h = e("swx-focus-handler");
  return l.assign(p.prototype, f), {
    build: function (e, t) {
      return new p(e, t);
    }
  };
});
