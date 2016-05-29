define("ui/viewModels/people/contactPageContactGroup", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "utils/common/ko",
  "ui/viewModels/people/contactBuilder"
], function (e) {
  function s(e) {
    function r() {
      return this._hiddenContacts().every(function (e) {
        return e();
      });
    }
    function s() {
      this._hiddenContacts(t.map(this.contacts(), "isHidden"));
    }
    function o(e) {
      return i.build(e, { hideable: !0 });
    }
    this.name = e.name;
    this.contacts = n.observableArray(e.contacts.map(o));
    this._hiddenContacts = n.observableArray();
    this._contactsSubscription = this.contacts.subscribe(s, this, "arrayChange");
    s.call(this);
    this.isHidden = n.computed(r, this);
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("utils/common/ko"), i = e("ui/viewModels/people/contactBuilder");
  return s.prototype.dispose = function () {
    this._contactsSubscription.dispose();
    this.isHidden.dispose();
    r.disposeAndClearArray(this.contacts);
  }, s.build = function (e) {
    return new s(e);
  }, s;
});
