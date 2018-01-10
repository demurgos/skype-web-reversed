define("experience/api/navigation", [
  "require",
  "exports",
  "module",
  "swx-ui-navigation"
], function (e, t) {
  var n = e("swx-ui-navigation");
  t.navigateBySkypeUri = function (t) {
    n.navigate(t);
  };
});
