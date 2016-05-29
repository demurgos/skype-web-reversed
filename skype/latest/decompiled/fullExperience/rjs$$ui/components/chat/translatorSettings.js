define("ui/components/chat/translatorSettings", [
  "require",
  "exports",
  "module",
  "ui/viewModels/chat/translator/translatorSettings",
  "constants/components",
  "text!views/chat/translator/translatorSettings.html"
], function (e, t) {
  function r(e) {
    var t = n.build(e);
    return t.init(), t;
  }
  var n = e("ui/viewModels/chat/translator/translatorSettings");
  t.name = e("constants/components").chat.TRANSLATOR_SETTINGS;
  t.template = e("text!views/chat/translator/translatorSettings.html");
  t.viewModel = { createViewModel: r };
});
