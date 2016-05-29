define("ui/components/chat/textarea", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/chat/textarea",
  "jsviews/chat/textarea",
  "constants/components",
  "text!views/chat/textarea.html"
], function (e, t) {
  function s(e, t) {
    var s = t.element, o = new i(s, e.chatInputEl), u = new r(o, e), a = n.dataFor(s);
    return u.setContext(a), u.init(), u;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/chat/textarea"), i = e("jsviews/chat/textarea");
  t.name = e("constants/components").chat.TEXTAREA;
  t.template = e("text!views/chat/textarea.html");
  t.viewModel = { createViewModel: s };
});
