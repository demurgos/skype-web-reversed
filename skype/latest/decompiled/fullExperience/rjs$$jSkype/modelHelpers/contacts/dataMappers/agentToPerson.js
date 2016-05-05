define("jSkype/modelHelpers/contacts/dataMappers/agentToPerson", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "jSkype/modelHelpers/contacts/dataMappers/mappers",
  "jSkype/modelHelpers/contacts/dataMappers/dataMaps"
], function (e, t) {
  var n = e("lodash-compat"), r = e("jSkype/modelHelpers/contacts/dataMappers/mappers"), i = e("jSkype/modelHelpers/contacts/dataMappers/dataMaps");
  t.map = function (e, t) {
    return t.isAgent._set(!0), t._type._set(i.contactTypes[i.contactTypeNames.agent]), t.avatarUrl._set(e.userTileStaticUrl), r.mapDisplayName(e.displayName, t), r.mapAgentAuthor(e.developer, t), r.mapAgentDescription(e.description, t), r.mapAgentWebsite(e.webpage, t), r.mapAgentPrivacyStatement(e.privacyStatement, t), r.mapAgentTermsOfService(e.tos, t), r.mapAgentExtraInfo(e.extra, t), t.agentDetails.certification._set(e.isTrusted), t.agentDetails.rating._set(e.starRating), n(e.capabilities).includes("group_chat") && t.capabilities._groupChat._set(!0), t;
  };
})
