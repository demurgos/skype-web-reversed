define("ui/components/chat/spaceSettings", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/chat/spaceSettings",
  "constants/components",
  "text!views/chat/spaceSettings.html"
], function (e, t) {
  function i(e, t) {
    var i = new r(e.conversationModel, e.defaultVal);
    return i.setContext(n.dataFor(t.element)), i;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/chat/spaceSettings");
  t.name = e("constants/components").chat.SPACE_SETTINGS, t.template = e("text!views/chat/spaceSettings.html"), t.viewModel = { createViewModel: i };
})
