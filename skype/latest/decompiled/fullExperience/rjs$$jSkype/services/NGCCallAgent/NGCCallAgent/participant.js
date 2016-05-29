define("jSkype/services/NGCCallAgent/NGCCallAgent/participant", [
  "require",
  "jSkype/services/NGCCallAgent/NGCCallAgent/utils"
], function (e) {
  function n(e) {
    this.id = e.id;
    this.displayName = e.displayName || " ";
    this.endpointId = e.endpointId || null;
    this.languageId = e.languageId || null;
    this.mediaStreams = e.mediaStreams || [];
    this.capabilities = e.capabilities || {};
  }
  var t = e("jSkype/services/NGCCallAgent/NGCCallAgent/utils");
  return n.fromWireParticipant = function (e) {
    t.assertNotNull(e, "invalid wireParticipant");
    t.assertNotNullOrEmpty(e.id, "participant must have valid Id");
    var r = new n({
      id: e.id,
      displayName: e.displayName,
      endpointId: e.endpointId,
      languageId: e.languageId
    });
    return r;
  }, n.fromRoster = function (e) {
    t.assertNotNull(e, "invalid rosterParticipant");
    t.assertNotNullOrEmpty(e.details.id, "participant must have valid Id");
    var r = new n({
      id: e.details.id,
      displayName: e.details.displayName,
      endpointId: e.details.endpointId,
      languageId: e.details.languageId,
      mediaStreams: e.call.mediaStreams || [],
      capabilities: e.capabilities || []
    });
    return r;
  }, n;
});
