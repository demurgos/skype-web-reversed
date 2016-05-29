define("ui/components/chat/pes.v2/store/browseTabs", [
  "require",
  "text!views/chat/pes.v2/store/browseTabs.html",
  "ui/viewModels/chat/pes.v2/store/browseTabs",
  "constants/components"
], function (e) {
  function r() {
    function r(e, t) {
      var r = t.element, i = n.build(r, e);
      return i;
    }
    return {
      viewModel: { createViewModel: r },
      template: t,
      name: e("constants/components").chat.EXPRESSION_STORE_V2_BROWSE_PACKS
    };
  }
  var t = e("text!views/chat/pes.v2/store/browseTabs.html"), n = e("ui/viewModels/chat/pes.v2/store/browseTabs");
  return new r();
});
