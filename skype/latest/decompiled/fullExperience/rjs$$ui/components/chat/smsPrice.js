define("ui/components/chat/smsPrice", [
  "require",
  "exports",
  "module",
  "ui/viewModels/chat/smsPrice",
  "vendor/knockout",
  "constants/components",
  "text!views/chat/smsPrice.html"
], function (e, t) {
  function i(e, t) {
    var i = t.element, s = new n(e), o = r.dataFor(i);
    return s.setContext(o), s.init(), s;
  }
  var n = e("ui/viewModels/chat/smsPrice"), r = e("vendor/knockout");
  t.name = e("constants/components").chat.SMS_PRICE;
  t.template = e("text!views/chat/smsPrice.html");
  t.viewModel = { createViewModel: i };
});
