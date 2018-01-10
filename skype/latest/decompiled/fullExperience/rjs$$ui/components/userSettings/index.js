define("ui/components/userSettings/index", [
  "require",
  "ui/components/userSettings/userSettingsPage",
  "ui/components/userSettings/audioVideoSettingsPane"
], function (e) {
  return [
    e("ui/components/userSettings/userSettingsPage"),
    e("ui/components/userSettings/audioVideoSettingsPane")
  ];
});
