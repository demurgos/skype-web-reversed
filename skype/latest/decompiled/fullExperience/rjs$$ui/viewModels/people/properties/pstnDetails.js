define("ui/viewModels/people/properties/pstnDetails", [
  "require",
  "vendor/knockout",
  "ui/modelHelpers/personHelper"
], function (e) {
  function r(e) {
    function i() {
      r.phoneNumbers(e.phoneNumbers());
    }
    var r = this;
    return r.isPstn = t.observable(n.isPstn(e)), r.phoneNumbers = t.observable([]), e.phoneNumbers.changed(i), r.dispose = function () {
      e.phoneNumbers.changed.off(i);
    }, r;
  }
  var t = e("vendor/knockout"), n = e("ui/modelHelpers/personHelper");
  return r.build = function (e) {
    return new r(e);
  }, r;
});
