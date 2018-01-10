define("ui/components/calling/participantMenu", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/calling/callScreenViewModel/participantMenuViewModel",
  "constants/components",
  "text!views/calling/participantMenu.html"
], function (e, t) {
  function i(e, t) {
    var i = r.build(e, t.element), s = n.dataFor(t.element);
    return i.setContext(s), i.init(), i;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/calling/callScreenViewModel/participantMenuViewModel");
  t.name = e("constants/components").calling.PARTICIPANT_MENU;
  t.template = e("text!views/calling/participantMenu.html");
  t.viewModel = { createViewModel: i };
});
