define("ui/components/me/moodMessage", [
  "require",
  "exports",
  "module",
  "ui/viewModels/me/moodMessage",
  "constants/components",
  "text!views/me/moodMessage.html"
], function (e, t) {
  function r(e, t) {
    var r = t.element, i = n.build(e, r);
    return i.init(), i;
  }
  var n = e("ui/viewModels/me/moodMessage");
  t.name = e("constants/components").me.MOOD_MESSAGE;
  t.template = e("text!views/me/moodMessage.html");
  t.viewModel = { createViewModel: r };
});
