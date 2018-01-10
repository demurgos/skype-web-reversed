(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/preferences/optionsServiceProvider", [
      "require",
      "exports",
      "lodash-compat",
      "swx-jskype-internal-application-instance",
      "jskype-settings-instance",
      "reqwest",
      "swx-browser-globals",
      "swx-client-info"
    ], e);
}(function (e, t) {
  function f(e) {
    return new a(e);
  }
  var n = e("lodash-compat"), r = e("swx-jskype-internal-application-instance"), i = e("jskype-settings-instance"), s = e("reqwest"), o = e("swx-browser-globals"), u = e("swx-client-info"), a = function () {
      function e(e) {
        this.keyName = e;
      }
      return e.prototype.read = function () {
        var e = this, t = o.getWindow(), n = Promise.all([
            r.get().signInManager._skypeToken(),
            r.get().personsAndGroupsManager.mePerson.id.get()
          ]);
        return n.then(function (n) {
          var r = n[0], o = n[1], a = {
              dataType: "json",
              url: i.settings.userOptionsService.host + i.settings.userOptionsService.optionsEndpoint,
              crossOrigin: !0,
              headers: {
                "X-Skypetoken": t.encodeURIComponent(r),
                "X-Skype-Caller": u.getBIAppName()
              }
            };
          return a.url = a.url.replace("${userId}", t.encodeURIComponent(o)).replace("${optionName}", t.encodeURIComponent(e.keyName)), Promise.resolve(s.compat(a)).then(function (e) {
            if (e.status)
              return null;
            if (e.optionInt)
              return e.optionInt;
            if (e.optionStr)
              return e.optionStr;
          }, function () {
            return null;
          });
        });
      }, e.prototype.update = function (e) {
        var t = this, a = o.getWindow(), f = Promise.all([
            r.get().signInManager._skypeToken(),
            r.get().personsAndGroupsManager.mePerson.id.get()
          ]), l = function (e) {
            return n.isString(e) || n.isObject(e) ? "stringValue=" + e : e === parseInt(e, 10) ? "integerValue=" + e : undefined;
          };
        return f.then(function (n) {
          var r = n[0], o = n[1], f = {
              dataType: "json",
              url: i.settings.userOptionsService.host + i.settings.userOptionsService.optionsEndpoint,
              crossOrigin: !0,
              method: "POST",
              headers: {
                "X-Skypetoken": a.encodeURIComponent(r),
                "X-Skype-Caller": u.getBIAppName()
              },
              data: l(e)
            };
          return f.url = f.url.replace("${userId}", a.encodeURIComponent(o)).replace("${optionName}", a.encodeURIComponent(t.keyName)), Promise.resolve(s.compat(f)).then(function (e) {
            return e.status ? Promise.reject(e) : e;
          });
        });
      }, e;
    }();
  t.OptionsServiceProvider = a;
  t.build = f;
}));
