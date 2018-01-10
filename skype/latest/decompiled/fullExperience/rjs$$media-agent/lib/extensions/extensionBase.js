(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/extensions/extensionBase", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  var n = function () {
    function e(e) {
      this.manager = null;
      this.extensionType = e;
    }
    return e.prototype.initialize = function (e) {
      e.manager && (this.manager = e.manager);
      e.logger && (this.logger = e.logger.createChild(this.extensionType), this.logger.log("initialized"));
    }, e.prototype.dispose = function () {
      this.manager && (this.manager = null);
      this.logger && (this.logger.log("disposed"), this.logger = null);
    }, e.prototype.configure = function (e) {
    }, e.prototype.getType = function () {
      return this.extensionType;
    }, e;
  }();
  t.ExtensionBase = n;
}));
