define("ui/components/chat/pes/itemRoster", [
  "require",
  "exports",
  "module",
  "ui/viewModels/chat/pes/itemRoster",
  "constants/components",
  "text!views/chat/pes/itemRoster.html"
], function (e, t) {
  function r(e, t) {
    var r = t.element, i = new n(e, r);
    return i.init(), i;
  }
  var n = e("ui/viewModels/chat/pes/itemRoster");
  t.name = e("constants/components").chat.EXPRESSION_ITEM_ROSTER;
  t.template = e("text!views/chat/pes/itemRoster.html");
  t.viewModel = { createViewModel: r };
});
