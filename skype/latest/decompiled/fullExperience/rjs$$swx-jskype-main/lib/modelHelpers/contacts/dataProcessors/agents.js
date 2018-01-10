(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataProcessors/agents", [
      "require",
      "exports",
      "lodash-compat",
      "swx-utils-common",
      "../../../services/agents/instance",
      "../dataMappers/agentToPerson"
    ], e);
}(function (e, t) {
  function o(e) {
    var t = n.reduce(e, u, []);
    return Promise.all(t);
  }
  function u(e, t) {
    var n = { agentId: t.id() }, o = r.settablePromise.build();
    return i.get().search(n).then(function (e) {
      var n = e.response.agentDescriptions || [];
      n[0] ? o.resolve(s.map(n[0], t)) : o.resolve(t);
    }, function () {
      o.resolve(t);
    }), e.concat(o);
  }
  var n = e("lodash-compat"), r = e("swx-utils-common"), i = e("../../../services/agents/instance"), s = e("../dataMappers/agentToPerson");
  t.process = o;
}));
