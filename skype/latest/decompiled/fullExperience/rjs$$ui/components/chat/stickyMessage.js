define("ui/components/chat/stickyMessage", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/chat/stickyMessage",
  "jsviews/chat/stickyMessage",
  "constants/components",
  "text!views/chat/stickyMessage.html"
], function (e, t) {
  function s(e, t) {
    var s = t.element, o = new i(s), u = new r(o, e, t), a = n.dataFor(s);
    return u.setContext(a), u.init(), u;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/chat/stickyMessage"), i = e("jsviews/chat/stickyMessage");
  t.name = e("constants/components").chat.STICKY_MESSAGE, t.template = e("text!views/chat/stickyMessage.html"), t.viewModel = { createViewModel: s };
})
