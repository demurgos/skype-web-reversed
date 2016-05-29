define("services/flagsApi/flagsProvider", [
  "require",
  "exports",
  "module",
  "services/flagsApi/flagsApiService",
  "services/flagsApi/flagsApiServiceBusiness"
], function (e, t) {
  function s(e) {
    function o(t) {
      return e ? i.indexOf(t) > -1 || i[0] === -1 : i.indexOf(t) > -1;
    }
    var t, i = [], s = null;
    e ? t = r.build() : t = n.build();
    this.fetchFlags = function () {
      function n(e, n) {
        function r(t) {
          i = t;
          e();
        }
        t.getAll().then(r, n);
      }
      return s || (s = new Promise(n)), s;
    };
    this.get = function (t) {
      return o(t);
    };
    this.set = function (n) {
      return i.push(n), t.set(n);
    };
  }
  var n = e("services/flagsApi/flagsApiService"), r = e("services/flagsApi/flagsApiServiceBusiness"), i;
  t.getInstance = function (e) {
    return i || (i = new s(e)), i;
  };
  t.destroy = function () {
    i = null;
  };
});
