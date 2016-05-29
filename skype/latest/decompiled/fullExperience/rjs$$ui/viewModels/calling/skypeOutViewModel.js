define("ui/viewModels/calling/skypeOutViewModel", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "constants/common",
  "browser/dom",
  "utils/common/scroll",
  "utils/common/eventMixin"
], function (e, t) {
  function u() {
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
  }
  var n = e("lodash-compat"), r = e("constants/common"), i = e("browser/dom"), s = e("utils/common/scroll"), o = e("utils/common/eventMixin");
  n.assign(u.prototype, o);
  t.build = function () {
    return new u();
  };
});
