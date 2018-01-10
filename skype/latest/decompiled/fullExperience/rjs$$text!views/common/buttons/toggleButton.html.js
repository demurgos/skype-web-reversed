define("text!views/common/buttons/toggleButton.html", [], function () {
  return "<button class=\"ToggleButton\" type=\"button\" role=\"checkbox\" aria-relevant=\"all\"\r\n        data-bind=\"disable: disabled, css: { 'ToggleButton--checked': checked }, click: onClick, attr: {'aria-label': ariaLabel, 'aria-checked': checked, 'aria-labelledby': labelledById }\">\r\n</button>\r\n";
});
