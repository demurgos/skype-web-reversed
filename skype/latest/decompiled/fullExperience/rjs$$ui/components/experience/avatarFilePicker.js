define("ui/components/experience/avatarFilePicker", [
  "require",
  "exports",
  "module",
  "ui/viewModels/experience/avatarFilePicker",
  "constants/components",
  "text!views/experience/avatarFilePicker.html"
], function (e, t) {
  function r(e, t) {
    var r = n.build(e, t.element);
    return r;
  }
  var n = e("ui/viewModels/experience/avatarFilePicker");
  t.name = e("constants/components").experience.AVATAR_FILE_PICKER;
  t.template = e("text!views/experience/avatarFilePicker.html");
  t.viewModel = { createViewModel: r };
});
