define("services/subscriptions/subscriptionProvider", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "swx-enums",
  "swx-cafe-application-instance"
], function (e) {
  function s() {
    function u() {
      return s ? s : (s = i.get().personsAndGroupsManager.all.persons.get(), s);
    }
    function a() {
      var t = e.persons.observable, n = i.get().personsAndGroupsManager.all;
      n && l(t, n);
    }
    function f() {
      var t = e.favorites.observable, n = c(r.groupType.Favorites, "type");
      n && l(t, n);
    }
    function l(e, t) {
      function n() {
        var r = t.persons(), i = r.filter(function (e) {
            return e.displayName() ? !0 : (h(n, e), !1);
          });
        e(i);
      }
      e.extend({
        rateLimit: {
          timeout: 50,
          method: "notifyWhenChangesStop"
        }
      });
      u();
      t.persons().forEach(h.bind(null, n));
      t.persons.subscribe();
      t.persons.changed(n);
    }
    function c(e, n) {
      var r = i.get().personsAndGroupsManager.all.groups(), s = t.find(r, function (t) {
          return t[n]() === e;
        });
      return s;
    }
    function h(e, n) {
      function r() {
        t.contains(o, n) && (t.remove(o, n), e());
      }
      function i() {
        t.contains(o, n) && t.remove(o, n);
      }
      if (!!n.displayName())
        return;
      t.contains(o, n) || (o.push(n), n.displayName.get().then(r, i));
    }
    var e = {
        persons: {
          observable: n.observableArray([]),
          initialize: t.once(a)
        },
        favorites: {
          observable: n.observableArray([]),
          initialize: t.once(f)
        }
      }, s, o = [];
    this.getPersonsObservable = function () {
      return e.persons.initialize(), e.persons.observable;
    };
    this.getFavoritesObservable = function () {
      return e.favorites.initialize(), e.favorites.observable;
    };
    this.getContacts = u;
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("swx-enums"), i = e("swx-cafe-application-instance");
  return s;
});
