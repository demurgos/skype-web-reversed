define("jSkype/services/serviceAccessLayer/serviceLocator", [
  "require",
  "jSkype/services/serviceAccessLayer/requestDispatcher",
  "jSkype/services/serviceAccessLayer/builders/factory"
], function (e) {
  function r(e) {
    typeof e != "string" && s("serviceUri", "string"), this.uriBuilder = n.get("uriBuilder"), this.uriBuilder.setDomain(e);
  }
  function i(e, t) {
    var n = {}.toString.call(t) === "[object Object]";
    typeof e != "string" && s("resource", "string"), n || s("options", "object");
  }
  function s(e, t) {
    throw new TypeError("expected typeof \"" + e + "\" to be: " + t);
  }
  var t = e("jSkype/services/serviceAccessLayer/requestDispatcher"), n = e("jSkype/services/serviceAccessLayer/builders/factory");
  return r.prototype.get = function (e, t) {
    return this.request("get", e, t);
  }, r.prototype.post = function (e, t) {
    return this.request("post", e, t);
  }, r.prototype.put = function (e, t) {
    return this.request("put", e, t);
  }, r.prototype.remove = function (e, t) {
    return this.request("remove", e, t);
  }, r.prototype.request = function (e, n, r) {
    return i(n, r), this.uriBuilder.setResource(n), this.uriBuilder.setQueryParams(r.params), t[e](this.uriBuilder.build(), r);
  }, {
    build: function (e) {
      return new r(e);
    }
  };
})
