define("services/navigation/navigationContext", [
  "require",
  "vendor/knockout"
], function (e) {
  function n() {
    this.currentPlaceName = t.observable(""), this.currentPlaceModel = t.observable(null), this.reset = function () {
      this.currentPlaceName(""), this.currentPlaceModel(null);
    };
  }
  var t = e("vendor/knockout");
  return n;
})
