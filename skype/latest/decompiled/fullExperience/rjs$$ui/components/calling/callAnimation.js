define("ui/components/calling/callAnimation", [
  "require",
  "exports",
  "module",
  "constants/components",
  "text!views/calling/callAnimation.html"
], function (e, t) {
  t.name = e("constants/components").calling.CALL_ANIMATION;
  t.template = e("text!views/calling/callAnimation.html");
});
