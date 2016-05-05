define("ui/components/chat/message", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "constants/components",
  "text!views/chat/message.html"
], function (e, t) {
  function r(e, t) {
    var r = e.viewModel, i = n.contextFor(t.element).$parent;
    return r.setContext(i), r.onRendered(), r.elementInfo = t, r;
  }
  var n = e("vendor/knockout");
  t.name = e("constants/components").chat.MESSAGE, t.template = e("text!views/chat/message.html"), t.viewModel = { createViewModel: r };
})
