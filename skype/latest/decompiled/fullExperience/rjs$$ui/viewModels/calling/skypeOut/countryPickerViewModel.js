define("ui/viewModels/calling/skypeOut/countryPickerViewModel", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "constants/common",
  "utils/common/eventMixin",
  "vendor/knockout",
  "swx-i18n",
  "utils/common/localStorage",
  "services/serviceLocator",
  "experience/settings",
  "swx-utils-common",
  "browser/window"
], function (e, t) {
  function h(e) {
    function y(e) {
      return !s.isObservable(e);
    }
    function b(e) {
      var n = w(e.substring(0, d));
      n !== i && (i = n, t.selectedCountry(i));
    }
    function w(e) {
      return e.length === 0 ? null : e in t.countriesMap ? t.countriesMap[e] : w(e.substring(0, e.length - 1));
    }
    function E(e) {
      var t;
      e ? t = e.value : t = "";
      e !== i && (i ? h(h().replace(i.value, t)) : t !== "" && h(t + " " + h()));
      i = e;
    }
    function S(e) {
      var n;
      t.selectedCountry(null);
      for (n = 0; n < e.length; n++)
        if (e[n].name === m.name && e[n].value === m.value && e[n].description === m.description) {
          t.selectedCountry(e[n]);
          m = e[n];
          return;
        }
    }
    function x(e) {
      function a() {
        return r.length > 0 && r[r.length - 1].value === s;
      }
      var n = JSON.parse(e).destinations, r = [], i, s, o, u;
      for (u = 0; u < n.length; u++) {
        i = n[u];
        s = "+" + i.countryPrefix;
        if (!i.countryPrefix || a(r, s))
          continue;
        o = {
          value: s,
          name: i.name,
          description: l.forceLTREmbedding(s)
        };
        t.countriesMap[s] = o;
        r.push(o);
      }
      r.sort(function (e, t) {
        return e.name.localeCompare(t.name, f.initParams.locale);
      });
      t.countries(r);
      m && S(r);
    }
    function T() {
      var e = new XMLHttpRequest(), t = "?language=" + f.initParams.locale + "&currency=USD&expand=country-prefix&host=" + c.location.hostname + "&client=" + f.version;
      e.addEventListener("readystatechange", function () {
        this.readyState === 4 && (this.status === 200 ? x(this.responseText) : p || (p = !0, T()));
      });
      e.open("GET", f.assetsServiceHost + t);
      e.send();
    }
    function N() {
      m ? (t.countries().push(m), t.selectedCountry(m)) : t.countries().push(g);
    }
    function C() {
      m && h() === "" && t.selectedCountry(m);
    }
    var t = this, n, i, h, p = !1, d = 6, v = a.resolve(r.serviceLocator.PUBSUB), m, g = {
        value: "",
        name: o.fetch({ key: "splashScreen_text_loading" }),
        description: ""
      };
    if (y(e.skypeOutInput) || y(e.selectedCountry))
      throw new Error("[CountryPicker] Passing incorrect parameter, expecting ko.obervables.");
    t.countriesMap = {};
    t.countries = s.observableArray();
    t.selectedCountry = e.selectedCountry;
    h = e.skypeOutInput;
    t.init = function () {
      m = JSON.parse(u.get(r.storageKeys.RECENT_COUNTRY));
      T();
      t.registerEvent(r.events.skypeOut.INPUT_CHANGED, b);
      t.forwardEvent(r.events.selectBox.TOGGLE, t.DIRECTION.CHILD);
      n = t.selectedCountry.subscribe(E);
      N();
      v.subscribe(r.events.navigation.FRAGMENT_LOADED, C);
    };
    t.dispose = function () {
      n.dispose();
      v.unsubscribe(r.events.navigation.FRAGMENT_LOADED, C);
    };
  }
  var n = e("lodash-compat"), r = e("constants/common"), i = e("utils/common/eventMixin"), s = e("vendor/knockout"), o = e("swx-i18n").localization, u = e("utils/common/localStorage"), a = e("services/serviceLocator"), f = e("experience/settings"), l = e("swx-utils-common").stringUtils, c = e("browser/window");
  n.assign(h.prototype, i);
  t.build = function (e) {
    return new h(e);
  };
});
