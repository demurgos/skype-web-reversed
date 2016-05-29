define("utils/common/builderMixin", [
  "require",
  "lodash-compat"
], function (e) {
  function n() {
    return n.prototype;
  }
  var t = e("lodash-compat");
  return n.prototype = {
    build: function () {
      var e = Object.create(this.prototype);
      return this.apply(e, arguments) || e;
    }
  }, t.assign(n, n.prototype), n;
});
