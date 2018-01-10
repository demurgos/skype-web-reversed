define("text!views/chat/chatInputSendContactCard.html", [], function () {
  return "<button class=\"sendContactCard\" data-bind=\"click:openShareControl, l10n_attr:{'title':'contactPicker_sendContacts_title', 'aria-label':'contactPicker_sendContacts_title'}, css:{disabled: isDisabled}, attr:{disabled : isDisabled}\">\r\n    <span class=\"icon iconfont contactCard\"></span>\r\n    <span class=\"text\" data-bind=\"l10n:{'key':'contactPicker_sendContacts_title'}\"></span>\r\n</button>\r\n";
});
