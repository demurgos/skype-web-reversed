define("ui/components/chat/pes.v2/expressionPicker", [
  "require",
  "exports",
  "module",
  "ui/components/chat/pes.v2/expressionPickerController",
  "ui/viewModels/chat/pes.v2/expressionPicker",
  "vendor/knockout",
  "constants/components",
  "text!views/chat/pes.v2/expressionPicker.html"
], function (e, t) {
  function s(e, t) {
    var s = t.element, o = i.dataFor(s), u = n.build(), a = r.build({
        isDisabled: e.isDisabled,
        eventEmitter: u
      }, s);
    return a.init(), u.init(a, o), a;
  }
  var n = e("ui/components/chat/pes.v2/expressionPickerController"), r = e("ui/viewModels/chat/pes.v2/expressionPicker"), i = e("vendor/knockout");
  t.name = e("constants/components").chat.EXPRESSION_PICKER;
  t.template = e("text!views/chat/pes.v2/expressionPicker.html");
  t.viewModel = { createViewModel: s };
});
