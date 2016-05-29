define("ui/components/me/index", [
  "require",
  "ui/components/me/area",
  "ui/components/me/avatarFilePicker",
  "ui/components/me/presencePopup"
], function (e) {
  return [
    e("ui/components/me/area"),
    e("ui/components/me/avatarFilePicker"),
    e("ui/components/me/presencePopup")
  ];
});
