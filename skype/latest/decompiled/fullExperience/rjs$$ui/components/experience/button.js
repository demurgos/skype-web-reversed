define("ui/components/experience/button", [
  "require",
  "exports",
  "module",
  "constants/components",
  "ui/viewModels/buttons/button",
  "text!views/common/buttons/regular.html"
], function (e, t) {
  t.name = e("constants/components").experience.BUTTON, t.viewModel = e("ui/viewModels/buttons/button"), t.template = e("text!views/common/buttons/regular.html");
})
