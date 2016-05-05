define("ui/viewModels/chat/fragment", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "constants/common",
  "utils/common/eventMixin"
], function (e) {
  function s(e) {
    function i() {
      t.dispatchEvent(r.COMPONENT_RENDERED, { fragment: t }, t.DIRECTION.PARENT);
    }
    var t = this;
    this.name = e.page, this.options = e, this.hidden = n.observable(!0), this.setVisible = function (e) {
      this.dispatchEvent(e ? r.FRAGMENT_BEFORE_SHOW : r.FRAGMENT_BEFORE_HIDE, this.options, this.DIRECTION.CHILD), this.hidden(!e), this.dispatchEvent(e ? r.FRAGMENT_SHOW : r.FRAGMENT_HIDE, this.options, this.DIRECTION.CHILD);
    }, this.registerEvent(r.COMPONENT_RENDERED, i);
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("constants/common").events.navigation, i = e("utils/common/eventMixin");
  return t.assign(s.prototype, i), s;
})
