define("ui/components/chat/newConversation", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "swx-constants",
  "ui/viewModels/chat/newConversation",
  "constants/components",
  "text!views/chat/newConversation.html"
], function (e, t) {
  function s(e, t) {
    var s = t.element, o = n.dataFor(s), u = new i();
    return u.setContext(o), u.dispatchEvent(r.navigation.COMPONENT_RENDERED), u;
  }
  var n = e("vendor/knockout"), r = e("swx-constants").COMMON.events, i = e("ui/viewModels/chat/newConversation");
  t.name = e("constants/components").chat.NEW_CONVERSATION;
  t.template = e("text!views/chat/newConversation.html");
  t.viewModel = { createViewModel: s };
});
