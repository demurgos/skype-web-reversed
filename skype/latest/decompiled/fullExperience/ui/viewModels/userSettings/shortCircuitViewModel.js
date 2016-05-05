define("ui/viewModels/userSettings/shortCircuitViewModel", [
  "require",
  "vendor/knockout"
], function (e) {
  function n() {
    var e = this, n;
    e.shortCircuitSetting = t.observable("allow"), n = e.shortCircuitSetting.subscribe(function (e) {
      e === "allow";
    }), e.openShortCircuitFlow = function () {
    }, e.dispose = function () {
      n.dispose();
    };
  }
  var t = e("vendor/knockout");
  return n;
})
