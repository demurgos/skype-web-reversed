define("ui/components/chat/chatInputActionPicker", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/chat/chatInputActionPicker",
  "constants/components",
  "text!views/chat/chatInputActionPicker.html"
], function (e, t) {
  function i(e, t) {
    var i = r.build(e);
    return i.setContext(n.dataFor(t.element)), i.init(), i;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/chat/chatInputActionPicker");
  t.name = e("constants/components").chat.CHAT_INPUT_ACTION_PICKER, t.template = e("text!views/chat/chatInputActionPicker.html"), t.viewModel = { createViewModel: i };
})
