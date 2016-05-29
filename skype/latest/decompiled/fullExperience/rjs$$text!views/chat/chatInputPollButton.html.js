define("text!views/chat/chatInputPollButton.html", [], function () {
  return "<div class=\"chatInputPollButton\">\r\n    <button class=\"pollButton\" data-bind=\"click:openPollDesigner, l10n_attr:{'title':'button_text_poll'}, css:{disabled: isDisabled}, attr:{disabled : isDisabled}\">\r\n        <span class=\"icon iconfont poll\"></span>\r\n        <span class=\"text\" data-bind=\"l10n:{'key':'button_text_poll'}\"></span>\r\n    </button>\r\n    <swx-poll-designer params=\"isDisabled: isDisabled\"></swx-poll-designer>\r\n</div>\r\n";
});
