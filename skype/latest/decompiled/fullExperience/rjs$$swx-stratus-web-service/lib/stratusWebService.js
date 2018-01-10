(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-stratus-web-service/lib/stratusWebService", [
      "require",
      "exports",
      "lodash-compat",
      "swx-utils-common",
      "swx-xhr-dispatcher"
    ], e);
}(function (e, t) {
  function s(e, t) {
    function o(n) {
      return e().then(function (e) {
        return {
          headers: {
            Accept: i.contentTypes.JSON_V1_0,
            "X-Skypetoken": e,
            "X-Stratus-Caller": t.appName,
            "X-Stratus-Request": r.guid.create().substring(0, 8)
          },
          reporting: { serviceName: n }
        };
      });
    }
    function u(e, t, r) {
      return o("updateAvatar").then(function (i) {
        var o = "users/" + encodeURIComponent(e) + "/profile/avatar";
        return s.put(o, n.merge(i, {
          contentType: r,
          payload: t,
          processData: !1
        }));
      });
    }
    function a() {
      return o("getProfile").then(function (e) {
        return s.get("users/self/profile", e);
      });
    }
    function f(e) {
      return o("getProfiles").then(function (t) {
        var r, o;
        return r = "users/batch/profiles", o = {
          contentType: i.contentTypes.JSON_V1_0,
          payload: JSON.stringify({ usernames: e })
        }, s.post(r, n.merge(t, o));
      });
    }
    function l() {
      return o("getUserInfo").then(function (e) {
        return s.get("users/self", n.merge(e, { headers: { Accept: i.contentTypes.JSON_V2_0 } }));
      });
    }
    function c(e) {
      return o("searchDirectory").then(function (n) {
        var r = "search/users/any?keyWord=" + encodeURIComponent(e);
        return t.useSkypeOnlySearch === !0 && (r += "&contactTypes[]=skype"), s.get(r, n);
      });
    }
    function h(e) {
      return o("searchDirectoryById").then(function (t) {
        var n = "search/users?skypename=" + encodeURIComponent(e);
        return s.get(n, t);
      });
    }
    function p(e, t) {
      return o("sendContactRequest").then(function (r) {
        var o = "users/self/contacts/auth-request/" + encodeURIComponent(e);
        return s.put(o, n.merge(r, {
          contentType: i.contentTypes.FORM_URL_ENCODED,
          payload: "greeting=" + t
        }));
      });
    }
    function d() {
      return o("getIncomingContactRequests").then(function (e) {
        var t = "users/self/contacts/auth-request";
        return s.get(t, e);
      });
    }
    function v(e) {
      return o("acceptContactRequest").then(function (t) {
        var r = "users/self/contacts/auth-request/" + encodeURIComponent(e) + "/accept";
        return s.put(r, n.merge(t, { contentType: i.contentTypes.FORM_URL_ENCODED }));
      });
    }
    function m(e) {
      return o("declineContactRequest").then(function (t) {
        var r = "users/self/contacts/auth-request/" + encodeURIComponent(e) + "/decline";
        return s.put(r, n.merge(t, { contentType: i.contentTypes.FORM_URL_ENCODED }));
      });
    }
    function g(e) {
      return o("deleteContact").then(function (t) {
        var r = "users/self/contacts/" + encodeURIComponent(e);
        return s.remove(r, n.merge(t, { headers: { Accept: i.contentTypes.JSON_V1_0 } }));
      });
    }
    function y(e, t) {
      return o("setMoodMessage").then(function (r) {
        var o, u;
        return o = "users/" + encodeURIComponent(e) + "/profile/partial", u = {
          contentType: i.contentTypes.JSON_V1_0,
          payload: JSON.stringify({ payload: { mood: t } })
        }, s.post(o, n.merge(r, u));
      });
    }
    var s = i.build(t);
    return {
      updateAvatar: u,
      getProfile: a,
      getProfiles: f,
      getUserInfo: l,
      searchDirectory: c,
      searchDirectoryById: h,
      sendContactRequest: p,
      getIncomingContactRequests: d,
      acceptContactRequest: v,
      declineContactRequest: m,
      deleteContact: g,
      setMoodMessage: y
    };
  }
  var n = e("lodash-compat"), r = e("swx-utils-common"), i = e("swx-xhr-dispatcher");
  t.build = s;
}));
