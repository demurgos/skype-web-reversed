(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/translatorService", [
      "require",
      "exports",
      "jcafe-property-model",
      "jskype-settings-instance",
      "lodash-compat",
      "swx-utils-common",
      "swx-enums",
      "swx-jskype-internal-application-instance",
      "reqwest"
    ], e);
}(function (e, t) {
  function l() {
    return new f();
  }
  var n = e("jcafe-property-model"), r = e("jskype-settings-instance"), i = e("lodash-compat"), s = e("swx-utils-common"), o = e("swx-enums"), u = e("swx-jskype-internal-application-instance"), a = e("reqwest"), f = function () {
      function e() {
        this.supportedLanguages = n.collection({ get: this.getLanguagesCommand.bind(this) });
        this.translateMessage = n.command(this.translateMessageCommand.bind(this), n.boolProperty(!0));
        this.state = n.property({
          readOnly: !0,
          value: o.translatorServiceState.NotReady
        });
      }
      return e.prototype.requestServiceWithSkypeToken = function (e) {
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
      }, e.prototype.translateMessageCommand = function (e, t, i) {
        var o = n.task();
        if (!t || !i)
          return o.reject(), o.promise;
        var u = s.url.buildUrl(r.settings.translatorServiceURI.TRANSLATE, {
          from: e || "",
          to: t,
          text: i
        });
        return this.requestServiceWithSkypeToken(u).then(function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }), o.promise;
      }, e.prototype.processSupportedLanguages = function (e) {
        var t = this, r = e.text;
        i.forIn(r, function (e, r) {
          if (!e.name || !r)
            return;
          t.supportedLanguages.add({
            name: n.property({ value: e.name }),
            code: n.property({ value: r })
          });
        });
      }, e.prototype.getLanguagesCommand = function () {
        var e = this, t = n.task(), i = s.url.buildUrl(r.settings.translatorServiceURI.LANGUAGES, { scope: "text" });
        return this.requestServiceWithSkypeToken(i).then(function (n) {
          e.processSupportedLanguages(n);
          e.state._set(o.translatorServiceState.Authenticated);
          t.resolve(e.supportedLanguages());
        }, function (n) {
          e.state._set(o.translatorServiceState.Error);
          t.reject(n);
        }), t.promise;
      }, e;
    }();
  t.TranslatorService = f;
  t.build = l;
}));
