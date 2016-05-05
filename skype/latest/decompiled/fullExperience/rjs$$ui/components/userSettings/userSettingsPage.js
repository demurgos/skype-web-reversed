define("ui/components/userSettings/userSettingsPage", [
  "require",
  "exports",
  "module",
  "ui/viewModels/userSettings/userSettingsPageViewModel",
  "constants/components",
  "text!views/userSettings/userSettingsPage.html"
], function (e, t) {
  var n = e("ui/viewModels/userSettings/userSettingsPageViewModel");
  t.name = e("constants/components").userSettings.USER_SETTINGS_PAGE, t.template = e("text!views/userSettings/userSettingsPage.html"), t.viewModel = { createViewModel: n.build.bind(n) };
})
