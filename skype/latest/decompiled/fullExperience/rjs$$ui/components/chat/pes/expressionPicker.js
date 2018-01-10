define("ui/components/chat/pes/expressionPicker", [
  "require",
  "exports",
  "module",
  "ui/components/chat/pes/expressionPickerController",
  "ui/viewModels/chat/pes/expressionPicker",
  "swx-service-locator-instance",
  "swx-constants",
  "vendor/knockout",
  "constants/components",
  "text!views/chat/pes/expressionPicker.html"
], function (e, t) {
  function u(e, t) {
    var u, a = i.resolve(s.serviceLocator.FEATURE_FLAGS).isFeatureOn(s.featureFlags.OPTIMIZE_SPACE_FOR_CC), f = n.build(), l = t.element, c = o.dataFor(l);
    return a && l.classList.add("Mode--conversationControl"), u = r.build({
      isDisabled: e.isDisabled,
      eventEmitter: f
    }, l), u.init(), f.init(u, c), u;
  }
  var n = e("ui/components/chat/pes/expressionPickerController"), r = e("ui/viewModels/chat/pes/expressionPicker"), i = e("swx-service-locator-instance").default, s = e("swx-constants").COMMON, o = e("vendor/knockout");
  t.name = e("constants/components").chat.EXPRESSION_PICKER;
  t.template = e("text!views/chat/pes/expressionPicker.html");
  t.viewModel = { createViewModel: u };
});
