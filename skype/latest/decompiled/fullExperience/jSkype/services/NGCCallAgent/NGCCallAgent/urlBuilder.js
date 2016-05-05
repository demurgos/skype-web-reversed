define("jSkype/services/NGCCallAgent/NGCCallAgent/urlBuilder", [
  "require",
  "jSkype/services/NGCCallAgent/NGCCallAgent/utils",
  "jSkype/services/NGCCallAgent/NGCCallAgent/constants"
], function (e) {
  var t = e("jSkype/services/NGCCallAgent/NGCCallAgent/utils"), n = e("jSkype/services/NGCCallAgent/NGCCallAgent/constants"), r = {};
  return r.get = function (e, r) {
    t.assertNotNullOrEmpty(r, "trailingPath cannot be null"), t.assertNotNull(e, "signalingSession cannot be null");
    var i = e.signalingAgentConfig.trouterUrl();
    return t.assertNotNullOrEmpty(i, "trouterUrl cannot be null"), i + n.URL_BASE.CALLAGENT + "/" + e.urlIdentifier + r;
  }, r;
})
