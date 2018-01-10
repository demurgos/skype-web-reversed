define("ui/components/chat/messageDestinationPicker", [
  "require",
  "exports",
  "module",
  "ui/viewModels/chat/messageDestinationPicker",
  "constants/components",
  "text!views/chat/messageDestinationPicker.html"
], function (e, t) {
  function r(e) {
    return new n(e);
  }
  var n = e("ui/viewModels/chat/messageDestinationPicker");
  t.name = e("constants/components").chat.MESSAGE_DESTINATION_PICKER;
  t.template = e("text!views/chat/messageDestinationPicker.html");
  t.viewModel = { createViewModel: r };
});
