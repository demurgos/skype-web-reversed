(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/contacts/facade", [
      "require",
      "exports",
      "./serviceSettings"
    ], e);
}(function (e, t) {
  var n = e("./serviceSettings"), r = function () {
      function e(e, t, n) {
        this.mePersonId = e;
        this.serviceLocator = t;
        this.optionsBuilder = n;
      }
      return e.prototype.getMyContacts = function (t, r, i) {
        var s = this;
        return this.optionsBuilder.setServiceName(n.actions.getMyContacts), r ? this.optionsBuilder.setHeader(e.IF_NONE_MATCH, r) : this.invalidateETag(), this.optionsBuilder.build().then(function (e) {
          var r = n.getMyContactsEndpoint(t, n.version, i);
          return s.serviceLocator.get(r, e);
        });
      }, e.prototype.invalidateETag = function () {
        this.optionsBuilder.setHeader(e.IF_NONE_MATCH, "/");
      }, e;
    }();
  (function (e) {
    e.IF_NONE_MATCH = "If-None-Match";
  }(r || (r = {})));
  t.__esModule = !0;
  t["default"] = r;
}));
