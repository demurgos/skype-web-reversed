define("ui/viewModels/people/phoneNumber", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "utils/common/cafeObservable",
  "swx-utils-common",
  "swx-i18n",
  "swx-enums"
], function (e, t) {
  function u(e) {
    function u() {
      var e = t.type() || o.phoneType.Other, n = "label_text_phone_number_type_" + e.toLowerCase();
      return s.fetch({ key: n });
    }
    function a() {
      return i.forceLTREmbedding(t.phoneNumber());
    }
    var t = this;
    t.phoneNumber = r.newObservableProperty(e.displayString), t.displayString = n.computed(a), t.type = r.newObservableProperty(e.type), t.displayType = n.computed(u);
  }
  var n = e("vendor/knockout"), r = e("utils/common/cafeObservable"), i = e("swx-utils-common").stringUtils, s = e("swx-i18n").localization, o = e("swx-enums");
  u.prototype.dispose = function () {
    this.displayType.dispose(), this.displayString.dispose();
  }, t.classFunction = u, t.build = function (e) {
    return new u(e);
  };
})
