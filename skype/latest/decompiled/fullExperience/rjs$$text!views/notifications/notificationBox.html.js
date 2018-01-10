define("text!views/notifications/notificationBox.html", [], function () {
  return "<!-- ko if: isVisible -->\r\n<div class=\"bannerNotification info\">\r\n    <span class=\"iconfont bell\"></span>\r\n    <a href='#' data-bind=\"click: requestPermission, l10n: { 'key': 'enable_browser_notifications_link_text' }\"></a>\r\n</div>\r\n<!-- /ko -->\r\n";
});
