define("utils/common/cache/instance", [
  "require",
  "exports",
  "module"
], function (e, t) {
  var n;
  t.get = function () {
    return n;
  };
  t.set = function (e) {
    n = e;
  };
});
