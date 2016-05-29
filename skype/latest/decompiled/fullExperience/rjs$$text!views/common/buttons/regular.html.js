define("text!views/common/buttons/regular.html", [], function () {
  return "<button data-bind=\"click: onClickHandler, disable: disabled, attr: { class: buttonCssClass, title: title, 'aria-label': ariaLabel }\" type=\"button\">\r\n    <span data-bind=\"css: spanCssClass, text: text\"></span>\r\n    <!-- ko if: showMenuOptions -->\r\n    <div class=\"buttonMenuOptionsIcon\">\r\n        <span class=\"iconfont chevronDown\"></span>\r\n    </div>\r\n    <!-- /ko -->\r\n</button>\r\n";
});
