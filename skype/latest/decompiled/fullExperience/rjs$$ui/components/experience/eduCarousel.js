define("ui/components/experience/eduCarousel", [
  "require",
  "exports",
  "module",
  "ui/viewModels/experience/eduCarousel",
  "constants/components",
  "text!views/experience/eduCarousel.html"
], function (e, t) {
  function r() {
    var e = n.build();
    return e.init(), e;
  }
  var n = e("ui/viewModels/experience/eduCarousel");
  t.name = e("constants/components").experience.EDUCATIONAL_CAROUSEL;
  t.template = e("text!views/experience/eduCarousel.html");
  t.viewModel = { createViewModel: r };
});
