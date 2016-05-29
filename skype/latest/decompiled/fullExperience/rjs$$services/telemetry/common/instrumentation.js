define("services/telemetry/common/instrumentation", [
  "require",
  "lodash-compat",
  "cafe/applicationInstance",
  "swx-enums"
], function (e) {
  function i(e) {
    var t = {};
    return Object.keys(e).forEach(function (n) {
      e[n].forEach(function (e) {
        t[e.eventName] = s(e.telemetryName, n, e.extensions, e.newContextIds);
      });
    }), t;
  }
  function s(e, t, n, r) {
    return function (i) {
      var s = {
        type: t,
        data: { name: e },
        contextIds: {},
        isPluginInstalled: u(),
        mePersonId: a()
      };
      return i = i || {}, o(i, n, s.data), o(i, r, s.contextIds), s;
    };
  }
  function o(e, n, r) {
    function i(t) {
      e[t] !== null && e[t] !== undefined && (r[t] = e[t]);
    }
    if (!n)
      return;
    if (typeof n == "function")
      return t.merge(r, n(e));
    n.forEach(i);
  }
  function u() {
    return n.get().personsAndGroupsManager && n.get().personsAndGroupsManager.mePerson ? n.get().personsAndGroupsManager.mePerson.capabilities.audio.reason !== r.callingNotSupportedReasons.PluginNotInstalled : "unknown";
  }
  function a() {
    return n.get().personsAndGroupsManager && n.get().personsAndGroupsManager.mePerson ? n.get().personsAndGroupsManager.mePerson.id() : "unknown";
  }
  var t = e("lodash-compat"), n = e("cafe/applicationInstance"), r = e("swx-enums");
  return {
    create: function (e) {
      return i(e);
    }
  };
});
