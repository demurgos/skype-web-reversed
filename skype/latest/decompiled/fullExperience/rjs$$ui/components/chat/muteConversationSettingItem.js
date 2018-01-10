define("ui/components/chat/muteConversationSettingItem", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/chat/muteConversationSettingItem",
  "constants/components",
  "text!views/chat/muteConversationSettingItem.html"
], function (e, t) {
  function i(e, t) {
    var i = new r(e), s = n.dataFor(t.element);
    return i.setContext(s), i;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/chat/muteConversationSettingItem");
  t.name = e("constants/components").chat.MUTE_CONVERSATION_SETTING_ITEM;
  t.template = e("text!views/chat/muteConversationSettingItem.html");
  t.viewModel = { createViewModel: i };
});
