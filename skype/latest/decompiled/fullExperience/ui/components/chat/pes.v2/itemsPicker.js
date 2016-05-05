define("ui/components/chat/pes.v2/itemsPicker", [
  "require",
  "exports",
  "module",
  "ui/viewModels/chat/pes.v2/itemsPicker",
  "utils/common/scroll",
  "browser/dom",
  "constants/components",
  "text!views/chat/pes.v2/itemsPicker.html"
], function (e, t) {
  function s(e, t) {
    var s = t.element, o = r.build(i.getElement(".picker", s)), u = new n(e, o, s);
    return u.init(), u;
  }
  var n = e("ui/viewModels/chat/pes.v2/itemsPicker"), r = e("utils/common/scroll"), i = e("browser/dom");
  t.name = e("constants/components").chat.EXPRESSION_ITEMS_PICKER, t.template = e("text!views/chat/pes.v2/itemsPicker.html"), t.viewModel = { createViewModel: s };
})
