define("utils/common/styleModeHelper", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "browser/window",
  "vendor/knockout",
  "swx-constants",
  "experience/settings"
], function (e, t) {
  function c() {
    function v() {
      var e = 0;
      return c.length === 0 ? r.innerWidth : (c.forEach(function (t) {
        e += t.offsetWidth;
      }), e);
    }
    function m() {
      var t = v();
      e.currentMode(g(t));
    }
    function g(e) {
      return e <= u.breakpoint.MEDIUM ? u.NARROW : e > u.breakpoint.MEDIUM && e <= u.breakpoint.WIDE ? u.MEDIUM : u.WIDE;
    }
    function y() {
      var e = b(f);
      return e && (h = e), !!e;
    }
    function b(e) {
      return n.find(e, function (e) {
        return o.biAppName.toLowerCase().indexOf(e.toLowerCase()) > -1;
      });
    }
    var e = this, t = 500, a = n.debounce(m, t), c = [], h, p = y(), d = !!b(l);
    e.currentMode = i.observable(g(v()));
    p || r.addEventListener(s.events.browser.RESIZE, a);
    e.addContainer = function (t) {
      c.push(t);
      e.currentMode(g(v()));
    };
    e.appIsVisible = function () {
      return c.length > 0 && v() > 0;
    };
    e.isIntegratedProperty = function () {
      return p;
    };
    e.isConsumerIntegrated = function () {
      return d;
    };
    e.host = function () {
      return h;
    };
    e.dispose = function () {
      p || r.removeEventListener(s.events.browser.RESIZE, a);
      c = [];
    };
  }
  var n = e("lodash-compat"), r = e("browser/window"), i = e("vendor/knockout"), s = e("swx-constants").COMMON, o = e("experience/settings"), u = s.styleMode, a = null, f = {
      kahuna: "kahuna",
      owa: "outlook",
      o365: "o365",
      wac: "wac"
    }, l = {
      kahuna: "kahuna",
      owa: "outlook"
    };
  t.get = function () {
    return a === null && (a = new c()), a;
  };
  t.dispose = function () {
    a !== null && (a.dispose(), a = null);
  };
});
