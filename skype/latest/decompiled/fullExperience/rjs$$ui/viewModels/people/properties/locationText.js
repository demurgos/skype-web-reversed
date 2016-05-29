define("ui/viewModels/people/properties/locationText", [
  "require",
  "swx-utils-common",
  "utils/common/cafeObservable"
], function (e) {
  function r(e) {
    var t = this;
    return t.location = {
      city: n.newObservableProperty(e.location.city),
      country: n.newObservableProperty(e.location.country)
    }, t.compute = function () {
      return r.format({
        city: t.location.city(),
        country: t.location.country()
      });
    }, t.dispose = function () {
      t.location.city.dispose();
      t.location.country.dispose();
    }, t;
  }
  var t = e("swx-utils-common").stringUtils, n = e("utils/common/cafeObservable");
  return r.build = function (e) {
    return new r(e);
  }, r.format = function (e) {
    if (e && t.isNotEmpty(e.city) && t.isNotEmpty(e.country))
      return e.city + ", " + e.country;
  }, r;
});
