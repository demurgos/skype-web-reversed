define("jSkype/services/serviceAccessLayer/decorations/retry", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "jSkype/settings",
  "utils/chat/dateTime"
], function (e, t) {
  function o(e) {
    return i.now() - e;
  }
  function u(e, t) {
    return e < t && r.settings.retry.enabled;
  }
  function a(e, t, n) {
    return t === s.INCREMENTAL ? n * e : t === s.EXPONENTIAL ? Math.pow(2, e - 1) * n : n;
  }
  function f(e, t, r, i) {
    function s() {
      e(++t);
    }
    n.delay(s, a(t, r, i));
  }
  function l() {
    return !1;
  }
  var n = e("lodash-compat"), r = e("jSkype/settings"), i = e("utils/chat/dateTime"), s = {
      INCREMENTAL: "incremental",
      EXPONENTIAL: "exponential",
      FIXED: "fixed"
    };
  r.settings.retry = r.settings.retry || {};
  t.STRATEGIES = s;
  t.build = function (t, n) {
    var a = n.limit || r.settings.retry.limit || 1, c = n.delay || r.settings.retry.delay || 1000, h = n.strategy || r.settings.retry.strategy || s.FIXED, p = n.isTransientCheck || l, d = n.isSuccessCheck || l;
    return function (n) {
      return new Promise(function (e, r) {
        function s(i) {
          t(n).then(function (t) {
            e(l(t, i));
          }, function (t) {
            if (d(t)) {
              var n = { request: t };
              e(l(n, i));
            } else
              u(i, a) && p(t) ? f(s, i, h, c) : r(l(t, i));
          });
        }
        function l(e, t) {
          return t > 1 && (e.retryCount = t, e.ttc = o(v)), e;
        }
        var v = i.now();
        s(1);
      });
    };
  };
});
