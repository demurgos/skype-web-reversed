define("ui/components/chat/filePicker", [
  "require",
  "exports",
  "module",
  "ui/viewModels/chat/filePicker",
  "vendor/knockout",
  "constants/components",
  "text!views/chat/filePicker.html"
], function (e, t) {
  function i(e, t) {
    var i = n.build(e, t);
    return i.setContext(r.dataFor(t.element)), i.init(), i;
  }
  var n = e("ui/viewModels/chat/filePicker"), r = e("vendor/knockout");
  t.name = e("constants/components").chat.FILE_PICKER;
  t.template = e("text!views/chat/filePicker.html");
  t.viewModel = { createViewModel: i };
});
