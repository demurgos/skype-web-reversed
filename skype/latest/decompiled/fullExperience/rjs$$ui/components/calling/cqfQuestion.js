define("ui/components/calling/cqfQuestion", [
  "require",
  "exports",
  "module",
  "ui/viewModels/calling/cqfQuestionViewModel",
  "constants/components",
  "text!views/calling/cqfQuestion.html"
], function (e, t) {
  function r(e) {
    return n.build(e);
  }
  var n = e("ui/viewModels/calling/cqfQuestionViewModel");
  t.name = e("constants/components").calling.CQF_QUESTION;
  t.template = e("text!views/calling/cqfQuestion.html");
  t.viewModel = { createViewModel: r };
});
