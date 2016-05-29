define("ui/viewModels/experience/radioButton", [
  "require",
  "vendor/knockout"
], function (e) {
  function n(e) {
    var n = this;
    n.id = e.id;
    n.value = e.value ? e.value : "";
    n.name = e.name ? e.name : "";
    n.ariaLabel = e.ariaLabel ? e.ariaLabel : "";
    n.labelKey = e.labelKey ? e.labelKey : "";
    n.checked = e.checked;
    n.isInputChecked = t.pureComputed(function () {
      return n.checked() === n.value ? "checked" : "";
    }, n);
  }
  var t = e("vendor/knockout");
  return n;
});
