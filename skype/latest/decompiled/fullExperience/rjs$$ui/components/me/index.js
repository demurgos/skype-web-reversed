define("ui/components/me/index", [
  "require",
  "ui/components/me/area",
  "ui/components/me/presencePopup",
  "ui/components/me/moodMessage"
], function (e) {
  return [
    e("ui/components/me/area"),
    e("ui/components/me/presencePopup"),
    e("ui/components/me/moodMessage")
  ];
});
