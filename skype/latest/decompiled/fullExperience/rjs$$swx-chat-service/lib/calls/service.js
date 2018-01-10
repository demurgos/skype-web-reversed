(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-chat-service/lib/calls/service", [
      "require",
      "exports",
      "lodash-compat",
      "swx-enums",
      "swx-constants",
      "swx-client-info",
      "jskype-settings-instance",
      "../constants",
      "../index"
    ], e);
}(function (e, t) {
  var n = e("lodash-compat"), r = e("swx-enums"), i = e("swx-constants"), s = e("swx-client-info"), o = e("jskype-settings-instance"), u = e("../constants"), a = e("../index"), f = function () {
      function e(e, t, n, r, i) {
        this.requestURIBuilder = e;
        this.requestOptionsBuilder = t;
        this.xhrDispatcher = n;
        this.mePerson = r;
        this.browserDetect = i;
      }
      return e.prototype.updateServiceDomain = function (e) {
        this.xhrDispatcher.uriBuilder.setDomain(e);
      }, e.prototype.setConversationOption = function (e, t, n) {
        var r = "/conversations/" + e + "/properties", i = this.requestURIBuilder.customResource(r);
        return this.setOption(u.SERVICE_CALLS.SET_CONVERSATION_OPTION, i, t, n);
      }, e.prototype.setThreadOption = function (e, t, n) {
        var r = "v1/threads/" + e + "/properties";
        return this.setOption(u.SERVICE_CALLS.SET_THREAD_OPTION, r, t, n);
      }, e.prototype.ping = function () {
        var e = this.requestURIBuilder.ping();
        return this.xhrDispatcher.get(e, {});
      }, e.prototype.pinToDogfood = function () {
        var e = this, t = {
            params: { name: "dogfoodUser" },
            payload: { dogfoodUser: !0 }
          };
        return this.requestOptionsBuilder.build(u.SERVICE_CALLS.PIN_TO_DOGFOOD, t).then(function (t) {
          return e.xhrDispatcher.put("v1/users/ME/properties", t);
        });
      }, e.prototype.createConversation = function (e) {
        var t = this, n = { payload: { members: e } };
        return this.requestOptionsBuilder.build(u.SERVICE_CALLS.CREATE_CONVERSATION, n).then(function (e) {
          return t.xhrDispatcher.post("v1/threads", e);
        });
      }, e.prototype.postMessage = function (e, t) {
        var n = this, r = this.requestURIBuilder.messages(e), i = { payload: t };
        return this.requestOptionsBuilder.build(u.SERVICE_CALLS.POST_MESSAGE, i).then(function (e) {
          return n.xhrDispatcher.post(r, e);
        }, function (e) {
        });
      }, e.prototype.addParticipant = function (e, t, n) {
        var i = this, s = this.requestURIBuilder.member(e, t), o = { payload: { role: n === r.participantRole.Leader ? "Admin" : "User" } };
        return this.requestOptionsBuilder.build(u.SERVICE_CALLS.ADD_PARTICIPANT, o).then(function (e) {
          return i.xhrDispatcher.put(s, e);
        });
      }, e.prototype.removeParticipant = function (e, t) {
        var n = this, r = this.requestURIBuilder.member(e, t);
        return this.requestOptionsBuilder.build(u.SERVICE_CALLS.REMOVE_PARTICIPANT).then(function (e) {
          return n.xhrDispatcher.remove(r, e);
        });
      }, e.prototype.setConsumptionHorizon = function (e, t) {
        var n = "/conversations/" + e + "/properties", s = this.requestURIBuilder.customResource(n), a = {};
        return o.isFeatureOn(i.COMMON.featureFlags.READ_RECEIPT_ENABLED) && this.mePerson.status() === r.onlineStatus.Online && (a.readReceipt = !0), this.setOption(u.SERVICE_CALLS.SET_CONSUMPTION_HORIZON, s, "consumptionhorizon", t, a);
      }, e.prototype.setIsFavorite = function (e, t) {
        var n = "/conversations/" + e + "/properties", r = this.requestURIBuilder.customResource(n), s = {};
        return o.isFeatureOn(i.COMMON.featureFlags.FAVORITES_CONVERSATION_ENABLED) ? this.setOption(u.SERVICE_CALLS.SET_IS_FAVORITE, r, "favorite", t.toString().toLowerCase(), s) : undefined;
      }, e.prototype.fetchMessages = function (e, t, n) {
        var r = this, s = this.requestURIBuilder.messages(e), a = {
            params: {
              startTime: t,
              pageSize: n,
              view: "msnp24Equivalent" + (o.isFeatureOn(i.COMMON.featureFlags.SUPPORT_MESSAGE_PROPERTIES) ? "|supportsMessageProperties" : ""),
              targetType: "Passport|Skype|Lync|Thread" + (o.isFeatureOn(i.COMMON.featureFlags.PSTN_ENABLED) ? "|PSTN" : "") + (o.isFeatureOn(i.COMMON.featureFlags.AGENTS_ENABLED) ? "|Agent" : "")
            }
          };
        return this.requestOptionsBuilder.build(u.SERVICE_CALLS.FETCH_MESSAGES, a).then(function (e) {
          return r.xhrDispatcher.get(s, e);
        });
      }, e.prototype.fetchMessagesLoadMore = function (e, t) {
        var n = this, r = this.requestURIBuilder.messages(e), s = {
            params: {
              syncState: a.utils.conversationMetadataStore.get(e),
              startTime: 0,
              pageSize: t,
              view: "msnp24Equivalent" + (o.isFeatureOn(i.COMMON.featureFlags.SUPPORT_MESSAGE_PROPERTIES) ? "|supportsMessageProperties" : "")
            }
          };
        return this.requestOptionsBuilder.build(u.SERVICE_CALLS.FETCH_MESSAGES_LOAD_MORE, s).then(function (e) {
          return n.xhrDispatcher.get(r, e);
        });
      }, e.prototype.fetchThread = function (e) {
        var t = this, n = this.requestURIBuilder.thread(e), r = { params: { view: "msnp24Equivalent" } };
        return this.requestOptionsBuilder.build(u.SERVICE_CALLS.FETCH_THREAD, r).then(function (e) {
          return t.xhrDispatcher.get(n, e);
        });
      }, e.prototype.fetchConversation = function (e) {
        var t = this, n = this.requestURIBuilder.conversations(e), r = { params: { view: "msnp24Equivalent" } };
        return this.requestOptionsBuilder.build(u.SERVICE_CALLS.FETCH_CONVERSATION, r).then(function (e) {
          return t.xhrDispatcher.get(n, e);
        });
      }, e.prototype.fetchConversations = function (e, t) {
        var n = this, r = this.requestURIBuilder.conversations(), s = {
            params: {
              startTime: e,
              pageSize: t,
              view: "msnp24Equivalent",
              targetType: "Passport|Skype|Lync|Thread" + (o.isFeatureOn(i.COMMON.featureFlags.PSTN_ENABLED) ? "|PSTN" : "") + (o.isFeatureOn(i.COMMON.featureFlags.AGENTS_ENABLED) ? "|Agent" : "")
            }
          };
        return this.requestOptionsBuilder.build(u.SERVICE_CALLS.FETCH_CONVERSATIONS, s).then(function (e) {
          return n.xhrDispatcher.get(r, e);
        });
      }, e.prototype.fetchConversationsBySyncState = function (e, t) {
        var n = this, r = this.requestURIBuilder.conversations(), i = {
            params: {
              syncState: e,
              pageSize: t,
              view: "msnp24Equivalent"
            }
          };
        return this.requestOptionsBuilder.build(u.SERVICE_CALLS.FETCH_CONVERSATIONS_BY_SYNC_STATE, i).then(function (e) {
          return n.xhrDispatcher.get(r, e);
        });
      }, e.prototype.requestEndpointCreation = function (e, t) {
        var n = this, r = "/endpoints" + (e ? "/" + e : ""), i = this.requestURIBuilder.customResource(r), s = { payload: t || {} };
        return this.requestOptionsBuilder.build(u.SERVICE_CALLS.REQUEST_ENDPOINT_CREATION, s).then(function (t) {
          return e ? n.xhrDispatcher.put(i, t) : n.xhrDispatcher.post(i, t);
        });
      }, e.prototype.requestEndpointRemoval = function (e) {
        var t = this;
        if (!e)
          return Promise.reject(new Error("invalid endpointID"));
        var n = "/endpoints/" + e, r = this.requestURIBuilder.customResource(n), i = { payload: {} };
        return this.requestOptionsBuilder.build(u.SERVICE_CALLS.REQUEST_ENDPOINT_DELETION, i).then(function (e) {
          return t.xhrDispatcher.remove(r, e);
        });
      }, e.prototype.requestSubscriptionCreation = function (e) {
        var t = this, n = this.requestURIBuilder.customResource("/endpoints/SELF/subscriptions"), r = {
            payload: {
              channelType: "httpLongPoll",
              template: "raw",
              interestedResources: e
            }
          };
        return this.requestOptionsBuilder.build(u.SERVICE_CALLS.REQUEST_SUBSCRIPTION_CREATION, r).then(function (e) {
          return t.xhrDispatcher.post(n, e);
        });
      }, e.prototype.requestPolling = function (e) {
        var t = this, n = this.requestURIBuilder.customResource("/poll", e);
        return this.requestOptionsBuilder.build(u.SERVICE_CALLS.REQUEST_POLLING).then(function (e) {
          var r = t.xhrDispatcher.post(n, e);
          return t.currentPoll = r, r;
        });
      }, e.prototype.abortCurrentPoll = function () {
        this.currentPoll && this.currentPoll.abort();
      }, e.prototype.setEndpointPresence = function () {
        var e = this, t = this.requestURIBuilder.constructPresenceEndpointURI("/presenceDocs/messagingService"), n = this.browserDetect.getSystemInfo(), r = {
            id: "messagingService",
            type: "EndpointPresenceDoc",
            selfLink: "uri",
            privateInfo: { epname: "skype" },
            publicInfo: {
              capabilities: "video|audio",
              type: n.deviceType,
              skypeNameVersion: s.getBIAppName(),
              nodeInfo: "",
              version: s.getBIVersion()
            }
          };
        return this.requestOptionsBuilder.build(u.SERVICE_CALLS.SET_ENDPOINT_PRESENCE, { payload: r }).then(function (n) {
          return e.xhrDispatcher.put(t, n);
        });
      }, e.prototype.getEndpointsPresence = function () {
        var e = this, t = this.requestURIBuilder.customResource("/presenceDocs/messagingService?view=expanded");
        return this.requestOptionsBuilder.build("getEndpointsPresence").then(function (n) {
          return e.xhrDispatcher.get(t, n);
        });
      }, e.prototype.getActiveEndpoints = function () {
        var e = this, t = this.requestURIBuilder.customResource("/endpoints");
        return this.requestOptionsBuilder.build("getActiveEndpoints").then(function (n) {
          return e.xhrDispatcher.get(t, n);
        });
      }, e.prototype.setEndpointProperty = function (e, t) {
        var n = this, r = this.requestURIBuilder.customResource("/endpoints/SELF/properties"), i = {
            params: { name: e },
            payload: {}
          };
        return i.payload[e] = t, this.requestOptionsBuilder.build(u.SERVICE_CALLS.SET_ENDPOINT_PROPERTY, i).then(function (e) {
          return n.xhrDispatcher.put(r, e);
        });
      }, e.prototype.activateEndpoint = function () {
        var e = this, t = this.requestURIBuilder.constructPresenceEndpointURI("/active"), n = { payload: { timeout: u.ACTIVATE_ENDPOINT_TIMEOUT / 1000 } };
        return this.requestOptionsBuilder.build(u.SERVICE_CALLS.ACTIVATE_ENDPOINT, n).then(function (n) {
          return e.xhrDispatcher.post(t, n);
        });
      }, e.prototype.setUserPresence = function (e) {
        var t = this, r = this.requestURIBuilder.customResource("/presenceDocs/messagingService"), i = { payload: { status: n.capitalize(e.toString()) } };
        return this.requestOptionsBuilder.build(u.SERVICE_CALLS.SET_USER_PRESENCE, i).then(function (e) {
          return t.xhrDispatcher.put(r, e);
        });
      }, e.prototype.getUserPresence = function (e) {
        var t = this, n = "/presenceDocs/messagingService", r = this.requestURIBuilder.contacts(e, n);
        return this.requestOptionsBuilder.build(u.SERVICE_CALLS.GET_USER_PRESENCE).then(function (e) {
          return t.xhrDispatcher.get(r, e);
        });
      }, e.prototype.sendContactsList = function (e) {
        var t = this, n = this.requestURIBuilder.contacts(), r = {
            payload: {
              contacts: e.map(function (e) {
                return { id: e };
              })
            }
          };
        return this.requestOptionsBuilder.build(u.SERVICE_CALLS.SEND_CONTACT_LIST, r).then(function (e) {
          return t.xhrDispatcher.post(n, e);
        });
      }, e.prototype.addContactToContactsList = function (e) {
        var t = this, n = this.requestURIBuilder.contacts(e);
        return this.requestOptionsBuilder.build(u.SERVICE_CALLS.ADD_CONTACT_TO_CONTACTS_LIST).then(function (e) {
          return t.xhrDispatcher.put(n, e);
        });
      }, e.prototype.removeContactFromContactsList = function (e) {
        var t = this, n = this.requestURIBuilder.contacts(e);
        return this.requestOptionsBuilder.build(u.SERVICE_CALLS.REMOVE_CONTACT_FROM_CONTACTS_LIST).then(function (e) {
          return t.xhrDispatcher.remove(n, e);
        });
      }, e.prototype.getSelfProperties = function () {
        var e = this, t = this.requestURIBuilder.customResource("/properties");
        return this.requestOptionsBuilder.build(u.SERVICE_CALLS.GET_SELF_PROPERTIES).then(function (n) {
          return e.xhrDispatcher.get(t, n);
        });
      }, e.prototype.setMessageProperty = function (e, t, n, r) {
        var i = this, s = this.requestURIBuilder.messageProperties(e, t), o = {
            params: { name: n },
            payload: {}
          };
        return o.payload[n] = JSON.stringify(r), this.requestOptionsBuilder.build(u.SERVICE_CALLS.SET_MESSAGE_PROPERTY, o).then(function (e) {
          return i.xhrDispatcher.put(s, e);
        });
      }, e.prototype.removeMessageProperty = function (e, t, n, r) {
        var i = this, s = this.requestURIBuilder.messageProperties(e, t), o = u.MESSAGE_PROPERTIES.PER_USER, a = { params: { name: n } }, f = function (e) {
            return o.hasOwnProperty(e) && o[e] === n;
          };
        for (var l in o)
          if (f(l)) {
            a.payload = {};
            a.payload[n] = JSON.stringify({ key: r });
            break;
          }
        return this.requestOptionsBuilder.build(u.SERVICE_CALLS.REMOVE_MESSAGE_PROPERTY, a).then(function (e) {
          return i.xhrDispatcher.remove(s, e);
        });
      }, e.prototype.removeAllMessages = function (e) {
        var t = this, n = this.requestURIBuilder.messages(e);
        return this.requestOptionsBuilder.build(u.SERVICE_CALLS.REMOVE_ALL_MESSAGES).then(function (e) {
          return t.xhrDispatcher.remove(n, e);
        });
      }, e.prototype.setOption = function (e, t, r, i, s) {
        var o = this, u = {
            params: {},
            payload: {}
          };
        return u.params.name = r, typeof i != "undefined" && i !== null && (r === "historydisclosed" || r === "joiningenabled" ? u.payload[r] = i.toString().toLowerCase() : u.payload[r] = i.toString()), n.forOwn(s, function (e, t) {
          u.params[t] = e;
        }), this.requestOptionsBuilder.build(e, u).then(function (e) {
          return o.xhrDispatcher.put(t, e);
        });
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = f;
}));
