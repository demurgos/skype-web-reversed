define("ui/components/commerce/creditBalance", [
  "require",
  "exports",
  "module",
  "ui/viewModels/commerce/creditBalance",
  "constants/components",
  "text!views/commerce/creditBalance.html"
], function (e, t) {
  function r() {
    return n.build();
  }
  var n = e("ui/viewModels/commerce/creditBalance");
  t.name = e("constants/components").commerce.CREDIT_BALANCE, t.template = e("text!views/commerce/creditBalance.html"), t.viewModel = { createViewModel: r };
})
