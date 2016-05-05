define("services/serviceLocator", [
  "require",
  "swx-service-locator"
], function (e) {
  var t = e("swx-service-locator").ServiceLocator, n = t.build();
  return n;
})
