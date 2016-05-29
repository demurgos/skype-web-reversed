define("ui/components/calling/participant", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/calling/callScreenViewModel/participantViewModel",
  "constants/components",
  "text!views/calling/participant.html"
], function (e, t) {
  function i(e, t) {
    var i = r.build(e), s = n.contextFor(t.element).$parent;
    return i.setContext(s), i.init(), i;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/calling/callScreenViewModel/participantViewModel");
  t.name = e("constants/components").calling.PARTICIPANT;
  t.template = e("text!views/calling/participant.html");
  t.viewModel = { createViewModel: i };
});
