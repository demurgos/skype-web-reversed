define("ui/components/chat/uploadManager", [
  "require",
  "exports",
  "module",
  "ui/viewModels/chat/uploadManager",
  "constants/components",
  "text!views/chat/uploadManager.html"
], function (e, t) {
  function r(e) {
    return new n(e);
  }
  var n = e("ui/viewModels/chat/uploadManager");
  t.name = e("constants/components").chat.UPLOAD_MANAGER;
  t.template = e("text!views/chat/uploadManager.html");
  t.viewModel = { createViewModel: r };
});
