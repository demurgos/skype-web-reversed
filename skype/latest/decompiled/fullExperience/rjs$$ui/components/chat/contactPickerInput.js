define("ui/components/chat/contactPickerInput", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/chat/contactPickerInput",
  "constants/components",
  "text!views/chat/contactPickerInput.html"
], function (e, t) {
  function i(e, t) {
    var i = new r();
    return i.setContext(n.dataFor(t.element)), i.init(t.element), e.setParticipantProvider(i), i;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/chat/contactPickerInput");
  t.name = e("constants/components").chat.CONTACT_PICKER_INPUT, t.template = e("text!views/chat/contactPickerInput.html"), t.viewModel = { createViewModel: i };
})
