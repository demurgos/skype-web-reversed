define("ui/viewModels/calling/deviceDisabledViewModel", [
  "require",
  "exports",
  "module",
  "swx-browser-detect",
  "swx-i18n"
], function (e, t) {
  function s(e) {
    var t = this;
    t.title = "";
    t.text = "";
    n.getBrowserInfo().browserName === n.BROWSERS.CHROME && (t.title = r.fetch({ key: "modal_device_disabled_chrome_title" }), t.text = r.fetch({
      key: "modal_device_disabled_chrome_text",
      params: { image: "<span class=\"iconDeviceDisabledChrome\"></span>" }
    }));
    n.getBrowserInfo().isEdge && (t.title = r.fetch({ key: "modal_device_disabled_edge_title" }), t.text = r.fetch({ key: "modal_device_disabled_edge_text" }));
    t.close = function () {
      e();
    };
  }
  var n = e("swx-browser-detect").default, r = e("swx-i18n").localization, i = "swx-overlayDeviceDisabled";
  t.ELEMENT_ID = i;
  t.build = function (e) {
    return new s(e);
  };
});
