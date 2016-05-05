function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-service-locator/lib/serviceLocator", [
      "require",
      "exports",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function r(e) {
    if (!n.isString(e) || e === "")
      throw new Error("You must provide a valid name for this service");
  }
  function s() {
    return new i();
  }
  var n = e("lodash-compat"), i = function () {
      function e() {
      }
      return e.prototype.contains = function (e) {
        return r(e), e in this;
      }, e.prototype.fetchOne = function (e) {
        r(e);
        if (!this.contains(e))
          throw new Error("Service '" + e + "' not found");
        return this[e];
      }, e.prototype.resolve = function (e) {
        return this.fetchOne(e);
      }, e.prototype.register = function (e, t) {
        if (Object.isFrozen(this))
          throw new Error("Service locator is readonly when registering ' " + e + "'");
        r(e);
        if (this.contains(e))
          throw new Error("Service '" + e + "' already registered");
        this[e] = t;
      }, e.prototype.destroy = function (e) {
        if (Object.isFrozen(this))
          throw new Error("Service locator is readonly when removing ' " + e + "'");
        var t = this.resolve(e);
        if (!this.hasOwnProperty(e))
          throw new Error("Service '" + e + "' does not belong to this locator");
        return delete this[e], t;
      }, e.prototype.reset = function () {
        var e = this;
        if (Object.isFrozen(this))
          throw new Error("Service locator is readonly when clearing it");
        Object.keys(this).forEach(function (t) {
          return e.destroy(t);
        });
      }, e;
    }();
  t.ServiceLocator = i, t.build = s;
})
