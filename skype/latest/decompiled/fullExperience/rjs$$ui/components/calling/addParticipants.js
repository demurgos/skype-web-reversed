define("ui/components/calling/addParticipants", [
  "require",
  "exports",
  "module",
  "ui/viewModels/calling/addParticipantsViewModel",
  "vendor/knockout",
  "constants/components",
  "text!views/calling/addParticipants.html"
], function (e, t) {
  function i(e, t) {
    var i = n.build(e.dialogName, e.conversation, t.element);
    return i.setContext(r.dataFor(t.element)), i.init(), i;
  }
  var n = e("ui/viewModels/calling/addParticipantsViewModel"), r = e("vendor/knockout");
  t.name = e("constants/components").calling.ADD_PARTICIPANTS;
  t.template = e("text!views/calling/addParticipants.html");
  t.viewModel = { createViewModel: i };
});
