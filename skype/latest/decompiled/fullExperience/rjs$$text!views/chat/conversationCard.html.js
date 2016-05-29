define("text!views/chat/conversationCard.html", [], function () {
  return "<div class=\"participant\" role=\"button\" data-bind=\"click: action\">\r\n    <swx-avatar-deprecated params=\"isGroupAvatar: isGroupConversation, avatar: avatarUrl, status: statusClassName\" class=\"avatar\"></swx-avatar-deprecated>\r\n    <div class=\"text\">\r\n        <span class=\"tile\">\r\n            <span class=\"tileName\">\r\n                <h4 data-bind=\"text: topic\"></h4>\r\n            </span>\r\n        </span>\r\n    </div>\r\n</div>\r\n";
});
