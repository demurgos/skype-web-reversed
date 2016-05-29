define("jSkype/services/serviceAccessLayer/decorations/availability", [
  "require",
  "exports",
  "module",
  "lodash-compat"
], function (e, t) {
  function r(e, t) {
    var r = n.clone(e);
    return r.url = t, r;
  }
  function i(e, t) {
    return e < t;
  }
  function s() {
    return !1;
  }
  var n = e("lodash-compat");
  t.build = function (t, n) {
    var o = n.alternateUrls || [], u = n.isTransientCheck || s;
    return function (n) {
      function f() {
        return Promise.resolve(t(r(n, a[s])));
      }
      function l(e) {
        if (!i(++s, a.length) || !u(e))
          throw e;
        f(s).catch(l);
      }
      var s = 0, a = [n.url].concat(o);
      return f(s).catch(l);
    };
  };
});
