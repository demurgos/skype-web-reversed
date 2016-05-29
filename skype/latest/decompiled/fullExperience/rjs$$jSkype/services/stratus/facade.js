define("jSkype/services/stratus/facade", [
  "require",
  "constants/common",
  "jSkype/settings",
  "jSkype/services/stratus/serviceSettings",
  "jSkype/services/stratus/dispatcher",
  "jSkype/services/stratus/actions",
  "jSkype/constants/common"
], function (e) {
  function u(e, u) {
    function h(e, t) {
      u.setOption("payload", e);
      u.setOption("contentType", t);
    }
    this.actions = s;
    this.updateAvatar = function (t, n, o) {
      var f, l = r.getAvatarUpdateEndPoint(t), c = a(s.UPDATE_AVATAR, t), h = new i(c);
      return u.setServiceName(s.UPDATE_AVATAR), u.setOption("payload", n), u.setOption("contentType", o), u.setOption("processData", !1), f = u.build().then(function (t) {
        return e.put(l, t);
      }), f.then(h.success, h.error), f;
    };
    this.getProfile = function () {
      var t = r.getProfileEndPoint();
      return u.setServiceName(s.GET_PROFILE), u.build().then(function (n) {
        return e.get(t, n);
      });
    };
    this.getProfiles = function (i) {
      var a;
      return u.setServiceName(s.GET_PROFILES), n.isFeatureOn(t.BATCH_PROFILES_V2) ? (a = r.getProfilesEndPointV2(), h(JSON.stringify({ usernames: i }), o.contentTypes.JSON_V1_0)) : (a = r.getProfilesEndPoint(), h(l(i.map(f)), o.contentTypes.FORM_URL_ENCODED)), u.build().then(function (t) {
        return e.post(a, t);
      });
    };
    this.getUserInfo = function () {
      var t = r.getUserInfoEndPoint();
      return u.setServiceName("getUserInfo"), u.setHeader("Accept", o.contentTypes.JSON_V2_0), u.build().then(function (n) {
        return e.get(t, n);
      });
    };
    this.searchDirectory = function (t) {
      var n = r.getDirectorySearchEndpoint(t);
      return u.setServiceName(s.SEARCH_DIRECTORY), u.build().then(function (t) {
        return e.get(n, t);
      });
    };
    this.searchDirectoryById = function (t) {
      var n = r.getDirectorySearchByIdEndpoint(t);
      return u.setServiceName(s.SEARCH_DIRECTORY_BY_ID), u.build().then(function (t) {
        return e.get(n, t);
      });
    };
    this.sendContactRequest = function (t, n) {
      var f, l = a(s.CONTACT_REQUEST_SENT, t), h = new i(l), p = c(r.getContactRequestEndpoint(), encodeURIComponent(t));
      return u.setServiceName(s.SEND_CONTACT_REQUEST), u.setOption("payload", "greeting=" + n), u.setOption("contentType", o.contentTypes.FORM_URL_ENCODED), f = u.build().then(function (t) {
        return e.put(p, t);
      }), f.then(h.success, h.error), f;
    };
    this.getIncomingContactRequests = function () {
      var t, n = new i(s.GET_PENDING_CONTACT_REQUESTS), o = r.getContactRequestEndpoint();
      return u.setServiceName(s.GET_PENDING_CONTACT_REQUESTS), t = u.build().then(function (t) {
        return e.get(o, t);
      }), t.then(n.success, n.error), t;
    };
    this.acceptContactRequest = function (t) {
      var n, f = a(s.CONTACT_REQUEST_ACCEPTED, t), l = new i(f), h = c(r.getContactRequestEndpoint(), encodeURIComponent(t), "accept");
      return u.setServiceName(s.ACCEPT_CONTACT_REQUEST), u.setOption("contentType", o.contentTypes.FORM_URL_ENCODED), n = u.build().then(function (t) {
        return e.put(h, t);
      }), n.then(l.success, l.error), n;
    };
    this.declineContactRequest = function (t) {
      var n, f = a(s.CONTACT_REQUEST_DECLINED, t), l = new i(f), h = c(r.getContactRequestEndpoint(), encodeURIComponent(t), "decline");
      return u.setServiceName(s.DECLINE_CONTACT_REQUEST), u.setOption("contentType", o.contentTypes.FORM_URL_ENCODED), n = u.build().then(function (t) {
        return e.put(h, t);
      }), n.then(l.success, l.error), n;
    };
    this.deleteContact = function (t) {
      var n, o = a(s.DELETE_CONTACT, t), f = new i(o), l = r.getDeleteContactEndpoint(t);
      return u.setServiceName(s.DELETE_CONTACT), n = u.build().then(function (t) {
        return e.remove(l, t);
      }), n.then(f.success, f.error), n;
    };
  }
  function a(e, t) {
    return e + ":" + t;
  }
  function f(e) {
    return {
      name: "contacts[]",
      value: e
    };
  }
  function l(e) {
    return e.reduce(function (e, t) {
      return e.concat(t.name + "=" + t.value);
    }, []).join("&");
  }
  function c() {
    return Array.prototype.slice.call(arguments).join("/");
  }
  var t = e("constants/common").featureFlags, n = e("jSkype/settings"), r = e("jSkype/services/stratus/serviceSettings"), i = e("jSkype/services/stratus/dispatcher"), s = e("jSkype/services/stratus/actions"), o = e("jSkype/constants/common");
  return u;
});
