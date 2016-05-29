define("text!views/calling/endCallButton.html", [], function () {
  return "<button data-bind=\"click: endCall, enable: isCallControlEnabled(), css: { disabled: !isCallControlEnabled() }, l10n_attr: { 'title': 'callscreen_text_endCall' }\" class=\"btn small red circle endCall\" type=\"button\">\r\n    <span class=\"iconfont callEnd\" data-bind=\"l10n: { 'key': 'callscreen_text_endCall' }\"></span>\r\n</button>\r\n";
});
