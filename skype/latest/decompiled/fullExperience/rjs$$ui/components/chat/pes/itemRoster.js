define("ui/components/chat/pes/itemRoster", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/chat/pes/itemRoster",
  "constants/components",
  "text!views/chat/pes/itemRoster.html"
], function (e, t) {
  function i(e, t) {
    var i = t.element, s = n.dataFor(i), o = new r(e);
    return o.setContext(s), o.init(), o;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/chat/pes/itemRoster");
  t.name = e("constants/components").chat.EXPRESSION_ITEM_ROSTER;
  t.template = e("text!views/chat/pes/itemRoster.html");
  t.viewModel = { createViewModel: i };
});
