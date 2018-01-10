define("ui/viewModels/chat/pes/itemsPicker", [
  "require",
  "lodash-compat",
  "swx-utils-common",
  "swx-utils-common",
  "vendor/knockout",
  "browser/document",
  "utils/common/eventHelper",
  "utils/common/stateMixin",
  "swx-focus-handler"
], function (e) {
  function f(e, t) {
    function l() {
      n.execute(function () {
        t.adjustToRTLLayout();
      }, null, !0);
    }
    var r = this, o, f;
    r.params = u.overrideDefaults({}, r.getDefaultParams(), e);
    f = r.params.item.subscribe(function (t) {
      var n;
      if (!t)
        return;
      n = s.activeElement;
      n && a.get().addFocusRequestToQueue(n);
    });
    r.params.isVisible() ? l() : o = r.params.isVisible.subscribe(function (t) {
      t && (o.dispose(), l());
    });
    r.showEmptyTabMessage = i.computed(function () {
      return r.params.tab().packs().length === 0;
    });
    r.tabStyleOverride = i.computed(function () {
      return r.params.tab().styleOverride ? r.params.tab().styleOverride() : "";
    });
    r.emptyTabMessageKey = i.computed(function () {
      return i.utils.unwrapObservable(r.params.tab().emptyTabMessageKey);
    });
    r.init = function () {
      t.init();
    };
    r.dispose = function () {
      o && o.dispose();
      f.dispose();
      r.showEmptyTabMessage.dispose();
      r.tabStyleOverride.dispose();
      r.emptyTabMessageKey.dispose();
      t.dispose();
    };
  }
  var t = e("lodash-compat"), n = e("swx-utils-common").async, r = e("swx-utils-common").builderMixin, i = e("vendor/knockout"), s = e("browser/document"), o = e("utils/common/eventHelper"), u = e("utils/common/stateMixin"), a = e("swx-focus-handler");
  return f.prototype.getDefaultParams = function () {
    return {
      tab: {
        packs: i.observableArray(),
        emptyTabMessageKey: "no_key"
      },
      item: null,
      isVisible: !0,
      eventEmitter: o.emptyEmitter
    };
  }, t.assign(f.prototype, u), t.assign(f, r), f;
});
