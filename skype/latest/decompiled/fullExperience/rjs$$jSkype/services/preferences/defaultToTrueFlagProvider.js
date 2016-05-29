define("jSkype/services/preferences/defaultToTrueFlagProvider", [
  "require",
  "lodash-compat",
  "jSkype/services/preferences/flagsServiceProvider",
  "utils/common/builderMixin"
], function (e) {
  function i(e) {
    n.call(this, e);
  }
  var t = e("lodash-compat"), n = e("jSkype/services/preferences/flagsServiceProvider"), r = e("utils/common/builderMixin");
  return i.prototype.read = function () {
    return n.prototype.read.call(this).then(function (e) {
      return !e;
    });
  }, i.prototype.update = function (e) {
    return n.prototype.update.call(this, !e);
  }, t.assign(i, r), i;
});
