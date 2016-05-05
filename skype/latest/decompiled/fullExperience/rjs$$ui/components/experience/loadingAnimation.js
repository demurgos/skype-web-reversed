define("ui/components/experience/loadingAnimation", [
  "require",
  "exports",
  "module",
  "constants/components",
  "text!views/common/spinner.html"
], function (e, t) {
  t.name = e("constants/components").experience.LOADING_ANIMATION, t.template = e("text!views/common/spinner.html");
})
