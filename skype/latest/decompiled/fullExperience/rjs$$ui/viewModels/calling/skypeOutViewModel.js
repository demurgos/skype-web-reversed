define("ui/viewModels/calling/skypeOutViewModel", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-constants",
  "browser/dom",
  "utils/common/scroll",
  "utils/common/eventMixin",
  "swx-service-locator-instance"
], function (e, t) {
  function a() {
    var e = this, t, n, o = "#SkypeOutBody-scrollWrapper";
    e.init = function (u) {
      e.forwardEvent(r.events.skypeOut.DIAL_BUTTON_CLICKED, e.DIRECTION.CHILD);
      n = i.getElement(o, u);
      t = s.build(n);
      t.init();
    };
    e.dispose = function () {
      t.dispose();
    };
    e.isBusinessMode = u.resolve(r.serviceLocator.FEATURE_FLAGS).isFeatureOn(r.featureFlags.USE_BUSINESS_WORDING);
  }
  var n = e("lodash-compat"), r = e("swx-constants").COMMON, i = e("browser/dom"), s = e("utils/common/scroll"), o = e("utils/common/eventMixin"), u = e("swx-service-locator-instance").default;
  n.assign(a.prototype, o);
  t.build = function () {
    return new a();
  };
});
