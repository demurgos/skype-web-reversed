define("ui/components/chat/conversation", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "swx-constants",
  "ui/viewModels/chat/conversation",
  "constants/components",
  "text!views/chat/conversation.html"
], function (e, t) {
  function s(e, t) {
    var s = t.element, o = e.model, u = e.origin, a = n.dataFor(s), f;
    if (!o)
      return;
    return f = new i(o, u), f.setContext(a), f.init(), f.dispatchEvent(r.navigation.COMPONENT_RENDERED), f;
  }
  var n = e("vendor/knockout"), r = e("swx-constants").COMMON.events, i = e("ui/viewModels/chat/conversation");
  t.name = e("constants/components").chat.CONVERSATION;
  t.template = e("text!views/chat/conversation.html");
  t.viewModel = { createViewModel: s };
});
