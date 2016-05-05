define("text!views/chat/selectedParticipantsConversation.html", [], function () {
  return "<div class=\"jumpToConversation\" data-bind=\"css:{hide:!hasMatchingConversations()}\">\r\n    <div class=\"topic\">\r\n        <p data-bind=\"l10n: {key: 'label_jumpToConversation'}\">Jump to conversation</p>\r\n    </div>\r\n    <div data-bind=\"foreach: matchingConversations\">\r\n        <swx-conversation-card params=\"conversationModel:$data, action:$parent.navigateToConversation\"></swx-conversation-card>\r\n    </div>\r\n</div>\r\n";
})
