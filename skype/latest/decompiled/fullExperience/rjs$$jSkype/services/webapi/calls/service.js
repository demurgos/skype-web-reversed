define("jSkype/services/webapi/calls/service", [
  "require",
  "lodash-compat",
  "browser/detect",
  "swx-enums",
  "constants/common",
  "jSkype/client",
  "jSkype/modelHelpers/personHelper",
  "jSkype/services/clientInfo",
  "jSkype/services/webapi/constants",
  "jSkype/services/webapi/utils/conversationMetadataStore",
  "jSkype/settings"
], function (e) {
  var t = e("lodash-compat"), n = e("browser/detect"), r = e("swx-enums"), i = e("constants/common"), s = e("jSkype/client"), o = e("jSkype/modelHelpers/personHelper"), u = e("jSkype/services/clientInfo"), a = e("jSkype/services/webapi/constants"), f = e("jSkype/services/webapi/utils/conversationMetadataStore"), l = e("jSkype/settings");
  return function (c, h, p) {
    function v(e, n, r, i, s) {
      function u(e) {
        return p.put(n, e);
      }
      var o = {
        params: {},
        payload: {}
      };
      return o.params.name = r, o.payload[r] = i, t.forOwn(s, function (e, t) {
        o.params[t] = e;
      }), h.build(e, o).then(u);
    }
    var d;
    this.updateServiceDomain = function (e) {
      p.uriBuilder.setDomain(e);
    }, this.setConversationOption = function (e, t, n) {
      var r = "/conversations/" + e + "/properties", i = c.customResource(r);
      return v(a.SERVICE_CALLS.SET_CONVERSATION_OPTION, i, t, n);
    }, this.setThreadOption = function (e, t, n) {
      var r = "v1/threads/" + e + "/properties";
      return v(a.SERVICE_CALLS.SET_THREAD_OPTION, r, t, n);
    }, this.ping = function () {
      var e = c.ping();
      return p.get(e, {});
    }, this.pinToDogfood = function () {
      function t(e) {
        return p.put("v1/users/ME/properties", e);
      }
      var e = {
        params: { name: "dogfoodUser" },
        payload: { dogfoodUser: !0 }
      };
      return h.build(a.SERVICE_CALLS.PIN_TO_DOGFOOD, e).then(t);
    }, this.createConversation = function (e) {
      function n(e) {
        return p.post("v1/threads", e);
      }
      var t = { payload: { members: e } };
      return h.build(a.SERVICE_CALLS.CREATE_CONVERSATION, t).then(n);
    }, this.postMessage = function (e, t) {
      function i(e) {
        return p.post(n, e);
      }
      function s(e) {
      }
      var n = c.messages(e), r = { payload: t };
      return h.build(a.SERVICE_CALLS.POST_MESSAGE, r).then(i, s);
    }, this.addParticipant = function (e, t, n) {
      function o(e) {
        return p.put(i, e);
      }
      var i = c.member(e, t), s = { payload: { role: n === r.participantRole.Leader ? "Admin" : "User" } };
      return h.build(a.SERVICE_CALLS.ADD_PARTICIPANT, s).then(o);
    }, this.removeParticipant = function (e, t) {
      function r(e) {
        return p.remove(n, e);
      }
      var n = c.member(e, t);
      return h.build(a.SERVICE_CALLS.REMOVE_PARTICIPANT).then(r);
    }, this.setConsumptionHorizon = function (e, t) {
      var n = "/conversations/" + e + "/properties", o = c.customResource(n), u = {};
      return l.isFeatureOn(i.featureFlags.READ_RECEIPT_ENABLED) && s.get().personsAndGroupsManager.mePerson.status() === r.onlineStatus.Online && (u.readReceipt = !0), v(a.SERVICE_CALLS.SET_CONSUMPTION_HORIZON, o, "consumptionhorizon", t, u);
    }, this.getFavorites = function () {
      function t(e) {
        return p.get("v1/users/ME/properties", e);
      }
      var e = {};
      if (!l.isFeatureOn(i.featureFlags.FAVORITES_CONVERSATION_ENABLED))
        return;
      return h.build(a.SERVICE_CALLS.GET_FAVORITES, e).then(t);
    }, this.setFavorites = function (e) {
      function s(i) {
        i && i.response && i.response.favorites ? r = JSON.parse(i.response.favorites) : r = [], t.indexOf(r, e) !== -1 ? t.pull(r, e) : r.push(e), n = {
          params: { name: "favorites" },
          payload: { favorites: JSON.stringify(r) }
        };
      }
      function o(e) {
        return p.put("v1/users/ME/properties", e);
      }
      var n, r;
      if (!l.isFeatureOn(i.featureFlags.FAVORITES_CONVERSATION_ENABLED))
        return;
      return this.getFavorites().then(s).then(function () {
        return h.build(a.SERVICE_CALLS.SET_FAVORITES, n).then(o);
      });
    }, this.fetchMessages = function (e, t, n) {
      function o(e) {
        return p.get(r, e);
      }
      var r = c.messages(e), s = {
          params: {
            startTime: t,
            pageSize: n,
            view: "msnp24Equivalent" + (l.isFeatureOn(i.featureFlags.SUPPORT_MESSAGE_PROPERTIES) ? "|supportsMessageProperties" : ""),
            targetType: "Passport|Skype|Lync|Thread" + (l.isFeatureOn(i.featureFlags.PSTN_ENABLED) ? "|PSTN" : "") + (l.isFeatureOn(i.featureFlags.AGENTS_ENABLED) ? "|Agent" : "")
          }
        };
      return h.build(a.SERVICE_CALLS.FETCH_MESSAGES, s).then(o);
    }, this.fetchMessagesLoadMore = function (e, t) {
      function s(e) {
        return p.get(n, e);
      }
      var n = c.messages(e), r = {
          params: {
            syncState: f.get(e),
            startTime: 0,
            pageSize: t,
            view: "msnp24Equivalent" + (l.isFeatureOn(i.featureFlags.SUPPORT_MESSAGE_PROPERTIES) ? "|supportsMessageProperties" : "")
          }
        };
      return h.build(a.SERVICE_CALLS.FETCH_MESSAGES_LOAD_MORE, r).then(s);
    }, this.fetchThread = function (e) {
      function r(e) {
        return p.get(t, e);
      }
      var t = c.thread(e), n = { params: { view: "msnp24Equivalent" } };
      return h.build(a.SERVICE_CALLS.FETCH_THREAD, n).then(r);
    }, this.fetchConversation = function (e) {
      function r(e) {
        return p.get(t, e);
      }
      var t = c.conversations(e), n = { params: { view: "msnp24Equivalent" } };
      return h.build(a.SERVICE_CALLS.FETCH_CONVERSATION, n).then(r);
    }, this.fetchConversations = function (e, t) {
      function s(e) {
        return p.get(n, e);
      }
      var n = c.conversations(), r = {
          params: {
            startTime: e,
            pageSize: t,
            view: "msnp24Equivalent",
            targetType: "Passport|Skype|Lync|Thread" + (l.isFeatureOn(i.featureFlags.PSTN_ENABLED) ? "|PSTN" : "") + (l.isFeatureOn(i.featureFlags.AGENTS_ENABLED) ? "|Agent" : "")
          }
        };
      return h.build(a.SERVICE_CALLS.FETCH_CONVERSATIONS, r).then(s);
    }, this.fetchConversationsBySyncState = function (e, t) {
      function i(e) {
        return p.get(n, e);
      }
      var n = c.conversations(), r = {
          params: {
            syncState: e,
            pageSize: t,
            view: "msnp24Equivalent"
          }
        };
      return h.build(a.SERVICE_CALLS.FETCH_CONVERSATIONS_BY_SYNC_STATE, r).then(i);
    }, this.requestEndpointCreation = function (e, t) {
      function s(t) {
        return e ? p.put(r, t) : p.post(r, t);
      }
      var n = "/endpoints" + (e ? "/" + e : ""), r = c.customResource(n), i = { payload: t || {} };
      return h.build(a.SERVICE_CALLS.REQUEST_ENDPOINT_CREATION, i).then(s);
    }, this.requestEndpointRemoval = function (e) {
      function i(e) {
        return p.remove(n, e);
      }
      if (!e)
        return Promise.reject(new Error("invalid endpointID"));
      var t = "/endpoints/" + e, n = c.customResource(t), r = { payload: {} };
      return h.build(a.SERVICE_CALLS.REQUEST_ENDPOINT_DELETION, r).then(i);
    }, this.requestSubscriptionCreation = function (e) {
      function r(e) {
        return p.post(t, e);
      }
      var t = c.customResource("/endpoints/SELF/subscriptions"), n = {
          payload: {
            channelType: "httpLongPoll",
            template: "raw",
            interestedResources: e
          }
        };
      return h.build(a.SERVICE_CALLS.REQUEST_SUBSCRIPTION_CREATION, n).then(r);
    }, this.requestPolling = function (e) {
      function n(e) {
        var n = p.post(t, e);
        return d = n, n;
      }
      var t = c.customResource("/poll", e);
      return h.build(a.SERVICE_CALLS.REQUEST_POLLING).then(n);
    }, this.abortCurrentPoll = function () {
      d && d._abort();
    }, this.setEndpointPresence = function () {
      function i(t) {
        return p.put(e, t);
      }
      var e = c.constructPresenceEndpointURI("/presenceDocs/messagingService"), t = n.getSystemInfo(), r = {
          id: "messagingService",
          type: "EndpointPresenceDoc",
          selfLink: "uri",
          privateInfo: { epname: "skype" },
          publicInfo: {
            capabilities: "video|audio",
            type: t.deviceType,
            skypeNameVersion: u.getBIAppName(),
            nodeInfo: "",
            version: u.getBIVersion()
          }
        };
      return h.build(a.SERVICE_CALLS.SET_ENDPOINT_PRESENCE, { payload: r }).then(i);
    }, this.setEndpointProperty = function (e, t) {
      function i(e) {
        return p.put(n, e);
      }
      var n = c.customResource("/endpoints/SELF/properties"), r = {
          params: { name: e },
          payload: {}
        };
      return r.payload[e] = t, h.build(a.SERVICE_CALLS.SET_ENDPOINT_PROPERTY, r).then(i);
    }, this.activateEndpoint = function () {
      function n(t) {
        return p.post(e, t);
      }
      var e = c.constructPresenceEndpointURI("/active"), t = { payload: { timeout: a.ACTIVATE_ENDPOINT_TIMEOUT / 1000 } };
      return h.build(a.SERVICE_CALLS.ACTIVATE_ENDPOINT, t).then(n);
    }, this.setUserPresence = function (e) {
      function i(e) {
        return p.put(n, e);
      }
      var n = c.customResource("/presenceDocs/messagingService"), r = { payload: { status: t.capitalize(e) } };
      return h.build(a.SERVICE_CALLS.SET_USER_PRESENCE, r).then(i);
    }, this.getUserPresence = function (e) {
      function r(e) {
        return p.get(n, e);
      }
      var t = "/presenceDocs/messagingService", n = c.contacts(e, t);
      return h.build(a.SERVICE_CALLS.GET_USER_PRESENCE).then(r);
    }, this.sendContactsList = function (e) {
      function r(e) {
        return { id: o.getKey(e.id(), e._type()) };
      }
      function i(e) {
        return p.post(t, e);
      }
      var t = c.contacts(), n = { payload: { contacts: e.map(r) } };
      return h.build(a.SERVICE_CALLS.SEND_CONTACT_LIST, n).then(i);
    }, this.addContactToContactsList = function (e) {
      function n(e) {
        return p.put(t, e);
      }
      var t = c.contacts(e);
      return h.build(a.SERVICE_CALLS.ADD_CONTACT_TO_CONTACTS_LIST).then(n);
    }, this.removeContactFromContactsList = function (e) {
      function n(e) {
        return p.remove(t, e);
      }
      var t = c.contacts(e);
      return h.build(a.SERVICE_CALLS.REMOVE_CONTACT_FROM_CONTACTS_LIST).then(n);
    }, this.getSelfProperties = function () {
      function t(t) {
        return p.get(e, t);
      }
      var e = c.customResource("/properties");
      return h.build(a.SERVICE_CALLS.GET_SELF_PROPERTIES).then(t);
    }, this.setMessageProperty = function (e, t, n, r) {
      function o(e) {
        return p.put(i, e);
      }
      var i = c.messageProperties(e, t), s = {
          params: { name: n },
          payload: {}
        };
      return s.payload[n] = JSON.stringify(r), h.build(a.SERVICE_CALLS.SET_MESSAGE_PROPERTY, s).then(o);
    }, this.removeMessageProperty = function (e, t, n, r) {
      function u(e) {
        return s.hasOwnProperty(e) && s[e] === n;
      }
      function l(e) {
        return p.remove(i, e);
      }
      var i = c.messageProperties(e, t), s = a.MESSAGE_PROPERTIES.PER_USER, o = { params: { name: n } };
      for (var f in s)
        if (u(f)) {
          o.payload = {}, o.payload[n] = JSON.stringify({ key: r });
          break;
        }
      return h.build(a.SERVICE_CALLS.REMOVE_MESSAGE_PROPERTY, o).then(l);
    }, this.removeAllMessages = function (e) {
      function n(e) {
        return p.remove(t, e);
      }
      var t = c.messages(e);
      return h.build(a.SERVICE_CALLS.REMOVE_ALL_MESSAGES).then(n);
    };
  };
})
