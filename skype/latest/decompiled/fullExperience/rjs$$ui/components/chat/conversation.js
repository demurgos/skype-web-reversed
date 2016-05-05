define("ui/components/chat/conversation", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "constants/common",
  "ui/viewModels/chat/conversation",
  "constants/components",
  "text!views/chat/conversation.html"
], function (e, t) {
  function s(e, t) {
    var s = t.element, o = e.model, u = n.dataFor(s), a;
    if (!o)
      return;
    return a = new i(o), a.setContext(u), a.init(), a.dispatchEvent(r.navigation.COMPONENT_RENDERED), a;
  }
  var n = e("vendor/knockout"), r = e("constants/common").events, i = e("ui/viewModels/chat/conversation");
  t.name = e("constants/components").chat.CONVERSATION, t.template = e("text!views/chat/conversation.html"), t.viewModel = { createViewModel: s };
})
