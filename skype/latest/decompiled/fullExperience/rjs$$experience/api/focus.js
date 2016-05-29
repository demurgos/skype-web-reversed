define("experience/api/focus", [
  "require",
  "exports",
  "module",
  "utils/common/applicationFocusManager"
], function (e, t) {
  var n = e("utils/common/applicationFocusManager");
  t.restoreFocus = function () {
    n.tryRestoreFocus();
  };
});
