define("ui/viewModels/people/blockContactModal", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "utils/common/eventMixin",
  "ui/modalDialog/modalDialog",
  "ui/telemetry/actions/actionNames",
  "constants/common",
  "ui/modelHelpers/personHelper",
  "ui/viewModels/people/properties/displayNameText",
  "services/serviceLocator"
], function (e) {
  function c(e, t) {
    function c() {
      i.hide(l), r.actionsInProgress(!1);
    }
    function h() {
      r.actionsInProgress(!1);
    }
    var r = this;
    t = t || {}, r.displayName = a.format(e.id(), e.displayName()), r.avatar = e.avatarUrl(), r.reportAbuse = !1, r.isAgent = u.isAgent(e), r.actionsInProgress = n.observable(!1), r.cancel = function () {
      i.hide(l);
    }, r.blockContact = function () {
      function i() {
        var e = f.resolve(o.serviceLocator.ACTION_TELEMETRY);
        e.recordAction(s.contacts.contactBlocked, t);
      }
      var n;
      return r.actionsInProgress(!0), e.isBlocked.set.enabled() ? n = e.isBlocked.set(!0, r.reportAbuse) : n = Promise.resolve(!0), n.then(c, h), i(), n;
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("utils/common/eventMixin"), i = e("ui/modalDialog/modalDialog"), s = e("ui/telemetry/actions/actionNames"), o = e("constants/common"), u = e("ui/modelHelpers/personHelper"), a = e("ui/viewModels/people/properties/displayNameText"), f = e("services/serviceLocator"), l = "swx-overlayBlockContact";
  return c.ELEMENT_ID = l, t.assign(c.prototype, r), c;
})
