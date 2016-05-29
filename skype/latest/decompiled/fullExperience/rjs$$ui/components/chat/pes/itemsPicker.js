define("ui/components/chat/pes/itemsPicker", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/chat/pes/itemsPicker",
  "utils/common/scroll",
  "browser/dom",
  "constants/components",
  "text!views/chat/pes/itemsPicker.html"
], function (e, t) {
  function o(e, t) {
    var o = t.element, u = i.build(s.getElement(".picker", o)), a = n.dataFor(o), f = new r(e, u);
    return f.setContext(a), f.init(), f;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/chat/pes/itemsPicker"), i = e("utils/common/scroll"), s = e("browser/dom");
  t.name = e("constants/components").chat.EXPRESSION_ITEMS_PICKER;
  t.template = e("text!views/chat/pes/itemsPicker.html");
  t.viewModel = { createViewModel: o };
});
