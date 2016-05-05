define("jSkype/modelHelpers/contacts/dataHandlers/contactRequestsIncoming", [
  "require",
  "exports",
  "module",
  "jSkype/modelHelpers/contacts/dataProcessors/contactRequests"
], function (e, t) {
  function r(e) {
    this.onSuccess = function (t) {
      t.response && e.process(t.response);
    }, this.onError = function (e) {
    };
  }
  var n = e("jSkype/modelHelpers/contacts/dataProcessors/contactRequests");
  t.build = function () {
    var e = n.build();
    return new r(e);
  };
})
