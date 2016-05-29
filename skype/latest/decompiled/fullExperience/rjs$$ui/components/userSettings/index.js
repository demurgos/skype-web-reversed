define("ui/components/userSettings/index", [
  "require",
  "ui/components/userSettings/userSettingsPage",
  "ui/components/userSettings/shortCircuit",
  "ui/components/userSettings/about"
], function (e) {
  return [
    e("ui/components/userSettings/userSettingsPage"),
    e("ui/components/userSettings/shortCircuit"),
    e("ui/components/userSettings/about")
  ];
});
