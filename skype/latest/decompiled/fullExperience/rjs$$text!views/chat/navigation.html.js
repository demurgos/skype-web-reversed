define("text!views/chat/navigation.html", [], function () {
  return "<div class=\"fragmentsContainer\" data-bind=\"foreach: fragments, css: { showContent: expandContent, hideContent: shrinkContent }, event: { mousemove: handleUserAction, click: handleUserAction, mousewheel: handleUserAction, keydown: handleUserAction }\">\r\n    <div class=\"fragment hide\" aria-hidden=\"true\" data-bind=\"component: { name: $data.name, params: $data.options },css: { hide: hidden },attr: { 'aria-hidden': hidden }\"></div>\r\n</div>\r\n";
});
