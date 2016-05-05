define("ui/components/commerce/subscriptionEntitlement", [
  "require",
  "exports",
  "module",
  "ui/viewModels/commerce/subscriptionEntitlement",
  "constants/components",
  "text!views/commerce/subscriptionEntitlement.html"
], function (e, t) {
  function r() {
    return n.build();
  }
  var n = e("ui/viewModels/commerce/subscriptionEntitlement");
  t.name = e("constants/components").commerce.SUBSCRIPTION_ENTITLEMENT, t.template = e("text!views/commerce/subscriptionEntitlement.html"), t.viewModel = { createViewModel: r };
})
