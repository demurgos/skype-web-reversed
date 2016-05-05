define("jSkype/modelHelpers/contacts/dataHandlers/phoneUpdate", [
  "require",
  "exports",
  "module"
], function (e, t) {
  function n() {
    function e(e) {
      return !!(e.response && e.response.Errors && e.response.Errors.length > 0);
    }
    function t(e) {
      return e.response.Errors[0].Message;
    }
    this.onSuccess = function (n) {
      return e(n) ? Promise.reject(t(n)) : Promise.resolve();
    }, this.onError = function (e) {
      return Promise.reject(e);
    };
  }
  t.build = function () {
    return new n();
  };
})
