(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-focus-handler/lib/focusHandler", [
      "require",
      "exports",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function s() {
    return r || (r = u()), r;
  }
  function o() {
    r = null;
  }
  function u() {
    function o(t, n) {
      return n === void 0 && (n = i.Low), r || (e = u()), n === i.Immediate ? (a(t, n), f()) : (!r || n < r.priority) && a(t, n), s(), e;
    }
    function u() {
      return new Promise(function (e) {
        t = e;
      });
    }
    function a(e, t) {
      r = {
        element: e,
        priority: t
      };
    }
    function f() {
      var e;
      r && (e = r.element, e && (e.focus(), t(e)));
      l();
    }
    function l() {
      s.cancel();
      r = null;
    }
    var e, t, r, s = n.debounce(f, 50);
    return { addFocusRequestToQueue: o };
  }
  var n = e("lodash-compat"), r, i;
  (function (e) {
    e[e.Immediate = 0] = "Immediate";
    e[e.High = 1] = "High";
    e[e.Low = 2] = "Low";
  }(i = t.Priorities || (t.Priorities = {})));
  t.get = s;
  t.reset = o;
  t.build = u;
}));
