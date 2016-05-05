define("jSkype/services/preferences/optionsServiceProvider", [
  "require",
  "lodash-compat",
  "jSkype/client",
  "jSkype/settings",
  "reqwest",
  "browser/window",
  "utils/common/builderMixin"
], function (e) {
  function u(e) {
    this.keyName = e;
  }
  var t = e("lodash-compat"), n = e("jSkype/client"), r = e("jSkype/settings"), i = e("reqwest"), s = e("browser/window"), o = e("utils/common/builderMixin");
  return u.prototype.read = function () {
    var t = this, o = Promise.all([
        n.get().signInManager._skypeToken(),
        n.get().personsAndGroupsManager.mePerson.id.get()
      ]);
    return o.then(function (e) {
      var n = e[0], o = e[1], u = {
          dataType: "json",
          url: r.settings.userOptionsService.host + r.settings.userOptionsService.optionsEndpoint,
          crossOrigin: !0,
          headers: { "X-Skypetoken": s.encodeURIComponent(n) }
        };
      return u.url = u.url.replace("${userId}", s.encodeURIComponent(o)).replace("${optionName}", s.encodeURIComponent(t.keyName)), Promise.resolve(i.compat(u)).then(function (e) {
        return e.status ? null : e.optionInt;
      }, function () {
        return null;
      });
    });
  }, u.prototype.update = function (t) {
    var o = this, u = Promise.all([
        n.get().signInManager._skypeToken(),
        n.get().personsAndGroupsManager.mePerson.id.get()
      ]);
    return u.then(function (e) {
      var n = e[0], u = e[1], a = {
          dataType: "json",
          url: r.settings.userOptionsService.host + r.settings.userOptionsService.optionsEndpoint,
          crossOrigin: !0,
          method: "POST",
          headers: { "X-Skypetoken": s.encodeURIComponent(n) },
          data: "integerValue=" + t
        };
      return a.url = a.url.replace("${userId}", s.encodeURIComponent(u)).replace("${optionName}", s.encodeURIComponent(o.keyName)), Promise.resolve(i.compat(a)).then(function (e) {
        return e.status ? Promise.reject(e) : e;
      });
    });
  }, t.assign(u, o), u;
})
