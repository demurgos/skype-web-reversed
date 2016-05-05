define("ui/components/chat/suggestions/suggestionList", [
  "require",
  "vendor/knockout",
  "constants/components",
  "ui/viewModels/chat/suggestions/suggestionList",
  "text!views/chat/suggestions/suggestionList.html"
], function (e) {
  var t = e("vendor/knockout"), n = e("constants/components").chat.SUGGESTION_LIST, r = e("ui/viewModels/chat/suggestions/suggestionList"), i = e("text!views/chat/suggestions/suggestionList.html");
  return {
    name: n,
    template: i,
    viewModel: {
      createViewModel: function (n, i) {
        var s = r.build();
        return s.init(n), s.setContext(t.dataFor(i.element)), s;
      }
    }
  };
})
