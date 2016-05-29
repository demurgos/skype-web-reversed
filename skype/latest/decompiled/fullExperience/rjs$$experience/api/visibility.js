define("experience/api/visibility", [
  "require",
  "exports",
  "module",
  "utils/common/appVisibilityProvider"
], function (e, t) {
  var n = e("utils/common/appVisibilityProvider");
  t.setFocus = function (e) {
    n.isVisible(e);
  };
});
