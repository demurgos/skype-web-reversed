define("utils/common/async", [
  "require",
  "browser/window",
  "vendor/knockout"
], function (e) {
  function r(e) {
    var t, n, i;
    return i = function () {
      return e;
    }, i.nextValue = new Promise(function (e, i) {
      var s = !1;
      t = function (t) {
        if (s)
          throw new Error("The nextValue for this observable is already settled");
        return s = !0, t = r(t), e(t.actual), t;
      }, n = function (e) {
        if (s)
          throw new Error("The nextValue for this observable is already settled");
        s = !0, i(e);
      };
    }), {
      actual: i,
      future: {
        resolve: t,
        reject: n
      }
    };
  }
  function i(e, r, i) {
    var s = r ? e.bind(r) : e;
    return i ? n.tasks.schedule(s) : t.setTimeout(s, 0);
  }
  var t = e("browser/window"), n = e("vendor/knockout");
  return {
    execute: i,
    makeObservableValue: r
  };
})
