(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/participant", [
      "require",
      "exports",
      "./utilities/utils"
    ], e);
}(function (e, t) {
  var n = e("./utilities/utils"), r = function () {
      function e(e) {
        this.id = e.id;
        this.displayName = e.displayName || " ";
        this.languageId = e.languageId || null;
        this.endpointDetails = e.endpointDetails || [];
        this.acceptedBy = e.acceptedBy;
      }
      return e.fromWireParticipant = function (t) {
        n.assertNotNull(t, "invalid wireParticipant");
        n.assertNotNullOrEmpty(t.id, "participant must have valid Id");
        var r = new e({
          id: t.id,
          displayName: t.displayName,
          languageId: t.languageId,
          acceptedBy: t.acceptedBy
        });
        return r;
      }, e.fromRoster = function (t) {
        n.assertNotNull(t, "invalid rosterParticipant");
        n.assertNotNullOrEmpty(t.details.id, "participant must have valid Id");
        var r = !1, i = [], s = t.endpoints;
        i = Object.keys(s).map(function (e) {
          return s[e].call && (r = !0), {
            endpointId: e,
            participantId: s[e].participantId || null,
            clientVersion: s[e].clientVersion || null,
            endpointMetadata: s[e].endpointMetadata || null,
            contentSharing: s[e].contentSharing || null,
            capabilities: s[e].capabilities || null,
            mediaStreams: s[e].call && s[e].call.mediaStreams ? s[e].call.mediaStreams : null
          };
        });
        if (!r)
          return null;
        var o = new e({
          id: t.details.id,
          displayName: t.details.displayName,
          languageId: t.details.languageId,
          endpointDetails: i || [],
          acceptedBy: t.acceptedBy || ""
        });
        return o;
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = r;
}));
