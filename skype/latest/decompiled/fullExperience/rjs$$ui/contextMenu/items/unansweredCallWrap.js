define("ui/contextMenu/items/unansweredCallWrap", [
  "require",
  "exports",
  "module",
  "ui/contextMenu/menuItem"
], function (e, t) {
  function r(e, r, i) {
    function o() {
      s.actionBefore();
      e.action();
    }
    function u() {
    }
    var s = this;
    s.wrappedMenuItem = e;
    s.actionBefore = i || u;
    n.call(this, t.TYPE, r, o);
  }
  var n = e("ui/contextMenu/menuItem");
  return r.prototype = Object.create(n.prototype), r.TYPE = "UnansweredCallWrapMenuItem", r;
});
