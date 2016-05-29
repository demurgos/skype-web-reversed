define("ui/components/chat/contactCard", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/chat/contactCard",
  "constants/components",
  "text!views/chat/contactCard.html"
], function (e, t) {
  function i(e, t) {
    var i = new r(e);
    return i.setContext(n.dataFor(t.element)), i;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/chat/contactCard");
  t.name = e("constants/components").chat.CONTACT_CARD;
  t.template = e("text!views/chat/contactCard.html");
  t.viewModel = { createViewModel: i };
});
