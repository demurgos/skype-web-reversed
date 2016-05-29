define("utils/common/settablePromise", [
  "require",
  "exports",
  "module",
  "helpers/polyfills"
], function (e, t) {
  e("helpers/polyfills");
  t.build = function () {
    var e, t, n = new Promise(function (n, r) {
        e = n;
        t = r;
      });
    return n.resolve = e, n.reject = t, n;
  };
});
