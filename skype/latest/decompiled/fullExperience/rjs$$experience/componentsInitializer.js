define("experience/componentsInitializer", [], function () {
  function t(t, n, r) {
    function o() {
      ++i === t.length && (window.clearTimeout(s), n && (n(), u()));
    }
    function u() {
      t.forEach(function (e) {
        e.load && e.load();
      });
    }
    function a() {
      n = null;
      r("Initialization not completed by timeout period.");
    }
    var i = 0, s = window.setTimeout(a, e);
    t.forEach(function (e) {
      e.init(o);
    });
  }
  var e = 3000;
  return { init: t };
});
