define("ui/components/me/avatarFilePicker", [
  "require",
  "exports",
  "module",
  "ui/viewModels/me/avatarFilePicker",
  "constants/components",
  "text!views/me/avatarFilePicker.html"
], function (e, t) {
  function r(e, t) {
    var r = n.build(e, t.element);
    return r;
  }
  var n = e("ui/viewModels/me/avatarFilePicker");
  t.name = e("constants/components").me.AVATAR_FILE_PICKER, t.template = e("text!views/me/avatarFilePicker.html"), t.viewModel = { createViewModel: r };
})
