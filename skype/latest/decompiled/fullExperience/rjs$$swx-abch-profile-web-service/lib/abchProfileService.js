(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-abch-profile-web-service/lib/abchProfileService", [
      "require",
      "exports",
      "lodash-compat",
      "swx-xhr-dispatcher"
    ], e);
}(function (e, t) {
  function i(e, t) {
    function u(n) {
      return e().then(function (e) {
        return {
          headers: {
            Accept: r.contentTypes.JSON_V1_0,
            "X-Skypetoken": e,
            "PS-ApplicationId": t.appId
          },
          reporting: { serviceName: n }
        };
      });
    }
    function a(e, t) {
      var n = {
        Attributes: [{
            Name: "PersonalContactProfile.Phones",
            Add: null,
            Edit: null,
            Delete: null
          }]
      };
      return n.Attributes[0][e] = [t], JSON.stringify(n);
    }
    function f() {
      return u("profileServiceGetProfile").then(function (e) {
        return i.get(s, e);
      });
    }
    function l(e) {
      return u("profileServiceUpdatePhoneNumber").then(function (t) {
        return i.post(s, n.merge(t, {
          payload: a("Edit", {
            Name: e.number,
            Searchable: e.isSearchable,
            Country: e.cc
          }),
          headers: o
        }));
      });
    }
    function c(e) {
      return u("profileServiceDeletePhoneNumber").then(function (t) {
        return i.post(s, n.merge(t, {
          payload: a("Delete", {
            Name: e.number,
            Country: e.cc
          }),
          headers: o
        }));
      });
    }
    var i = r.build(t), s = "profile/mine/System.ShortCircuitProfile.json", o = { "Content-Type": "application" };
    return {
      getProfile: f,
      updatePhoneNumber: l,
      deletePhoneNumber: c
    };
  }
  var n = e("lodash-compat"), r = e("swx-xhr-dispatcher");
  t.build = i;
}));
