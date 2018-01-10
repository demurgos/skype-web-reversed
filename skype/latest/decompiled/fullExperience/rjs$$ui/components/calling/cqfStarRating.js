define("ui/components/calling/cqfStarRating", [
  "require",
  "exports",
  "module",
  "ui/viewModels/calling/cqfStarRatingViewModel",
  "constants/components",
  "text!views/calling/cqfStarRating.html"
], function (e, t) {
  function r(e) {
    return n.build(e);
  }
  var n = e("ui/viewModels/calling/cqfStarRatingViewModel");
  t.name = e("constants/components").calling.CQF_STAR_RATING;
  t.template = e("text!views/calling/cqfStarRating.html");
  t.viewModel = { createViewModel: r };
});
