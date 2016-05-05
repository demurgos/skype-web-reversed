define("ui/components/experience/toggleButton", [
  "require",
  "exports",
  "module",
  "constants/components",
  "ui/viewModels/buttons/toggle",
  "text!views/common/buttons/toggleButton.html"
], function (e, t) {
  t.name = e("constants/components").experience.TOGGLE_BUTTON, t.viewModel = e("ui/viewModels/buttons/toggle"), t.template = e("text!views/common/buttons/toggleButton.html");
})
