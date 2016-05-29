define("jSkype/services/preferences/flagsServiceProvider", [
  "require",
  "lodash-compat",
  "swx-flags-service-api",
  "jSkype/client",
  "jSkype/settings",
  "utils/common/builderMixin"
], function (e) {
  function u() {
    o = n.build(i.settings.flagsApiUrl);
  }
  function a(e) {
    this.flagId = e;
    o || u();
  }
  var t = e("lodash-compat"), n = e("swx-flags-service-api"), r = e("jSkype/client"), i = e("jSkype/settings"), s = e("utils/common/builderMixin"), o;
  return a.prototype.read = function () {
    var t = this, n = Promise.resolve(r.get().signInManager._skypeToken());
    return n.then(function (e) {
      return o.read(t.flagId, e);
    });
  }, a.prototype.update = function (t) {
    var n = this, i = r.get().signInManager._skypeToken();
    return i.then(function (e) {
      return o.update(n.flagId, t, e);
    });
  }, t.assign(a, s), a._resetGlobalState = u, a;
});
