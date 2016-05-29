define("ui/viewModels/chat/pes.v2/itemsPicker", [
  "require",
  "lodash-compat",
  "utils/common/async",
  "utils/common/builderMixin",
  "vendor/knockout",
  "browser/document",
  "utils/common/eventHelper",
  "utils/common/stateMixin"
], function (e) {
  function a(e, t) {
    function f() {
      n.execute(function () {
        t.adjustToRTLLayout();
      }, null, !0);
    }
    var r = this, o, a;
    r.params = u.overrideDefaults({}, r.getDefaultParams(), e);
    a = r.params.item.subscribe(function (t) {
      var n;
      if (!t)
        return;
      n = s.activeElement;
      n && n.focus();
    });
    r.params.isVisible() ? f() : o = r.params.isVisible.subscribe(function (t) {
      t && (o.dispose(), f());
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
      a.dispose();
      r.showEmptyTabMessage.dispose();
      r.tabStyleOverride.dispose();
      r.emptyTabMessageKey.dispose();
      t.dispose();
    };
  }
  var t = e("lodash-compat"), n = e("utils/common/async"), r = e("utils/common/builderMixin"), i = e("vendor/knockout"), s = e("browser/document"), o = e("utils/common/eventHelper"), u = e("utils/common/stateMixin");
  return a.prototype.getDefaultParams = function () {
    return {
      tab: {
        packs: i.observableArray(),
        emptyTabMessageKey: "no_key"
      },
      item: null,
      isVisible: !0,
      eventEmitter: o.emptyEmitter
    };
  }, t.assign(a.prototype, u), t.assign(a, r), a;
});
