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
    function i() {
      return this.contacts().length === 0;
    }
    e = e || {};
    e.contacts = e.contacts || [];
    this.name = e.name;
    this.contacts = t.observableArray([]);
    this.isHidden = t.computed(i, this);
    this.init = function () {
      var t = e.contacts.map(n);
      this.contacts(t);
    };
  }
  var t = e("vendor/knockout"), n = e("utils/common/ko"), r = e("ui/viewModels/people/contactBuilder");
  return i.prototype.dispose = function () {
    this.isHidden.dispose();
    n.disposeAndClearArray(this.contacts);
  }, i.build = function (e) {
    return new i(e);
  }, i;
});
