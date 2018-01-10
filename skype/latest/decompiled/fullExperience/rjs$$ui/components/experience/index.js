define("ui/components/experience/index", [
  "require",
  "ui/components/experience/button",
  "ui/components/experience/loadingAnimation",
  "ui/components/experience/radioButton",
  "ui/components/experience/searchInput",
  "ui/components/experience/searchResults",
  "ui/components/experience/selectBox",
  "ui/components/experience/toggleButton",
  "ui/components/experience/avatarFilePicker",
  "ui/components/experience/eduCarousel"
], function (e) {
  return [
    e("ui/components/experience/button"),
    e("ui/components/experience/loadingAnimation"),
    e("ui/components/experience/radioButton"),
    e("ui/components/experience/searchInput"),
    e("ui/components/experience/searchResults"),
    e("ui/components/experience/selectBox"),
    e("ui/components/experience/toggleButton"),
    e("ui/components/experience/avatarFilePicker"),
    e("ui/components/experience/eduCarousel")
  ];
});
