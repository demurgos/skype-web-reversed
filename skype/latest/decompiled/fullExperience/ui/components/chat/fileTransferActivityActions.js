define("ui/components/chat/fileTransferActivityActions", [
  "require",
  "exports",
  "module",
  "ui/viewModels/chat/fileTransferActivityActions",
  "constants/components",
  "text!views/chat/fileTransferActivityActions.html"
], function (e, t) {
  function r(e) {
    return n.build(e);
  }
  var n = e("ui/viewModels/chat/fileTransferActivityActions");
  t.name = e("constants/components").chat.FILE_TRANSFER_ACTIVITY_ACTIONS, t.template = e("text!views/chat/fileTransferActivityActions.html"), t.viewModel = { createViewModel: r };
})
