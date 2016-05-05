define("text!views/common/buttons/toggleButton.html", [], function () {
  return "<a href=\"#\" role=\"checkbox\" data-bind=\"click: onClick, attr: { 'aria-label': ariaLabel, 'aria-checked': checked, 'aria-labelledby': labelledById }\">\r\n\t<label class=\"ToggleButton\" data-bind=\"css: { 'ToggleButton--checked': checked }\">\r\n\t    <input type=\"checkbox\" id=\"availability\" class=\"ToggleButton-realElement\" tabindex=\"-1\" />\r\n\t</label>\r\n</a>\r\n";
})
