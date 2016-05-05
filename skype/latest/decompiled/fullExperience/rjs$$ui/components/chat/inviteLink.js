define("ui/components/chat/inviteLink", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/chat/inviteLink",
  "constants/components",
  "text!views/chat/inviteLink.html"
], function (e, t) {
  function i(e, t) {
    var i = r.build(e, t), s = n.dataFor(t.element);
    return i.setContext(s), i.init(), i;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/chat/inviteLink");
  t.name = e("constants/components").chat.INVITE_LINK, t.template = e("text!views/chat/inviteLink.html"), t.viewModel = { createViewModel: i };
})
