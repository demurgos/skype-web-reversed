define("jSkype/models/translatorService", [
  "require",
  "exports",
  "module",
  "jcafe-property-model",
  "jSkype/settings",
  "lodash-compat",
  "utils/common/url",
  "swx-enums",
  "jSkype/client",
  "reqwest"
], function (e, t) {
  function f() {
    function t(e) {
      function i(e) {
        t.resolve(e);
      }
      function s(e) {
        t.reject(e);
      }
      var t = n.task();
      return u.get().signInManager._skypeToken().then(function (t) {
        var n = {
          url: e,
          method: "GET",
          crossOrigin: !0,
          dataType: "json",
          headers: {
            "X-Skypetoken": t,
            "Accept-Language": r.settings.initParams.locale,
            "X-ScenarioId": r.settings.translatorClientAppId
          }
        };
        a.compat(n).then(i, s);
      }, s), t.promise;
    }
    function f(e, i, o) {
      var u = n.task(), a;
      return !i || !o ? (u.reject(), u.promise) : (a = s.buildUrl(r.settings.translatorServiceURI.TRANSLATE, {
        from: e || "",
        to: i,
        text: o
      }), t(a).then(function (e) {
        u.resolve(e);
      }, function (e) {
        u.reject(e);
      }), u.promise);
    }
    function l(t) {
      var r = t.text;
      i.forIn(r, function (t, r) {
        if (!t.name || !r)
          return;
        e.supportedLanguages.add({
          name: n.property({ value: t.name }),
          code: n.property({ value: r })
        });
      });
    }
    function c() {
      var i = n.task(), u = s.buildUrl(r.settings.translatorServiceURI.LANGUAGES, { scope: "text" });
      return t(u).then(function (t) {
        l(t), e.state._set(o.translatorServiceState.Authenticated), i.resolve(e.supportedLanguages());
      }, function (t) {
        e.state._set(o.translatorServiceState.Error), i.reject(t);
      }), i.promise;
    }
    var e = this;
    e.supportedLanguages = n.collection({ get: c }), e.translateMessage = n.command(f, n.boolProperty(!0)), e.state = n.property({
      readOnly: !0,
      value: o.translatorServiceState.NotReady
    });
  }
  var n = e("jcafe-property-model"), r = e("jSkype/settings"), i = e("lodash-compat"), s = e("utils/common/url"), o = e("swx-enums"), u = e("jSkype/client"), a = e("reqwest");
  t.build = function () {
    return new f();
  };
})
