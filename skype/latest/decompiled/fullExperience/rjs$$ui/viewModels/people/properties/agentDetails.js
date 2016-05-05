define("ui/viewModels/people/properties/agentDetails", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "utils/common/cafeObservable"
], function (e) {
  function i(e) {
    function o() {
      return s || (s = {
        certification: r.newObservableProperty(e.agentDetails.certification),
        rating: r.newObservableProperty(e.agentDetails.rating),
        author: r.newObservableProperty(e.agentDetails.author),
        description: r.newObservableProperty(e.agentDetails.description),
        website: r.newObservableProperty(e.agentDetails.website),
        privacyStatement: r.newObservableProperty(e.agentDetails.privacyStatement),
        termsOfService: r.newObservableProperty(e.agentDetails.termsOfService),
        extraInfo: r.newObservableProperty(e.agentDetails.extraInfo)
      }, s.ratingStars = n.computed(a)), s;
    }
    function u() {
      s && (t.invoke(s, "dispose"), s = undefined);
    }
    function a() {
      var e = [], t = s.rating() || 0, n = (t % 1).toFixed(1);
      for (var r = 1; r <= t; r++)
        e.push(1);
      return n >= 0.5 && n < 0.75 ? e.push(0.5) : n >= 0.75 && e.push(1), e;
    }
    var i = this, s;
    return t.isFunction(e.isAgent) ? i.isAgent = r.newObservableProperty(e.isAgent) : i.isAgent = n.observable(!1), i.compute = function () {
      return i.isAgent() ? o() : u();
    }, i.dispose = function () {
      i.isAgent.dispose && i.isAgent.dispose(), u();
    }, i;
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("utils/common/cafeObservable");
  return i.build = function (e) {
    return new i(e);
  }, i;
})
