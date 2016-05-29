define("text!views/chat/heart.html", [], function () {
  return "<div class=\"Heart\" data-bind=\"css: heartCss\">\r\n    <span class=\"iconfont clickable\" data-bind=\"click: onClickHandler, attr: {'aria-label': heartButtonLabel}\" role=\"button\"></span>\r\n    <!-- ko if: (heartsCount && heartsCount() > 1) -->\r\n    <span class=\"counter\" data-bind=\"text: heartsCount\"></span>\r\n    <!-- /ko -->\r\n</div>\r\n";
});
