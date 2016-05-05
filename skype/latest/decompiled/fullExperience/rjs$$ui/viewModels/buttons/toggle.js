define("ui/viewModels/buttons/toggle", [], function () {
  function e(e) {
    this.checked = e.checked, this.ariaLabel = e.ariaLabel, this.labelledById = e.labelledById, this.onClick = e.click || function () {
    };
  }
  return e.build = function (t) {
    return new e(t);
  }, e;
})
