define("text!views/calling/endCall.html", [], function () {
  return "<div class=\"avatar\">\r\n    <swx-avatar-deprecated params=\"avatar: avatarUrl, isGroupAvatar: isGroupConversation\"></swx-avatar-deprecated>\r\n</div>\r\n<div class=\"text summary\">\r\n    <p class=\"fontSize-h2\" data-bind=\"l10n: {key: 'callscreen_text_terminationMessage'}\"></p>\r\n</div>\r\n<div class=\"text duration\">\r\n    <p class=\"fontSize-h1 large\" data-bind=\"text: duration\"></p>\r\n</div>\r\n";
})
