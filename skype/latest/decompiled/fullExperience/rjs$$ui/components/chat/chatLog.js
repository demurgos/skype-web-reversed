define("ui/components/chat/chatLog", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/chat/chatLog",
  "jsviews/chat/chatLog",
  "ui/viewModels/chat/message",
  "ui/viewModels/chat/conversationProcessor",
  "utils/common/resizeHandler",
  "telemetry/chat/conversationHistoryLoad",
  "constants/components",
  "text!views/chat/chatLog.html"
], function (e, t) {
  function f(e, t) {
    var f = new i(t.element, u), l = n.dataFor(t.element), c = new r(s, l), h = new o(), p = new a(e.conversationModel);
    return c.setContext(l), c.init(e.conversationModel, f, h, p), c;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/chat/chatLog"), i = e("jsviews/chat/chatLog"), s = e("ui/viewModels/chat/message"), o = e("ui/viewModels/chat/conversationProcessor"), u = e("utils/common/resizeHandler"), a = e("telemetry/chat/conversationHistoryLoad");
  t.name = e("constants/components").chat.CHAT_LOG;
  t.template = e("text!views/chat/chatLog.html");
  t.viewModel = { createViewModel: f };
});
