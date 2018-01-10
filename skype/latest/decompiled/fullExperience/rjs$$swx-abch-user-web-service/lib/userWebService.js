(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-abch-user-web-service/lib/userWebService", [
      "require",
      "exports",
      "lodash-compat",
      "swx-xhr-dispatcher"
    ], e);
}(function (e, t) {
  function i(e, i) {
    function o(t) {
      return e().then(function (e) {
        return {
          headers: {
            Accept: r.contentTypes.JSON_V1_0,
            "X-SerializeAs": "purejson",
            "X-Skypetoken": e,
            "X-AppId": i.appId
          },
          reporting: { serviceName: t }
        };
      });
    }
    function u() {
      return o("peopleServiceGetSettings").then(function (e) {
        return s.get(t.SettingsEndpoint, e);
      });
    }
    function a(e) {
      return o("peopleServiceSetSettings").then(function (r) {
        return s.post(t.SettingsEndpoint, n.merge(r, {
          payload: JSON.stringify({
            Settings: [{
                Name: "Skype.AutoBuddy",
                Value: !!e
              }]
          })
        }));
      });
    }
    var s = r.build(i);
    return {
      getSettings: u,
      setSettings: a
    };
  }
  var n = e("lodash-compat"), r = e("swx-xhr-dispatcher");
  t.SettingsEndpoint = "people/account/settings";
  t.build = i;
}));
