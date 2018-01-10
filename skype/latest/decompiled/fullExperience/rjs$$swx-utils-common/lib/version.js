(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-common/lib/version", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  var n = function () {
    function e(e) {
      this.unknownVersionString = "U";
      this.isVersionValid = !0;
      this.versionString = e;
      this.parseComponents();
    }
    return e.prototype.getMajor = function () {
      return this.components[0];
    }, e.prototype.getMinor = function () {
      return this.components[1];
    }, e.prototype.getAllComponents = function () {
      return this.components;
    }, e.prototype.getOriginalString = function () {
      return this.versionString;
    }, e.prototype.isValid = function () {
      return this.isVersionValid;
    }, e.prototype.compareTo = function (e) {
      var t = 0, n = 0, r = e.getAllComponents();
      if (!this.isValid() || !e.isValid())
        throw new Error("Invalid version cannot be compared");
      for (var i = 0; i < r.length; ++i) {
        t = parseInt(this.components[i], 10);
        n = parseInt(r[i], 10);
        if (isNaN(t) || t < n)
          return -1;
        if (t > n)
          return 1;
      }
      return 0;
    }, e.prototype.parseComponents = function () {
      if (!this.versionString) {
        this.components = [
          this.unknownVersionString,
          this.unknownVersionString
        ];
        this.isVersionValid = !1;
        return;
      }
      var e = this.getDelimiter();
      e ? (this.components = this.versionString.split(e), this.validateComponents()) : (this.components = [
        this.versionString,
        this.unknownVersionString
      ], this.isVersionValid = !1);
    }, e.prototype.validateComponents = function () {
      for (var e = 0; e < this.components.length; ++e)
        if (!this.components[e] || isNaN(parseInt(this.components[e], 10))) {
          this.components.push(this.unknownVersionString);
          this.isVersionValid = !1;
          break;
        }
    }, e.prototype.getDelimiter = function () {
      return this.versionString.indexOf(".") > -1 ? "." : this.versionString.indexOf("_") > -1 ? "_" : null;
    }, e;
  }();
  t.Version = n;
  var r = function (e) {
    return new n(e);
  };
  t.__esModule = !0;
  t["default"] = { parse: r };
  t.parse = r;
}));
