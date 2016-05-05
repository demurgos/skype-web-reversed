define("jSkype/services/serviceAccessLayer/serviceQosReporterFacade", [
  "require",
  "exports",
  "module",
  "jSkype/services/serviceAccessLayer/serviceQosReporter"
], function (e, t) {
  var n = e("jSkype/services/serviceAccessLayer/serviceQosReporter"), r = null;
  t.getInstance = function () {
    return r || (r = n.build()), r;
  };
})
