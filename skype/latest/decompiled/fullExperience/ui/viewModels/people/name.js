define("ui/viewModels/people/name", [
  "require",
  "vendor/knockout",
  "ui/viewModels/people/contact",
  "ui/viewModels/people/contactBuilder"
], function (e) {
  function s(e) {
    function r() {
      var e = i.replace(/\{importance\}/g, n.headerImportance());
      return e.replace("{displayName}", n.contact.displayName());
    }
    var n = this;
    n.contact = o(e), n.headerImportance = t.observable(4), n.heading = t.computed(r);
  }
  function o(e) {
    return e instanceof n ? e : r.build(e);
  }
  var t = e("vendor/knockout"), n = e("ui/viewModels/people/contact"), r = e("ui/viewModels/people/contactBuilder"), i = "<h{importance}>{displayName}</h{importance}>";
  return s.prototype.dispose = function () {
    this.heading.dispose(), this.contact.dispose();
  }, s;
})
