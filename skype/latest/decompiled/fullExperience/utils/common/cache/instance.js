define("utils/common/cache/instance", [
  "require",
  "exports",
  "module",
  "utils/common/cache/provider"
], function (e, t) {
  var n = e("utils/common/cache/provider"), r;
  t.get = function () {
    return r || (r = new n()), r;
  };
})
