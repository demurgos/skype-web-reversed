(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("web-calling/lib/models/callRegistry", [
      "require",
      "exports",
      "../utilities/typeDefs",
      "./call",
      "../utilities/observableBase",
      "./callEvents"
    ], e);
}(function (e, t) {
  var n = e("../utilities/typeDefs"), r = e("./call"), i = e("../utilities/observableBase"), s = e("./callEvents"), o = new RegExp("/callAgent/", "i"), u = {
      INCOMING_LYNC_NGC_CALL: 105,
      INCOMING_SKYPE_NGC_CALL: 107,
      INCOMING_SKYPE_NGC_GVC_CALL: 109,
      INCOMING_SKYPE_NGC_PSTN_CALL: 111,
      STOP_RINGING_SKYPE_NGC_CALL: 110
    }, a = function () {
      function e(e) {
        this.signalingAgent = e;
      }
      return e.prototype.handleMessage = function (e) {
        if (e.url.search(o) > -1) {
          var t = this.signalingAgent.handleIncomingNotification(e);
          return {
            isHandled: !0,
            resultCode: t
          };
        }
        return { isHandled: !1 };
      }, e;
    }(), f = function () {
      function e(e, t) {
        this.logger = t.createChild("CallingMessageHandler");
        this.callRegistry = e;
      }
      return e.prototype.handleMessage = function (e) {
        switch (e.eventId) {
        case u.INCOMING_LYNC_NGC_CALL:
        case u.INCOMING_SKYPE_NGC_CALL:
        case u.INCOMING_SKYPE_NGC_GVC_CALL:
        case u.INCOMING_SKYPE_NGC_PSTN_CALL:
          this.handleIncomingCall(e);
          break;
        case u.STOP_RINGING_SKYPE_NGC_CALL:
          this.handleStopRinging(e);
          break;
        default:
        }
        return { isHandled: !1 };
      }, e.prototype.handleIncomingCall = function (e) {
        var t = this.buildNGCCallPayload(e);
        if (!t)
          return !1;
        this.logger.debug("received trouter incoming call notification for callId=" + t.convoCallId);
        if (this.callRegistry.calls.some(function (e) {
            return t.convoCallId === e.callId;
          }))
          return this.logger.debug("ignoring trouter incoming call notification for callId=" + t.convoCallId + " since call exists"), !1;
        var n = this.callRegistry.createCall(t.isMultiParty ? t.conversationId : undefined, t.callId);
        return n.initialize({
          selfParticipant: {
            id: this.callRegistry.identity.id,
            displayName: this.callRegistry.identity.displayName
          },
          callbacks: {
            isRemoteClientLync: function () {
              return e.eventId === u.INCOMING_LYNC_NGC_CALL;
            },
            isRemotePersonAuthorized: function () {
              return !0;
            },
            isGroupConversation: function () {
              return t.isMultiParty;
            }
          }
        }), n.acknowledge(t), this.logger.debug("trouter incoming call notification processed, call created and acknowledged"), this.callRegistry.raiseIncomingCall(n, t.callerId), !0;
      }, e.prototype.buildNGCCallPayload = function (e) {
        var t = {}, n;
        try {
          n = JSON.parse(atob(e.body.gp));
        } catch (r) {
          return this.logger.error("Unable to parse incoming NGC call payload"), null;
        }
        return n.callNotification ? (t.conversationId = n.groupChat && n.groupChat.threadId || n.callNotification.from.id, t.callerId = n.callNotification.from.id, t.isMultiParty = n.conversationInvitation.isMultiParty, t.callId = n.debugContent.callId, t.ngcCall = !0, t.body = e.body, this.logger.log("Incoming NGC payload", t), t) : (this.logger.error("Missing callNotification in parsed incoming NGC call payload"), null);
      }, e.prototype.handleStopRinging = function (e) {
        var t = this.getCallId(e);
        this.logger.debug("received trouter stop ringing notification for callId=" + t);
        var r = this.callRegistry.calls.filter(function (e) {
          return e.callId === t;
        })[0];
        return r ? r.state !== n.CallState.Ringing ? (this.logger.debug("ignoring trouter stop ringing notification for callId=" + t + " since call is not in Ringing state anymore"), !1) : (r.stop(), this.logger.debug("trouter stop ringing notification processed, call stopping"), !0) : (this.logger.debug("ignoring trouter incoming call notification for callId=" + t + " since call does not exist"), !1);
      }, e.prototype.getCallId = function (e) {
        try {
          return e.body.callId;
        } catch (t) {
          return this.logger.error("Unable to get callId from stop ringing NGC call payload"), null;
        }
      }, e;
    }(), l = function (e) {
      function t(t, n, r, i) {
        var s = e.call(this) || this;
        return s.calls = [], s.identity = null, s.trouterService = t, s.services = n, s.model = r, s.logger = i.createChild("Callregistry"), s;
      }
      return __extends(t, e), t.prototype.raiseIncomingCall = function (e, t) {
        this.raiseEvent(s.CallRegistryEvents.incomingCall, {
          call: e,
          callerId: t
        });
      }, t.prototype.init = function (e) {
        var t = this;
        return this.identity = e, this.trouterService.registerMessageHandler(new a(this.services.signalingAgent)), this.trouterService.registerMessageHandler(new f(this, this.logger)), this.services.mediaAgent.getDeviceManager().enumerateDevicesAsync().then(function (e) {
          t.logger.log("devices enumerated:", e);
        }), Promise.resolve(null);
      }, t.prototype.createCall = function (e, t) {
        var n = new r["default"](this.model, e, t);
        return this.calls.push(n), this.raiseChanged(), n;
      }, t.prototype.deleteCall = function (e) {
        var t = this.calls.indexOf(e);
        return t !== -1 ? (this.calls.splice(t, 1), this.raiseChanged(), !0) : !1;
      }, t.prototype.debugInformation = function (e) {
        var t = e ? "CallInformation\n * CallId=" + e.callId + "\n" : "No CallInfo";
        return Promise.resolve(t);
      }, t.prototype.updateSkypeToken = function (e) {
      }, t;
    }(i["default"]);
  t.CallRegistry = l;
}));
