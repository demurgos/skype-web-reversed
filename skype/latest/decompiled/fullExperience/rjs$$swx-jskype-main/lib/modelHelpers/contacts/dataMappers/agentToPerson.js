(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataMappers/agentToPerson", [
      "require",
      "exports",
      "lodash-compat",
      "./mappers",
      "swx-mri/lib/mriMaps"
    ], e);
}(function (e, t) {
  function s(e, t) {
    return t.isAgent._set(!0), t._type._set(i.contactMriTypes.agent), t.avatarUrl._set(e.userTileStaticUrl), r.mapDisplayName(e.displayName, t), r.mapAgentAuthor(e.developer, t), r.mapAgentDescription(e.description, t), r.mapAgentWebsite(e.webpage, t), r.mapAgentPrivacyStatement(e.privacyStatement, t), r.mapAgentTermsOfService(e.tos, t), r.mapAgentExtraInfo(e.extra, t), t.agentDetails.certification._set(e.isTrusted), t.agentDetails.rating._set(e.starRating), t.agentDetails.messages_mode_all._set(n(e.disclosures).includes("all.groups.messages")), t.capabilities.chat._set(n(e.capabilities).includes("im.send")), t.capabilities.audio._set(n(e.capabilities).includes("audio.send")), t.capabilities.video._set(n(e.capabilities).includes("video.send")), t.capabilities.screenSharing._set(n(e.capabilities).includes("screen_share")), t.capabilities._gvc._set(n(e.capabilities).includes("gvc")), t.capabilities._groupChat._set(n(e.capabilities).includes("group_chat")), t.capabilities._fileSend._set(n(e.capabilities).includes("file.send")), t.capabilities._contactSend._set(n(e.capabilities).includes("contact.send")), t.capabilities._videoMessageSend._set(n(e.capabilities).includes("videomessage.send")), t.capabilities._audioMessageSend._set(n(e.capabilities).includes("audiomessage.send")), t.capabilities._mediaMessageSend._set(n(e.capabilities).includes("mediamessage.send")), t.capabilities._annotationSend._set(n(e.capabilities).includes("annotation.send")), t.capabilities._photoSend._set(n(e.capabilities).includes("photo.send")), t.capabilities._mojiSend._set(n(e.capabilities).includes("moji.send")), t.capabilities._locationSend._set(n(e.capabilities).includes("location.send")), t.capabilities._mediaAutoplay._set(n(e.capabilities).includes("external.media.receive")), t;
  }
  var n = e("lodash-compat"), r = e("./mappers"), i = e("swx-mri/lib/mriMaps");
  t.map = s;
}));
