define("jSkype/services/webapi/instance", [
  "require",
  "jSkype/services/webapi/boundary/facade",
  "jSkype/services/webapi/boundary/dispatcher",
  "jSkype/services/webapi/calls/service",
  "jSkype/services/webapi/builders/headerSelector",
  "jSkype/services/webapi/builders/requestURIBuilder",
  "jSkype/services/webapi/builders/requestOptionsBuilder",
  "jSkype/services/webapi/actions/handlers",
  "jSkype/services/webapi/utils/lockAndKey",
  "msr-crypto"
], function (e) {
  var t = e("jSkype/services/webapi/boundary/facade"), n = e("jSkype/services/webapi/boundary/dispatcher"), r = e("jSkype/services/webapi/calls/service"), i = e("jSkype/services/webapi/builders/headerSelector"), s = e("jSkype/services/webapi/builders/requestURIBuilder"), o = e("jSkype/services/webapi/builders/requestOptionsBuilder"), u = e("jSkype/services/webapi/actions/handlers"), a = e("jSkype/services/webapi/utils/lockAndKey"), f = e("msr-crypto").sha256Auth;
  return function (l) {
    function v(e) {
      return new n(e);
    }
    var c = new f(), h = new a(c), p = new o(i), d = new r(s, p, l);
    return i.setLockAndKey(h.generate()), new t(v, u, d);
  };
});
