define("text!views/chat/pollDesigner.html", [], function () {
  return "<div class=\"bubble popup arrow down\" data-bind=\"css: { active: isOpened }, event: { keydown: handleKeyDown }\">\r\n\r\n    <textarea rows=\"1\" data-bind=\"l10n_attr: { 'placeholder': 'poll_designer_question_placeholder' }, textInput: questionText, event: { input: questionChanged, paste: onPasteQuestion }\"></textarea>\r\n\r\n    <fieldset class=\"poll-designer-content\" data-bind=\"template: { name: 'answer-template', foreach: answers, as: 'a' }\"></fieldset>\r\n\r\n    <div class=\"send-poll-button\">\r\n        <swx-button params=\"icon: 'send', cssClass: 'circle send-button large', disabled: !isSendButtonEnabled(),\r\n            titleKey: 'action_button_send', textKey: 'action_button_send', action: submitPoll,\r\n            ariaLabelKey: 'action_button_send'\"></swx-button>\r\n    </div>\r\n</div>\r\n\r\n<script type=\"text/html\" id=\"answer-template\">\r\n    <div class=\"answer-box\">\r\n        <input type=\"text\" data-bind=\"l10n_attr: { 'placeholder': 'poll_designer_answer_placeholder' }, textInput: a.value, event: { keypress: $parent.onAnswerKeypress, keydown: $parent.onAnswerKeydown, paste: $parent.onPasteAnswer}, hasfocus: a.focused\" />\r\n        <button tabindex=\"-1\" data-bind=\"visible: a.allowRemove, event: { click: $parent.removeAnswer }\" type=\"button\" class=\"btn primary circle small transparent delete-answer\">\r\n            <span class=\"iconfont cross\" tabindex=\"0\"></span>\r\n        </button>\r\n    </div>\r\n</script>\r\n";
})
