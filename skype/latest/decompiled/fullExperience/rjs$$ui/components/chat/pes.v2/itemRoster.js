define("ui/components/chat/pes.v2/itemRoster", [
  "require",
  "exports",
  "module",
  "ui/viewModels/chat/pes.v2/itemRoster",
  "constants/components",
  "text!views/chat/pes.v2/itemRoster.html"
], function (e, t) {
  function r(e, t) {
    var r = t.element, i = new n(e, r);
    return i.init(), i;
  }
  var n = e("ui/viewModels/chat/pes.v2/itemRoster");
  t.name = e("constants/components").chat.EXPRESSION_ITEM_ROSTER;
  t.template = e("text!views/chat/pes.v2/itemRoster.html");
  t.viewModel = { createViewModel: r };
});
