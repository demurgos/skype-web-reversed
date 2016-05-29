define("experience/featureFlags/api", [], function () {
  function e(e) {
    var t = e.featureFlags ? e.featureFlags : {};
    this.isFeatureOn = function (n) {
      return Boolean(t[n]);
    };
  }
  return e;
});
