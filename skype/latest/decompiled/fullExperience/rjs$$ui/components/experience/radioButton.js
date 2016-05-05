define("ui/components/experience/radioButton", [
  "require",
  "exports",
  "module",
  "ui/viewModels/experience/radioButton",
  "constants/components",
  "text!views/common/buttons/radioButton.html"
], function (e, t) {
  function r(e) {
    var t = new n(e);
    return t;
  }
  var n = e("ui/viewModels/experience/radioButton");
  t.name = e("constants/components").experience.RADIO_BUTTON, t.template = e("text!views/common/buttons/radioButton.html"), t.viewModel = { createViewModel: r };
})
