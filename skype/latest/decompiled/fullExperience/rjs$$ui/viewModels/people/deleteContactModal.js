define("ui/viewModels/people/deleteContactModal", [
  "require",
  "lodash-compat",
  "utils/common/eventMixin",
  "ui/modalDialog/modalDialog",
  "ui/modelHelpers/personActionsHelper",
  "vendor/knockout"
], function (e) {
  function u(e, t) {
    function a() {
      n.actionsInProgress(!1);
      r.hide(o);
    }
    function f() {
      n.actionsInProgress(!1);
    }
    var n = this, u = e.getPerson();
    t = t || {};
    n.displayName = e.displayName;
    n.avatar = e.avatar;
    n.isAgent = e.isAgent;
    n.isPstn = e.isPstn;
    n.actionsInProgress = s.observable(!1);
    n.cancel = function () {
      r.hide(o);
    };
    n.deleteContact = function () {
      var e;
      return n.actionsInProgress(!0), e = i.removePerson(u, t, a, f), e;
    };
  }
  var t = e("lodash-compat"), n = e("utils/common/eventMixin"), r = e("ui/modalDialog/modalDialog"), i = e("ui/modelHelpers/personActionsHelper"), s = e("vendor/knockout"), o = "swx-overlayDeleteContact";
  return u.ELEMENT_ID = o, t.assign(u.prototype, n), u;
});
