define("text!views/calling/cqfQuestion.html", [], function () {
  return "<div class=\"CallQualityFeedbackQuestion\" data-bind=\"click: clickAction, css: {'CallQualityFeedbackQuestion--withTextarea': editlength}\">\r\n\t<div class=\"CallQualityFeedbackQuestion-text\" data-bind=\"l10n: {key: text}\"></div>\r\n\r\n\t<!-- ko if: !isWithTextarea -->\r\n\t<div class=\"CallQualityFeedbackQuestion-checkbox\" data-bind=\"css: {'CallQualityFeedbackQuestion-checkbox--checked': checked()}\">\r\n\t\t<div></div>\r\n\t</div>\r\n\t<!-- /ko -->\r\n\r\n\t<!-- ko if: isWithTextarea -->\r\n\t<textarea class=\"CallQualityFeedbackQuestion-textarea\" data-bind=\"textInput: comment, valueUpdate: 'afterkeydown', event: {'keyup': checkCommentLength }, attr: {maxlength: editlength}\"></textarea>\r\n\t<!-- /ko -->\r\n</div>";
})