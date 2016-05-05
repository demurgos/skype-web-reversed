define("ui/viewModels/commerce/subscriptionEntitlement", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "vendor/knockout",
  "swx-i18n",
  "swx-enums",
  "experience/settings",
  "cafe/applicationInstance",
  "telemetry/calling/pstn/pstn",
  "utils/common/cafeObservable",
  "constants/common"
], function (e, t) {
  function c() {
    function h() {
      var e = n.filter(c(), p).length, t, r = { count: e };
      switch (e) {
      case 0:
        t = "no_subscriptions_text";
        break;
      case 1:
        t = "subscriptions_text_one";
        break;
      default:
        t = "subscriptions_text_many";
      }
      return i.fetch({
        key: t,
        params: r
      });
    }
    function p(e) {
      return e.active() && (e.type() === s.subscriptionType.Package || e.type() === s.subscriptionType.Plan);
    }
    var e = this, t = u.get().personsAndGroupsManager.mePerson.account, c = f.newObservableCollection(t.entitlements);
    e.showSubscriptionsText = r.observable(!1), e.subscriptionsText = r.computed(h), e.purchaseSubscriptionUrl = o.commerce.purchaseSubscriptionUrl, t.entitlements.get().then(function () {
      e.showSubscriptionsText(!0);
    }), e.addSubscriptionTelemetry = function () {
      return a.addingSubscription(l.entryPoint.SKYPE_OUT_PAGE), !0;
    };
  }
  var n = e("lodash-compat"), r = e("vendor/knockout"), i = e("swx-i18n").localization, s = e("swx-enums"), o = e("experience/settings"), u = e("cafe/applicationInstance"), a = e("telemetry/calling/pstn/pstn"), f = e("utils/common/cafeObservable"), l = e("constants/common").telemetry.pstn;
  c.prototype.dispose = function () {
    this.subscriptionsText.dispose();
  }, t.classFunction = c, t.build = function () {
    return new c();
  };
})
