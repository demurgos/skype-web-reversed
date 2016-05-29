define("ui/viewModels/people/deleteContactModal", [
  "require",
  "lodash-compat",
  "cafe/applicationInstance",
  "services/serviceLocator",
  "utils/common/eventMixin",
  "ui/modalDialog/modalDialog",
  "constants/common",
  "ui/telemetry/actions/actionNames",
  "vendor/knockout"
], function (e) {
  function l(e, t, i) {
    function p() {
      var e = r.resolve(o.serviceLocator.ACTION_TELEMETRY);
      e.recordAction(u.contacts.contactDeleted, i);
    }
    function d() {
      v();
      s.hide(f);
    }
    function v() {
      l.actionsInProgress(!1);
    }
    var l = this, c = e.getPerson(), h = r.resolve(o.serviceLocator.FEATURE_FLAGS);
    i = i || {};
    l.displayName = e.displayName;
    l.avatar = e.avatar;
    l.isAgent = e.isAgent;
    l.actionsInProgress = a.observable(!1);
    l.cancel = function () {
      s.hide(f);
    };
    l.deleteContact = function () {
      var e, t = n.get().personsAndGroupsManager.all;
      return l.actionsInProgress(!0), h.isFeatureOn(o.featureFlags.ENABLE_BUSINESS_CONTACT_MANAGEMENT) ? e = t.persons.remove(t.persons().filter(function (e) {
        return e.id() === c.id();
      })[0]) : e = t.persons.remove(c.id()), e.then(d, v), p(), e;
    };
  }
  var t = e("lodash-compat"), n = e("cafe/applicationInstance"), r = e("services/serviceLocator"), i = e("utils/common/eventMixin"), s = e("ui/modalDialog/modalDialog"), o = e("constants/common"), u = e("ui/telemetry/actions/actionNames"), a = e("vendor/knockout"), f = "swx-overlayDeleteContact";
  return l.ELEMENT_ID = f, t.assign(l.prototype, i), l;
});
