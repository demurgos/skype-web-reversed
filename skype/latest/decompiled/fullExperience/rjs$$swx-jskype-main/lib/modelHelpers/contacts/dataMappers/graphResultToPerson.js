(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataMappers/graphResultToPerson", [
      "require",
      "exports",
      "../../../modelHelpers/contacts/dataMappers/mappers",
      "jskype-settings-instance",
      "swx-constants",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function o(e, t) {
    var o = e.nodeProfileData, u = e.nodeAnnotation;
    n.mapDisplayName(s.result(o, "name"), t);
    n.mapCity(s.result(o, "city"), t);
    n.mapState(s.result(o, "state"), t);
    n.mapCountry(s.result(o, "countryCode"), t);
    r.isFeatureOn(i.COMMON.featureFlags.USE_GRAPH_SEARCH_ANNOTATIONS) && n.mapActivity(u, t);
  }
  var n = e("../../../modelHelpers/contacts/dataMappers/mappers"), r = e("jskype-settings-instance"), i = e("swx-constants"), s = e("lodash-compat");
  t.map = o;
}));
