define("ui/components/chat/groupSearch", [
  "require",
  "exports",
  "module",
  "ui/viewModels/chat/groupSearch",
  "ui/viewModels/chat/message",
  "ui/viewModels/chat/recent",
  "constants/components",
  "text!views/chat/groupSearch.html"
], function (e, t) {
  function s() {
    var e = new n(i, r);
    return e.init(), e;
  }
  var n = e("ui/viewModels/chat/groupSearch"), r = e("ui/viewModels/chat/message"), i = e("ui/viewModels/chat/recent");
  t.name = e("constants/components").chat.GROUP_SEARCH;
  t.template = e("text!views/chat/groupSearch.html");
  t.viewModel = { createViewModel: s };
});
