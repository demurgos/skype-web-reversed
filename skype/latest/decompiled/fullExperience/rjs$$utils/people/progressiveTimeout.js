define("utils/people/progressiveTimeout", [
  "require",
  "exports",
  "module",
  "swx-utils-common",
  "browser/window",
  "services/serviceLocator",
  "constants/common"
], function (e, t) {
  function a() {
    function t(n) {
      var i, s = e.timeouts[n];
      s.timeoutId = r.setTimeout(function () {
        t(n);
      }, s.timeout);
      for (i in s.callbacks)
        s.callbacks.hasOwnProperty(i) && s.callbacks[i].call();
    }
    var e = this;
    e.timeouts = {};
    e.start = function (r, i) {
      var s, o = n.create();
      return e.timeouts.hasOwnProperty(r) || (e.timeouts[r] = {
        callbacks: {},
        timeoutId: null,
        timeout: l()
      }), s = e.timeouts[r], s.callbacks || (s.callbacks = {}), s.callbacks[o] = i, s.timeoutId === null && t(r), o;
    };
    e.stop = function (t, n) {
      var i = e.timeouts[t];
      if (!i)
        return;
      i.callbacks.hasOwnProperty(n) && delete i.callbacks[n];
      Object.keys(i.callbacks).length === 0 && (r.clearTimeout(i.timeoutId), i.timeoutId = null);
    };
    e.reset = function (t, n) {
      e.timeouts.hasOwnProperty(t) && (e.timeouts[t].timeout = l(n));
    };
  }
  function f(e) {
    return e * 60 * 1000;
  }
  function l(e) {
    var t, n;
    if (e === undefined)
      return f(u[0].timeout);
    for (t = 0; t < u.length; t++) {
      n = u[t];
      if (e > n.limit)
        continue;
      return f(n.timeout);
    }
    return f(u[u.length - 1].timeout);
  }
  var n = e("swx-utils-common").guid, r = e("browser/window"), i = e("services/serviceLocator"), s = e("constants/common"), o = {
      ONE_MINUTE: 1,
      LIMIT_HOUR: 59,
      ONE_HOUR: 60,
      LIMIT_DAY: 1439,
      ONE_DAY: 1440
    }, u = [
      {
        timeout: o.ONE_MINUTE,
        limit: o.LIMIT_HOUR
      },
      {
        timeout: o.ONE_HOUR,
        limit: o.LIMIT_DAY
      },
      { timeout: o.ONE_DAY }
    ];
  t.classFunction = a;
  t.get = function () {
    return i.resolve(s.serviceLocator.PROGRESSIVE_TIMEOUT);
  };
});
