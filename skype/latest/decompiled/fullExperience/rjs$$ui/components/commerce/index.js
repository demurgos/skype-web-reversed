define("ui/components/commerce/index", [
  "require",
  "ui/components/commerce/creditBalance",
  "ui/components/commerce/subscriptionEntitlement"
], function (e) {
  return [
    e("ui/components/commerce/creditBalance"),
    e("ui/components/commerce/subscriptionEntitlement")
  ];
});
