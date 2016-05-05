define("ui/viewModels/calling/startCallButtonViewModel", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "utils/common/eventMixin",
  "vendor/knockout",
  "constants/common",
  "services/serviceLocator",
  "ui/contextMenu/menuItemHelper",
  "ui/contextMenu/items/all",
  "ui/modelHelpers/personHelper"
], function (e, t) {
  function l(e) {
    function c() {
      n.callButtonViewModel.conversationModel.participants.changed.off(p), t = null;
    }
    function h() {
      t && t.phoneNumbers.changed.off(d);
    }
    function p() {
      h(), n.callButtonViewModel.isOneToOneConversation() && (t = n.callButtonViewModel.participantPerson(), t.phoneNumbers.changed(d));
    }
    function d() {
      n.phoneNumbers(t.phoneNumbers());
    }
    function v() {
      return !!n.phoneNumbers().length;
    }
    function m() {
      var e = o.resolve(s.serviceLocator.FEATURE_FLAGS);
      return e.isFeatureOn(s.featureFlags.PSTN_ENABLED);
    }
    var t, n = this, r = e.historyOrigin, l = e.telemetryContext;
    n.callButtonViewModel = e.callButtonViewModel, n.phoneNumbers = i.observable([]), n.callButtonViewModel.conversationModel.participants.changed(p), n.getMenuOptions = function () {
      var e, t = [], i = { getPerson: n.callButtonViewModel.participantPerson };
      return m() && (f.isPstn(n.callButtonViewModel.participantPerson()) || t.push(new a.CallSkypeMenuItem(i, r, l)), e = u.getCallPhoneContextMenuItems(i, r, l), e && !!e.length && Array.prototype.push.apply(t, e)), t;
    }, n.hasMenuOptions = function () {
      function e() {
        return n.getMenuOptions().filter(function (e) {
          return e.isEnabled();
        });
      }
      return n.callButtonViewModel.isOneToOneConversation() && v() && e().length > 1;
    }, n.dispose = function () {
      h(), c();
    };
  }
  var n = e("lodash-compat"), r = e("utils/common/eventMixin"), i = e("vendor/knockout"), s = e("constants/common"), o = e("services/serviceLocator"), u = e("ui/contextMenu/menuItemHelper"), a = e("ui/contextMenu/items/all"), f = e("ui/modelHelpers/personHelper");
  n.assign(l.prototype, r), t.classFunction = l, t.build = function (e) {
    return new l(e);
  };
})
