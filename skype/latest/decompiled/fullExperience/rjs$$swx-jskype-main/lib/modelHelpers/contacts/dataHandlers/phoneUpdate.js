(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataHandlers/phoneUpdate", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function r() {
    return new n();
  }
  var n = function () {
    function e() {
      var e = this;
      this.onSuccess = function (t) {
        return e.hasErrors(t) ? Promise.reject(e.getErrorMessage(t)) : Promise.resolve();
      };
      this.onError = function (e) {
        return Promise.reject(e);
      };
    }
    return e.prototype.hasErrors = function (e) {
      return !!(e.response && e.response.Errors && e.response.Errors.length > 0);
    }, e.prototype.getErrorMessage = function (e) {
      return e.response.Errors[0].Message;
    }, e;
  }();
  t.build = r;
}));
