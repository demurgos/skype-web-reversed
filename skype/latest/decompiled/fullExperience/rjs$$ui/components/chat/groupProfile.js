define("ui/components/chat/groupProfile", [
  "require",
  "exports",
  "module",
  "browser/dom",
  "utils/common/scroll",
  "ui/viewModels/chat/groupProfile",
  "vendor/knockout",
  "constants/components",
  "text!views/chat/groupProfile.html"
], function (e, t) {
  function o(e, t) {
    var o = n.getElement(".scrollingContainer", t.element), u = r.build(o), a = s.dataFor(t.element), f = new i(e, u);
    return f.setContext(a), f.init(), f;
  }
  var n = e("browser/dom"), r = e("utils/common/scroll"), i = e("ui/viewModels/chat/groupProfile"), s = e("vendor/knockout");
  t.name = e("constants/components").chat.GROUP_PROFILE;
  t.template = e("text!views/chat/groupProfile.html");
  t.viewModel = { createViewModel: o };
});
