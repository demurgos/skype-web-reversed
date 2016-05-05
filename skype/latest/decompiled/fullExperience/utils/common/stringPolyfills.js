define("utils/common/stringPolyfills", [
  "require",
  "exports",
  "module"
], function (e, t) {
  t.localeCompare = function (e) {
    var t = this;
    return t < e ? -1 : t > e ? 1 : 0;
  };
})
