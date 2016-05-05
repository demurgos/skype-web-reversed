define("jSkype/services/webapiMapper/conversationApiHandler", [
  "require",
  "lodash-compat",
  "swx-i18n",
  "constants/common",
  "swx-enums",
  "jSkype/client",
  "jcafe-property-model",
  "jSkype/models/conversationActivityItem",
  "jSkype/modelHelpers/personHelper",
  "jSkype/modelHelpers/propertyValidator",
  "jSkype/services/internalPubSub",
  "jSkype/services/serviceAccessLayer/serviceLocator",
  "services/serviceLocator",
  "jSkype/services/webapi/main",
  "jSkype/services/webapi/utils/conversationMetadataStore",
  "jSkype/services/systemCommands/main",
  "jSkype/services/webapiMapper/conversationDataFilter",
  "jSkype/services/webapiMapper/conversationDataHandlers",
  "jSkype/services/webapiMapper/conversationLiveStateHandler",
  "jSkype/settings",
  "jSkype/telemetry/poll",
  "jSkype/utils/chat/conversation",
  "jSkype/utils/chat/message",
  "jSkype/utils/chat/generator",
  "utils/chat/dateTime",
  "utils/chat/messageSanitizer",
  "utils/common/async",
  "swx-utils-common",
  "telemetry/chat/messageSent",
  "utils/common/logTracer/api"
], function (e) {
  var t = e("lodash-compat"), n = e("swx-i18n").localization, r = e("constants/common"), i = e("swx-enums"), s = e("jSkype/client"), o = e("jcafe-property-model"), u = e("jSkype/models/conversationActivityItem").ContactRequestActivityItem, a = e("jSkype/modelHelpers/personHelper"), f = e("jSkype/modelHelpers/propertyValidator"), l = e("jSkype/services/internalPubSub"), c = e("jSkype/services/serviceAccessLayer/serviceLocator"), h = e("services/serviceLocator"), p = e("jSkype/services/webapi/main"), d = e("jSkype/services/webapi/utils/conversationMetadataStore"), v = e("jSkype/services/systemCommands/main"), m = e("jSkype/services/webapiMapper/conversationDataFilter"), g = e("jSkype/services/webapiMapper/conversationDataHandlers"), y = e("jSkype/services/webapiMapper/conversationLiveStateHandler"), b = e("jSkype/settings"), w = e("jSkype/telemetry/poll"), E = e("jSkype/utils/chat/conversation"), S = e("jSkype/utils/chat/message"), x = e("jSkype/utils/chat/generator"), T = e("utils/chat/dateTime"), N = e("utils/chat/messageSanitizer"), C = e("utils/common/async"), k = e("swx-utils-common").sessionStorage, L = e("telemetry/chat/messageSent"), A = r.isTyping, O = "User", M = 16, _ = r.storageKeys, D = r.events.system, P = r.onlineStates;
  return function (B, j) {
    function V(e) {
      F.isOnline(e === P.ONLINE), B._onlineStateChanged();
    }
    function $() {
      k.set(_.RESURECTION_KEY, "1");
    }
    function J(e) {
      e.eventMessages && W.eventMessages(e.eventMessages), e.actionName === "syncThread" && (z.handleThreadSync(e), y.updateNGCCallState(e.id, e.properties)), e.actionName === "endpointCreation" && q.promise.state() === "pending" && q.resolve();
    }
    function K() {
      var e = l.get();
      e.subscribe("webapi:data", J), e.subscribe(D.FORCE_RESYNC, $), e.subscribe(D.ONLINE_STATE_CHANGED, V);
    }
    function Q(e, t) {
      var n = t.person;
      return {
        id: a.getKey(n.id(), n._type()),
        role: e
      };
    }
    function G() {
      F.addConversationsCollectionTask.promise.state() === "pending" && F.addConversationsCollectionTask.resolve();
    }
    function Y() {
      var n = e("utils/common/logTracer/api");
      return b.isFeatureOn(r.featureFlags.UNREAD_MSG_LOGGING) ? n.getLogger("unread-msgs") : { log: t.noop };
    }
    var F = this, I = o.task(), q = j || o.task(), R, U = Y(), z = g.build(this, B), W = m.build(z), X;
    F.addConversationsCollectionTask = o.task(), F.conversationsManager = B, F.isOnline = o.boolProperty(!0), F.init = function () {
      X = v.get(), F.serviceLocator = c.build(b.settings.webApiServiceHost), F.webAPIService = p.getInstance(F.serviceLocator), K(), F.startPolling(), I.resolve();
    }, F.reset = function () {
      function t() {
        I = o.task(), q = o.task(), R = null, F.addConversationsCollectionTask = o.task(), F.isOnline(!0), k.clear();
      }
      return F.webAPIService ? F.webAPIService.reset().then(t) : (t(), Promise.resolve());
    }, F.createConversation = function (e, n, r) {
      function i(t) {
        e.activeModalities.chat._set(e.leave.enabled()), n(t);
      }
      C.execute(function () {
        var n;
        e.activeModalities.chat._set(!1), n = t.filter(e.participants(), function (e) {
          var t = e.person;
          return !(a.isPstnId(t.id()) && t.id().length > M);
        });
        var s = n.map(Q.bind(null, O));
        s.push(Q("Admin", e.selfParticipant)), F.webAPIService.createConversation(s, i, r);
      }), e.activeModalities.chat._set(!0);
    }, F.syncRecents = function (e, t, n) {
      function r(e) {
        var t = E.getSyncStateFromResponse(e.response);
        G(), R.resolve({
          conversations: e.response.conversations,
          syncState: t,
          hasMoreConversations: !!e.response._metadata.backwardLink,
          statusCode: e.request.status
        }), R = null;
      }
      function i(e) {
        R.reject(e), R = null;
      }
      function s() {
        n ? F.webAPIService.syncRecentsBySyncState(n, t, r, i) : F.webAPIService.syncRecents(e, t, r, i);
      }
      return R ? R.promise : (R = o.task(), q.promise.then(s), R.promise);
    }, F.syncConversation = function (e, t, n) {
      o.task.waitAll([
        I.promise,
        q.promise
      ]).then(function () {
        F.webAPIService.syncConversation(e, t, n);
      });
    }, F.syncThread = function (e, t, n) {
      return t = t || function () {
      }, n = n || function () {
      }, new Promise(function (r, i) {
        function s() {
          t(), r();
        }
        function u(e) {
          n(e), i(e);
        }
        f.isGroupConversation(e) ? o.task.waitAll([
          I.promise,
          q.promise
        ]).then(function () {
          F.webAPIService.syncThread(e, s, u);
        }) : u(new Error("expected valid group conversation id"));
      });
    }, F.sendMessage = function (e, t, n, r, i) {
      function s(t) {
        F.setConsumptionHorizonToMessage(e, n), f.publish(t.request.status), r();
      }
      function o(e) {
        f.publish(e.status), i();
      }
      if (X.executeCommand(n._originalContent || t.content, e))
        return r(), !1;
      var u = x.messageForService(t), a = u.content ? u.content.length : 0, f = L.build(e, n, u.skypeeditedid, a);
      return F.webAPIService.postMessage(e.conversationId, u, s, o), !0;
    }, F.removeAllMessages = function (e, t, n) {
      return F.webAPIService.removeAllMessages(e, t, n);
    }, F.sendMojiMessage = function (e, t, n, i) {
      var s = h.resolve(r.serviceLocator.PES_CONFIG_SERVICE), o = s.getConfiguration(), u = T.getDate(), a = o.itemsRoot + "/" + t, f = a + "/views/thumbnail", l = b.settings.xmmFallbackUrl + "?go=webclient.xmm&amp;" + t, c = {
          messagetype: "RichText/Media_FlikMsg",
          content: "<URIObject type=\"Video.1/Flik.1\" uri=\"" + a + "\" url_thumbnail=\"" + f + "\">" + "To view this Moji, go to: <a href=\"" + l + "\">" + l + "</a>" + "</URIObject>",
          key: String(u.getTime()),
          timestamp: u.getTime(),
          conversationModel: e
        }, p = x.outgoingMojiActivityItem(a, t, c);
      F.sendMessage(e, c, p, n, i);
    }, F.sendPollMessage = function (e, i, o, u) {
      var f = T.getDate().getTime(), l = s.get().personsAndGroupsManager.mePerson, c = JSON.parse(i), h = t.reduce(c.answers, function (e, t) {
          return e += "<Answer value=\"" + N.escapeHTML(t) + "\" />";
        }, ""), p = t.reduce(c.answers, function (e, t) {
          return e += "- " + N.escapeHTML(t) + "\n";
        }, ""), d = N.escapeHTML(N.webify(c.question)), v = b.settings.pollFallbackUrl + "&amp;threadId=" + e.conversationId, m = n.fetch({ key: "poll_fallback_link_text" }), g = n.fetch({
          key: "poll_message_goto_text",
          params: { fallbackLink: "<a href=\"" + v + "\">" + m + "</a>" }
        }), y = "poll.1", E = {
          messagetype: "RichText",
          conversationModel: e,
          content: "<URIObject type=\"" + y + "\">" + "<Title>" + d + "</Title>" + "\n\n" + "<Description>" + p + "</Description>" + "\n" + g + "<Settings>" + "<MultipleChoice value=\"" + c.multipleChoice + "\" />" + "</Settings>" + "<Question value=\"" + d + "\" />" + "<Answers>" + h + "</Answers>" + "</URIObject>",
          key: String(f),
          timestamp: f,
          isMyself: !0,
          author: a.getKey(l.id(), l._type())
        }, S = x.outgoingPollMessageActivityItem(E);
      S.html._set(E.content), F.sendMessage(e, E, S, function () {
        w.sendPoll(S), o();
      }, function () {
        w.error(e.conversationId, undefined, y, r.telemetry.poll.errorType.SEND), u();
      });
    }, F.sendContactInfoMessage = function (e, t, n, r, i) {
      function s(e) {
        var t = "<contacts>";
        return e.forEach(function (e) {
          t += "<c t=\"s\" s=\"" + e.id() + "\" f=\"" + e.displayName() + "\"/>";
        }), t += "</contacts>", t;
      }
      var o = {
        messagetype: "RichText/Contacts",
        content: s(n),
        key: t.key(),
        timestamp: T.getDate().getTime(),
        conversationModel: e
      };
      t.html._set(o.content), F.sendMessage(e, o, t, r, i);
    }, F.sendPhotoSharingMessage = function (e, t, n, r, i, s) {
      var o = b.settings.amdServiceHost + "/v1/objects/" + n, u = o + "/views/imgt1", a = b.settings.xmmFallbackUrl + "?go=webclient.xmm&amp;pic=" + n, f = {
          messagetype: "RichText/UriObject",
          content: "<URIObject type=\"Picture.1\" uri=\"" + o + "\" url_thumbnail=\"" + u + "\">" + "To view this shared photo, go to: <a href=\"" + a + "\">" + a + "</a>" + "<OriginalName v=\"" + r + "\"/>" + "<meta type=\"photo\" originalName=\"" + r + "\"/>" + "</URIObject>",
          key: t.key(),
          timestamp: new Date().getTime()
        };
      t.html._set(f.content), F.sendMessage(e, f, t, i, s);
    }, F.sendFileTransferMessage = function (e, t, n, r, i, s, o) {
      var u = b.settings.amdServiceHost + "/v1/objects/" + n, a = u + "/views/thumbnail", f = b.settings.xmmFallbackUrl + "?go=webclient.xmm&amp;docid=" + n, l = {
          messagetype: "RichText/Media_GenericFile",
          content: "<URIObject type=\"File.1\" uri=\"" + u + "\" url_thumbnail=\"" + a + "\">" + "<Title>Title: " + r + "</Title>" + "<Description> Description: " + r + "</Description>" + "<a href=\"" + f + "\"> " + f + "</a>" + "<OriginalName v=\"" + r + "\"/>" + "<FileSize v=\"" + i + "\"/>" + "</URIObject>",
          key: t.key(),
          timestamp: new Date().getTime()
        };
      t.html._set(l.content), t.fileUri._set(u + "/views/original"), t.fileThumbnailUri._set(u + "/views/thumbnail"), F.sendMessage(e, l, t, s, o);
    }, F.syncMessages = function (e, t, n, r) {
      function i() {
        d.get(e.conversationId) ? F.webAPIService.syncMessagesLoadMore(e.conversationId, t, n, r) : F.webAPIService.syncMessages(e.conversationId, 0, t, n, r);
      }
      F.isOnline.once(!0, function () {
        o.task.waitAll([
          I.promise,
          q.promise
        ]).then(function () {
          e._requestedJoining ? e._requestedJoining.promise.then(function () {
            i();
          }) : i();
        });
      });
    }, F.startPolling = function () {
      F.webAPIService.poll();
    }, F.addParticipant = function (e, t, n, r, i) {
      F.webAPIService.addParticipant(e, t, n, r, i);
    }, F.removeParticipant = function (e, t, n, r) {
      F.webAPIService.removeParticipant(e, t, n, r);
    }, F.joinConversation = function (e, t) {
      var n;
      return e._requestedJoining && e._requestedJoining.promise.state() === "pending" ? Promise.reject(new Error("already joining this conversation")) : (e._requestedJoining = o.task(), I.promise.then(function () {
        function r(t) {
          e._requestedJoining.reject(t);
        }
        n = s.get().personsAndGroupsManager.mePerson, F.addParticipant(e.conversationId, n.id(), i.participantRole.Attendee, function () {
          t ? F.syncThread(e.conversationId).then(function () {
            e._requestedJoining.resolve();
          }, r) : (F.syncThread(e.conversationId), e._requestedJoining.resolve());
        }, r);
      }), e._requestedJoining.promise);
    }, F.setAlerts = function (t, n, r, i, s) {
      function o() {
        i(n && r === "", r);
      }
      function u() {
        F.webAPIService.setConversationOption(t, "alertmatches", r, o, s);
      }
      r || (r = ""), F.webAPIService.setConversationOption(t, "alerts", n && r === "", u, s);
    }, F.setTopic = function (e, t, n, r) {
      F.webAPIService.setThreadOption(e, "topic", t, n, r);
    }, F.joiningEnabled = function (e, t, n, r) {
      F.webAPIService.setThreadOption(e, "joiningenabled", t, n, r);
    }, F.historyDisclosed = function (e, t, n, r) {
      F.webAPIService.setThreadOption(e, "historydisclosed", t, n, r);
    }, F.setConsumptionHorizonToMessage = function (e, t) {
      var n = new Date().getTime(), r, s = e.historyService.activityItems(), o = s[s.length - 1], a = [
          i.activityType.ContactRequestOutgoing,
          i.activityType.ContactRequestOutgoingResend,
          i.activityType.ContactRequestOutgoingAgent
        ], f, l;
      if (s.length === 0) {
        U.log("apiHandler.setConsumptionHorizonToMessage in if messages are empty: ", e.conversationId);
        return;
      }
      if (t === o)
        U.log("apiHandler.setConsumptionHorizonToMessage in if message == lastDisplayedMessage: ", e.conversationId), l = t.timestamp().getTime();
      else if (t._isOriginal && t._isOriginal())
        l = t.timestamp().getTime();
      else {
        var c = e.historyService.activityItems(t.key());
        l = c ? c.timestamp().getTime() : 0;
      }
      f = t && t._id && a.indexOf(t.type()) === -1;
      if (!f || S.isMessageReadOnServer(e._consumptionHorizon, t.key(), l)) {
        U.log("apiHandler.setConsumptionHorizonToMessage in if !isValidMessage: ", e.conversationId);
        return;
      }
      r = t.timestamp().getTime() + ";" + n + ";" + t.key(), e._updateConsumptionHorizon(r), t instanceof u || F.setConsumptionHorizon(e);
    }, F.setConsumptionHorizon = function (e) {
      if (e._consumptionHorizon.lastReadMessageTimestamp === 0)
        return;
      U.log("apiHandler.setConsumptionHorizonToMessage calling webapi: ", e.conversationId);
      var t = e._consumptionHorizon.lastReadMessageTimestamp + ";" + e._consumptionHorizon.modificationTime + ";" + e._consumptionHorizon.lastReadMessageId;
      F.webAPIService.setConsumptionHorizon(e.conversationId, t, function () {
      });
    }, F.getFavorites = function () {
      if (!b.isFeatureOn(r.featureFlags.FAVORITES_CONVERSATION_ENABLED))
        return;
      return F.webAPIService.getFavorites();
    }, F.setFavorites = function (e) {
      if (!b.isFeatureOn(r.featureFlags.FAVORITES_CONVERSATION_ENABLED))
        return;
      return F.webAPIService.setFavorites(e);
    }, F.setIsTyping = function (e, t, n, r) {
      var i = new Date().getTime(), s = {
          clientmessageid: String(i),
          messagetype: t ? A.MESSAGE_TYPE.SET_TYPING : A.MESSAGE_TYPE.CLEAR_TYPING,
          content: "",
          contenttype: "text"
        };
      F.webAPIService.postMessage(e, s, n, r);
    };
  };
})
