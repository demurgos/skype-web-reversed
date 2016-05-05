define("text!views/chat/notificationsMenuItem.html", [], function () {
  return "<a role=\"button\" class=\"navItem\"\r\n   data-bind=\"event: {mousedown: onClick}, attr: { id: id }, visible: !isDisabled()\">\r\n        <span class=\"icon\">\r\n            <span class=\"iconfont messageUnread\"></span>\r\n        </span>\r\n        <span class=\"text\">\r\n            <h4 data-bind=\"text: text\"></h4>\r\n        </span>\r\n</a>\r\n";
})
