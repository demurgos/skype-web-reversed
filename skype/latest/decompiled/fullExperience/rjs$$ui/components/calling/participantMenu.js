define("ui/components/calling/participantMenu", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/people/contactName",
  "constants/components",
  "text!views/calling/participantMenu.html"
], function (e, t) {
  function i(e, t) {
    var i = new r(e.person()), s = n.contextFor(t.element).$parent;
    return i.setContext(s), i;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/people/contactName");
  t.name = e("constants/components").calling.PARTICIPANT_MENU;
  t.template = e("text!views/calling/participantMenu.html");
  t.viewModel = { createViewModel: i };
});
