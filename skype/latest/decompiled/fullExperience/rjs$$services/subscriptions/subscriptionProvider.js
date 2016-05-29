define("services/subscriptions/subscriptionProvider", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "cafe/applicationInstance"
], function (e) {
  function i() {
    function i() {
      function n() {
        e.persons.observable(t.persons());
      }
      var t = r.get().personsAndGroupsManager.all;
      e.persons.observable.extend({
        rateLimit: {
          timeout: 50,
          method: "notifyWhenChangesStop"
        }
      });
      t.persons.subscribe();
      t.persons.changed(n);
    }
    var e = {
      persons: {
        observable: n.observableArray(),
        initialize: t.once(i)
      }
    };
    this.getPersonsObservable = function () {
      return e.persons.initialize(), e.persons.observable;
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("cafe/applicationInstance");
  return i;
});
