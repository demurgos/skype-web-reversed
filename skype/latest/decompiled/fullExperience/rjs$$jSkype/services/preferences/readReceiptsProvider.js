define("jSkype/services/preferences/readReceiptsProvider", [
  "require",
  "lodash-compat",
  "jSkype/services/preferences/optionsServiceProvider",
  "utils/common/builderMixin"
], function (e) {
  function i() {
    n.call(this, "OPT_READ_RECEIPT_OPTOUT");
  }
  var t = e("lodash-compat"), n = e("jSkype/services/preferences/optionsServiceProvider"), r = e("utils/common/builderMixin");
  return i.prototype.read = function () {
    return n.prototype.read.call(this).then(function (e) {
      return e === 0 || e === 1 ? !e : e;
    });
  }, i.prototype.update = function (e) {
    return n.prototype.update.call(this, e ? 0 : 1);
  }, t.assign(i, r), i;
});
