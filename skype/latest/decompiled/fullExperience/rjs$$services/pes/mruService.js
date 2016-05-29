define("services/pes/mruService", [
  "require",
  "lodash-compat",
  "constants/common",
  "services/serviceLocator",
  "utils/common/builderMixin"
], function (e) {
  function s() {
    var e = this;
    e.addItemsToMru = function (e) {
      t.isArray(e) || (e = [e]);
      var i = r.resolve(n.serviceLocator.PES_CONFIG_SERVICE);
      t.forEach(e, function (e) {
        i.addItemToMru(e.id);
      });
    };
  }
  var t = e("lodash-compat"), n = e("constants/common"), r = e("services/serviceLocator"), i = e("utils/common/builderMixin");
  return t.extend(s, i), s;
});
