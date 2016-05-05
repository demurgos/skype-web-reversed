define("experience/componentsLoader", [
  "require",
  "experience/componentsInitializer",
  "componentsToLoad"
], function (e) {
  function r() {
    return new Promise(function (e, r) {
      t.init(n, e, r);
    });
  }
  var t = e("experience/componentsInitializer"), n = e("componentsToLoad");
  return { init: r };
})
