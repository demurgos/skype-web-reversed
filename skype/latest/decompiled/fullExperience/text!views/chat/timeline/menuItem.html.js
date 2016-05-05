define("text!views/chat/timeline/menuItem.html", [], function () {
  return "<a href=\"#\" role=\"menuitem\" class=\"navItem\"\r\n   data-bind=\"css: {active: isActive, icon: isNavigationMenuIconsEnabled}, visible: !isDisabled(), event: {click: onClick, keydown: onKeyDown}, attr: { id: id }\">\r\n        <span class=\"icon\">\r\n            <span class=\"iconfont\" data-bind=\"css: icon, attr: { title: getTitleText() }\"></span>\r\n        </span>\r\n        <span class=\"text\">\r\n            <h4 data-bind=\"text: text\"></h4>\r\n        </span>\r\n</a>\r\n";
})
