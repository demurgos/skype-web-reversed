(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-xhr-dispatcher/lib/decorations/retry", [
      "require",
      "exports",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function i(e, t) {
    var i = n.assign({}, r, t);
    return function (r) {
      var o = !1, a, f = new Promise(function (t, f) {
          function c(n) {
            a = e(r);
            o && a.abort();
            a.then(function (e) {
              t(h(e, n));
            })["catch"](function (e) {
              if (i.isSuccessCheck(e)) {
                var r = { request: e };
                t(h(r, n));
              } else
                !o && s(n, i) && i.isTransientCheck(e) ? u(c, n, i) : f(h(e, n));
            });
          }
          function h(e, t) {
            return t > 1 && (e.retry = {
              count: t,
              ttc: n.now() - l
            }), e;
          }
          var l = n.now();
          c(1);
        });
      return f.abort = function () {
        o = !0;
        a && a.abort();
      }, f;
    };
  }
  function s(e, t) {
    return t.enabled && e < t.limit;
  }
  function o(e, n) {
    return n.strategy === t.STRATEGIES.INCREMENTAL ? n.delay * e : n.strategy === t.STRATEGIES.EXPONENTIAL ? Math.pow(3, e - 1) * n.delay : n.delay;
  }
  function u(e, t, r) {
    function i() {
      e(++t);
    }
    n.delay(i, o(t, r));
  }
  function a() {
    return !1;
  }
  var n = e("lodash-compat");
  t.name = "retry";
  t.STRATEGIES = {
    INCREMENTAL: "incremental",
    EXPONENTIAL: "exponential",
    FIXED: "fixed"
  };
  var r = {
    enabled: !0,
    limit: 3,
    delay: 3000,
    strategy: t.STRATEGIES.EXPONENTIAL,
    isSuccessCheck: a,
    isTransientCheck: a
  };
  t.build = i;
}));
