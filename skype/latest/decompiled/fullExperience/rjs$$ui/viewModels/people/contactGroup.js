define("ui/viewModels/people/contactGroup", [
  "require",
  "vendor/knockout",
  "utils/common/ko",
  "ui/viewModels/people/contactBuilder"
], function (e) {
  function i(e) {
    function n(e) {
      return r.build(e);
    }
    this.name = e.name;
    this.contacts = t.observableArray(e.contacts.map(n));
  }
  var t = e("vendor/knockout"), n = e("utils/common/ko"), r = e("ui/viewModels/people/contactBuilder");
  return i.prototype.dispose = function () {
    n.disposeAndClearArray(this.contacts);
  }, i.build = function (e) {
    return new i(e);
  }, i;
});
