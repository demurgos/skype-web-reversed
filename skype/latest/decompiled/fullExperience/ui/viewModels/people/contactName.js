define("ui/viewModels/people/contactName", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "utils/common/eventMixin",
  "ui/viewModels/people/properties/displayNameText"
], function (e) {
  function s(e) {
    var t = this, r = i.build(e);
    t.displayName = n.computed(r.compute), t.getPerson = function () {
      return e;
    }, t.dispose = function () {
      t.displayName.dispose(), r.dispose();
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("utils/common/eventMixin"), i = e("ui/viewModels/people/properties/displayNameText");
  return t.assign(s.prototype, r), s;
})
