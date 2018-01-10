(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-contacts-web-service/lib/contactsWebService", [
      "require",
      "exports",
      "lodash-compat",
      "swx-utils-common",
      "swx-xhr-dispatcher",
      "./utils/contactsInfo"
    ], e);
}(function (e, t) {
  function u(e, u) {
    function l(t) {
      return e().then(function (e) {
        return {
          headers: {
            Accept: i.contentTypes.JSON_V1_0,
            "X-Skypetoken": e,
            "X-Skype-Caller": u.appName,
            "X-Skype-Request-Id": r.guid.create().substring(0, 8)
          },
          reporting: { serviceName: t }
        };
      });
    }
    function c(e, n, r) {
      return n === void 0 && (n = "/"), r === void 0 && (r = t.reasons.DEFAULT), n = n || "/", r = r || t.reasons.DEFAULT, l("getRawView").then(function (i) {
        var s = "contacts/v2/users/" + encodeURIComponent(e) + "?delta&reason=" + encodeURIComponent(r);
        return i.headers[t.headers.IF_NONE_MATCH] = n, a.get(s, i);
      });
    }
    function h(e, n, r) {
      n === void 0 && (n = "/");
      r === void 0 && (r = t.reasons.DEFAULT);
      n = n || "/";
      r = r || t.reasons.DEFAULT;
      var i = new s.ContactsInfo();
      return new Promise(function (s, o) {
        l("getRawView").then(function (u) {
          var l = function (e) {
              e || o({ status: "" });
              i.update(e);
              if (e.request) {
                var n = e.request.getResponseHeader(t.headers.CONTINUATION);
                if (!n) {
                  e.response = e.response || {};
                  e.response.contacts = i.contacts.getItems();
                  e.response.groups = i.groups.getItems();
                  e.response.blocklist = i.blocklist.getItems();
                  e.response.scope = i.firstScope;
                  e.duration = i.duration;
                  s(e);
                  return;
                }
                u.headers[t.headers.CONTINUATION] = n;
              }
              return a.get(c, u).then(l.bind(null), o);
            }, c = "contacts/v2/users/" + encodeURIComponent(e) + "?page_size=" + f + "&reason=" + encodeURIComponent(r);
          u.headers[t.headers.IF_NONE_MATCH] = n;
          l({});
        });
      });
    }
    function p(e, n) {
      return n === void 0 && (n = t.reasons.DEFAULT), n = n || t.reasons.DEFAULT, l("getMyContacts").then(function (t) {
        var r = "contacts/v2/users/" + encodeURIComponent(e) + "/contacts?reason=" + encodeURIComponent(n);
        return a.get(r, t);
      });
    }
    function d(e, n, r) {
      return n === void 0 && (n = "/"), r === void 0 && (r = t.reasons.DEFAULT), n = n || "/", r = r || t.reasons.DEFAULT, l("getMyContacts").then(function (i) {
        var s = "contacts/v2/users/" + encodeURIComponent(e) + "/contacts?delta&reason=" + encodeURIComponent(r);
        return i.headers[t.headers.IF_NONE_MATCH] = n, a.get(s, i);
      });
    }
    function v(e, t, r) {
      return l("addContact").then(function (s) {
        var o = "contacts/v2/users/" + encodeURIComponent(e) + "/contacts", u = n.merge(s, {
            contentType: i.contentTypes.JSON,
            payload: JSON.stringify({
              mri: t,
              greeting: r
            })
          });
        return a.post(o, u);
      });
    }
    function m(e, t, r) {
      return l("addContact").then(function (s) {
        var o = "contacts/v2/users/" + encodeURIComponent(e) + "/contacts", u = n.merge(s, {
            contentType: i.contentTypes.JSON,
            payload: JSON.stringify({
              mri: t,
              phones: [{
                  type: "other",
                  number: r
                }],
              send_invite: !1
            })
          });
        return a.post(o, u);
      });
    }
    function g(e, t) {
      return l("deleteContact").then(function (n) {
        var r = "contacts/v2/users/" + encodeURIComponent(e) + "/contacts/" + encodeURIComponent(t);
        return a.remove(r, n);
      });
    }
    function y(e, t, r, s) {
      return r === void 0 && (r = !1), l("blockContact").then(function (o) {
        var f = "contacts/v2/users/" + encodeURIComponent(e) + "/contacts/blocklist/" + encodeURIComponent(t), l = {
            report_abuse: String(r),
            ui_version: u.appName
          };
        r && s && (l.reason = s);
        var c = n.merge(o, {
          contentType: i.contentTypes.FORM_URL_ENCODED,
          payload: JSON.stringify(l)
        });
        return a.put(f, c);
      });
    }
    function b(e, t) {
      return l("unblockContact").then(function (n) {
        var r = "contacts/v2/users/" + encodeURIComponent(e) + "/contacts/blocklist/" + encodeURIComponent(t);
        return a.remove(r, n);
      });
    }
    function w(e, t) {
      return l("addContactToFavorites").then(function (n) {
        var r = "contacts/v2/users/" + encodeURIComponent(e) + "/contacts/favorites/" + encodeURIComponent(t);
        return a.put(r, n);
      });
    }
    function E(e, t) {
      return l("removeContactFromFavorites").then(function (n) {
        var r = "contacts/v2/users/" + encodeURIComponent(e) + "/contacts/favorites/" + encodeURIComponent(t);
        return a.remove(r, n);
      });
    }
    function S(e) {
      return l("getIncomingContactInvites").then(function (t) {
        var n = "contacts/v2/users/" + encodeURIComponent(e) + "/invites";
        return a.get(n, t);
      });
    }
    function x(e, t) {
      return l("acceptContactInvite").then(function (n) {
        var r = "contacts/v2/users/" + encodeURIComponent(e) + "/invites/" + encodeURIComponent(t) + "/accept";
        return a.put(r, n);
      });
    }
    function T(e, t) {
      return l("declineContactInvite").then(function (n) {
        var r = "contacts/v2/users/" + encodeURIComponent(e) + "/invites/" + encodeURIComponent(t) + "/decline";
        return a.put(r, n);
      });
    }
    function N(e, t, r, s) {
      return l("addContactPhoneNumber").then(function (o) {
        var u = "contacts/v2/users/" + encodeURIComponent(e) + "/contacts/" + encodeURIComponent(t) + "/phones", f = {
            number: s,
            type: r
          }, l = n.merge(o, {
            contentType: i.contentTypes.JSON,
            payload: JSON.stringify(f)
          });
        return a.post(u, l);
      });
    }
    function C(e, t, r, s, o) {
      return l("modifyContactPhoneNumber").then(function (u) {
        var f = "contacts/v2/users/" + encodeURIComponent(e) + "/contacts/" + encodeURIComponent(t) + "/phones/" + o, l = {
            number: s,
            type: r
          }, c = n.merge(u, {
            contentType: i.contentTypes.JSON,
            payload: JSON.stringify(l)
          });
        return a.put(f, c);
      });
    }
    function k(e, t, n) {
      return l("deleteContactPhoneNumber").then(function (r) {
        var i = "contacts/v2/users/" + encodeURIComponent(e) + "/contacts/" + encodeURIComponent(t) + "/phones/" + n;
        return a.remove(i, r);
      });
    }
    var a = i.build(u), f = u.pageSize || o;
    return {
      getRawViewDelta: u.fetchingByPageEnabled ? h : c,
      getMyContacts: p,
      getMyContactsDelta: d,
      getInvites: S,
      addContact: v,
      addPSTNContact: m,
      deleteContact: g,
      blockContact: y,
      unblockContact: b,
      acceptContactInvite: x,
      declineContactInvite: T,
      addContactToFavorites: w,
      removeContactFromFavorites: E,
      addContactPhoneNumber: N,
      modifyContactPhoneNumber: C,
      deleteContactPhoneNumber: k
    };
  }
  var n = e("lodash-compat"), r = e("swx-utils-common"), i = e("swx-xhr-dispatcher"), s = e("./utils/contactsInfo"), o = 100;
  t.reasons = {
    DEFAULT: "default",
    NOTIFICATION: "notification"
  };
  t.headers = {
    IF_NONE_MATCH: "If-None-Match",
    CONTINUATION: "X-Skype-Continuation-Token"
  };
  t.build = u;
}));
