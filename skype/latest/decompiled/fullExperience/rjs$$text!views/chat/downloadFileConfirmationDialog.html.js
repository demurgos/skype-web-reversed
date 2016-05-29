define("text!views/chat/downloadFileConfirmationDialog.html", [], function () {
  return "<div class=\"downloadFileConfirmationDialogContent\">\r\n    <p class=\"description\" data-bind=\"text:text\"></p>\r\n    <!-- ko if:isSafetype -->\r\n    <p class=\"donotshowagain\">\r\n        <input type=\"checkbox\" data-bind=\"checked:stopShowingAgain\"/>\r\n        <span data-bind=\"l10n:{key:'file_transfer_download_dialog_do_not_ask_checkbox'}\"></span>\r\n    </p>\r\n    <!-- /ko -->\r\n</div>\r\n";
});
