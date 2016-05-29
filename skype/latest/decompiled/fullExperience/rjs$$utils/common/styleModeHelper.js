define("utils/common/styleModeHelper", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "browser/window",
  "vendor/knockout",
  "constants/common",
  "experience/settings"
], function (e, t) {
  function l() {
    function p() {
      var e = 0;
      return l.length === 0 ? r.innerWidth : (l.forEach(function (t) {
        e += t.offsetWidth;
      }), e);
    }
    function d() {
      var t = p();
      e.currentMode(v(t));
    }
    function v(e) {
      return e <= u.breakpoint.MEDIUM ? u.NARROW : e > u.breakpoint.MEDIUM && e <= u.breakpoint.WIDE ? u.MEDIUM : u.WIDE;
    }
    function m() {
      var e = n.find(f, function (e) {
        return o.biAppName.toLowerCase().indexOf(e.toLowerCase()) > -1;
      });
      return e && (c = e), !!e;
    }
    var e = this, t = 500, a = n.debounce(d, t), l = [], c, h = m();
    e.currentMode = i.observable(v(p()));
    h || r.addEventListener(s.events.browser.RESIZE, a);
    e.addContainer = function (t) {
      l.push(t);
      e.currentMode(v(p()));
    };
    e.appIsVisible = function () {
      return l.length > 0 && p() > 0;
    };
    e.isIntegratedProperty = function () {
      return h;
    };
    e.host = function () {
      return c;
    };
    e.dispose = function () {
      h || r.removeEventListener(s.events.browser.RESIZE, a);
      l = [];
    };
  }
  var n = e("lodash-compat"), r = e("browser/window"), i = e("vendor/knockout"), s = e("constants/common"), o = e("experience/settings"), u = s.styleMode, a = null, f = {
      kahuna: "kahuna",
      owa: "outlook",
      o365: "o365",
      wac: "wac"
    };
  t.get = function () {
    return a === null && (a = new l()), a;
  };
  t.dispose = function () {
    a !== null && (a.dispose(), a = null);
  };
});
