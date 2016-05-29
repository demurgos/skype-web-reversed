define("ui/components/chat/userListPopup", [
  "require",
  "exports",
  "module",
  "ui/viewModels/chat/userListPopup",
  "constants/components",
  "text!views/chat/userListPopup.html"
], function (e, t) {
  function r(e, t) {
    var r = n.build(e, t.element);
    return r.setContext(e.eventContext), r.init(), r;
  }
  var n = e("ui/viewModels/chat/userListPopup");
  t.name = e("constants/components").chat.USER_LIST_POPUP;
  t.template = e("text!views/chat/userListPopup.html");
  t.viewModel = { createViewModel: r };
});
