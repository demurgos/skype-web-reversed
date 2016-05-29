define("jSkype/services/contacts/optionsBuilder", [
  "require",
  "lodash-compat",
  "jSkype/services/stratus/optionsBuilder",
  "jSkype/services/contacts/serviceSettings",
  "jSkype/services/clientInfo"
], function (e) {
  function s() {
    n.call(this);
    t.merge(this._defaultOptions.retry, r.getRetryPolicy());
    t.merge(this._defaultOptions.headers, { "X-Skype-Caller": i.getBIAppName() });
    this._defaultOptions.headers["X-Stratus-Caller"] = undefined;
  }
  var t = e("lodash-compat"), n = e("jSkype/services/stratus/optionsBuilder"), r = e("jSkype/services/contacts/serviceSettings"), i = e("jSkype/services/clientInfo");
  return t.assign(s.prototype, n.prototype, { constructor: s }), s;
});
