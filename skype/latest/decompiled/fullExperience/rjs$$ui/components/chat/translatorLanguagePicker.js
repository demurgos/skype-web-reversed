define("ui/components/chat/translatorLanguagePicker", [
  "require",
  "exports",
  "module",
  "ui/viewModels/chat/translator/translatorLanguagePicker",
  "constants/components",
  "text!views/chat/translator/translatorLanguagePicker.html"
], function (e, t) {
  function r(e, t) {
    var r = t.element, i = n.build(e, r);
    return i.init(), i;
  }
  var n = e("ui/viewModels/chat/translator/translatorLanguagePicker");
  t.name = e("constants/components").chat.TRANSLATOR_LANGUAGE_PICKER, t.template = e("text!views/chat/translator/translatorLanguagePicker.html"), t.viewModel = { createViewModel: r };
})
