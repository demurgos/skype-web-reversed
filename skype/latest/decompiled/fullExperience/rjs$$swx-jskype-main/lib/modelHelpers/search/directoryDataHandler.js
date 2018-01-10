(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/search/directoryDataHandler", [
      "require",
      "exports",
      "lodash-compat",
      "../personsAndGroupsHelper",
      "../contacts/dataMappers/graphResultToPerson"
    ], e);
}(function (e, t) {
  function s(e) {
    return e && e.response && e.response.results ? n.reduce(e.response.results, function (e, t) {
      return o(t, e);
    }, []) : [];
  }
  function o(e, t) {
    var n = r.getUnknownPerson(e.nodeProfileData.skypeId);
    return !e || !n ? t : (i.map(e, n), t.push(n), t);
  }
  var n = e("lodash-compat"), r = e("../personsAndGroupsHelper"), i = e("../contacts/dataMappers/graphResultToPerson");
  t.onResult = s;
}));
