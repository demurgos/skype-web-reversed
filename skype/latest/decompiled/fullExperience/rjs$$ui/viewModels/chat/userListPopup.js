define("ui/viewModels/chat/userListPopup", [
  "require",
  "exports",
  "module",
  "utils/common/eventMixin",
  "constants/common",
  "utils/common/async",
  "browser/document",
  "browser/dom",
  "vendor/knockout",
  "lodash-compat",
  "utils/common/scroll",
  "utils/common/outsideClickHandler"
], function (e, t) {
  function c(e, t) {
    function d(e) {
      n.hidden() && a(e) && (e.eventPageY / s.body.clientHeight > 0.5 ? p(!0) : p(!1), v());
    }
    function v() {
      n.hidden(!1), i.execute(function () {
        l.add("UserListPopup", m);
      });
    }
    function m() {
      n.hidden(!0), l.remove("UserListPopup");
    }
    var n = this, a = e.isSelfPopup() || function () {
        return !0;
      }, c = o.getElement(".UserListPopup-scrollingContainer", t), h, p;
    n.title = e.title, n.users = e.users, n.hidden = u.observable(!0), p = u.observable(), n.userListPopupCss = u.computed(function () {
      var e = {
        UserListPopup: !0,
        popup: !0,
        arrow: !0,
        down: p(),
        up: !p(),
        "fontSize-p": !0
      };
      return e;
    }), n.init = function () {
      t.addEventListener("contextmenu", function (e) {
        e.stopPropagation();
      }), n.registerEvent(r.events.userListPopup.POPUP_TOGGLE, d), h = f.build(c), h.init();
    }, n.dispose = function () {
      h.dispose(), n.userListPopupCss.dispose();
    };
  }
  var n = e("utils/common/eventMixin"), r = e("constants/common"), i = e("utils/common/async"), s = e("browser/document"), o = e("browser/dom"), u = e("vendor/knockout"), a = e("lodash-compat"), f = e("utils/common/scroll"), l = e("utils/common/outsideClickHandler");
  t.build = function (e, t) {
    return new c(e, t);
  }, a.assign(c.prototype, n);
})
