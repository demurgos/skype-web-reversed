define("ui/components/chat/headerSingleConversation", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "browser/dom",
  "utils/common/scroll",
  "ui/viewModels/chat/headerSingleConversation",
  "constants/components",
  "text!views/chat/headerSingleConversation.html"
], function (e, t) {
  function o(e, t) {
    var o = r.getElement(".scrollingContainer", t.element), u = i.build(o), a = new s(e, u);
    return a.setContext(n.dataFor(t.element)), a.init(), a;
  }
  var n = e("vendor/knockout"), r = e("browser/dom"), i = e("utils/common/scroll"), s = e("ui/viewModels/chat/headerSingleConversation");
  t.name = e("constants/components").chat.HEADER_SINGLE_CONVERSATION;
  t.template = e("text!views/chat/headerSingleConversation.html");
  t.viewModel = { createViewModel: o };
});
