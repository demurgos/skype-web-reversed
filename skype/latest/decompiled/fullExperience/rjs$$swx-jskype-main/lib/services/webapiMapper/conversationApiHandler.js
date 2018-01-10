(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/webapiMapper/conversationApiHandler", [
      "require",
      "exports",
      "lodash-compat",
      "swx-i18n",
      "swx-constants",
      "swx-enums",
      "swx-jskype-internal-application-instance",
      "jcafe-property-model",
      "../../../lib/models/conversationActivityItem",
      "../../../lib/modelHelpers/propertyValidator",
      "../../../lib/services/internalPubSub",
      "swx-xhr-dispatcher",
      "../../../lib/services/serviceAccessLayer/decorations/reporting",
      "../../../lib/services/webapi/main",
      "swx-chat-service",
      "swx-mri",
      "../../../lib/services/systemCommands/main",
      "../../../lib/services/webapiMapper/conversationDataFilter",
      "../../../lib/services/webapiMapper/conversationDataHandlers",
      "../../../lib/services/webapiMapper/conversationLiveStateHandler",
      "jskype-settings-instance",
      "../../../lib/telemetry/poll",
      "../../../lib/utils/chat/conversation",
      "../../../lib/utils/chat/message",
      "../../../lib/utils/chat/generator",
      "swx-utils-chat",
      "swx-utils-chat",
      "swx-utils-common",
      "swx-utils-common",
      "../../../lib/telemetry/messageSent",
      "swx-log-tracer",
      "../../utils/chat/endpointsDataProvider"
    ], e);
}(function (e, t) {
  function I() {
    return w.isFeatureOn(i.COMMON.featureFlags.UNREAD_MSG_LOGGING) ? O.getLogger("unread-msgs") : { log: n.noop };
  }
  var n = e("lodash-compat"), r = e("swx-i18n"), i = e("swx-constants"), s = e("swx-enums"), o = e("swx-jskype-internal-application-instance"), u = e("jcafe-property-model"), a = e("../../../lib/models/conversationActivityItem"), f = e("../../../lib/modelHelpers/propertyValidator"), l = e("../../../lib/services/internalPubSub"), c = e("swx-xhr-dispatcher"), h = e("../../../lib/services/serviceAccessLayer/decorations/reporting"), p = e("../../../lib/services/webapi/main"), d = e("swx-chat-service"), v = e("swx-mri"), m = e("../../../lib/services/systemCommands/main"), g = e("../../../lib/services/webapiMapper/conversationDataFilter"), y = e("../../../lib/services/webapiMapper/conversationDataHandlers"), b = e("../../../lib/services/webapiMapper/conversationLiveStateHandler"), w = e("jskype-settings-instance"), E = e("../../../lib/telemetry/poll"), S = e("../../../lib/utils/chat/conversation"), x = e("../../../lib/utils/chat/message"), T = e("../../../lib/utils/chat/generator"), N = e("swx-utils-chat"), C = e("swx-utils-chat"), k = e("swx-utils-common"), L = e("swx-utils-common"), A = e("../../../lib/telemetry/messageSent"), O = e("swx-log-tracer"), M = e("../../utils/chat/endpointsDataProvider"), _ = d.utils.conversationMetadataStore, D = i.COMMON.isTyping, P = "User", H = 16, B = i.COMMON.storageKeys, j = i.COMMON.events.system, F = i.COMMON.onlineStates, q = function () {
      function e(e, t) {
        var l = this;
        this.initializeTask = u.task();
        this.unreadMessagesLogger = I();
        this.queueForMessages = [];
        this.queuePendingState = !1;
        this.addConversationsCollectionTask = u.task();
        this.isOnline = u.boolProperty(!0);
        this.init = function () {
          l.systemCommandsService = m.get();
          l.xhrDispatcher = c.build({
            host: w.settings.webApiServiceHost,
            decorations: [h]
          });
          l.webAPIService = p.getInstance(l.xhrDispatcher);
          l.bindDataEvents();
          l.startPolling();
          l.initializeTask.resolve();
        };
        this.reset = function () {
          var e = function () {
            l.initializeTask = u.task();
            l.createEndpointTask = u.task();
            l.syncRecentsTask = null;
            l.addConversationsCollectionTask = u.task();
            l.isOnline(!0);
            L.sessionStorage.clear();
          };
          return l.webAPIService ? l.webAPIService.reset().then(e) : (e(), Promise.resolve());
        };
        this.createConversation = function (e, t, r) {
          var i = function (n) {
            e.activeModalities.chat._set(e.leave.enabled());
            t(n);
          };
          k.async.execute(function () {
            e.activeModalities.chat._set(!1);
            var t = n.filter(e.participants(), function (e) {
                var t = e.person;
                return !(v.isPstnId(t.id()) && t.id().length > H);
              }), s = t.map(l.participantToMember.bind(l, P));
            s.push(l.participantToMember("Admin", e.selfParticipant));
            l.webAPIService.createConversation(s, i, r);
          });
          e.activeModalities.chat._set(!0);
        };
        this.syncRecents = function (e, t, n) {
          if (l.syncRecentsTask)
            return l.syncRecentsTask.promise;
          l.syncRecentsTask = u.task();
          var r = function (e) {
              var t = S.getSyncStateFromResponse(e.response);
              l.conversationsCollectionAdded();
              l.syncRecentsTask.resolve({
                conversations: e.response.conversations,
                syncState: t,
                hasMoreConversations: !!e.response._metadata.backwardLink,
                statusCode: e.request.status
              });
              l.syncRecentsTask = null;
            }, i = function (e) {
              l.syncRecentsTask.reject(e);
              l.syncRecentsTask = null;
            }, s = function () {
              n ? l.webAPIService.syncRecentsBySyncState(n, t, r, i) : l.webAPIService.syncRecents(e, t, r, i);
            };
          return l.createEndpointTask.promise.then(s), l.syncRecentsTask.promise;
        };
        this.syncConversation = function (e, t, n) {
          u.task.waitAll([
            l.initializeTask.promise,
            l.createEndpointTask.promise
          ]).then(function () {
            l.webAPIService.syncConversation(e, t, n);
          });
        };
        this.syncThread = function (e, t, n) {
          return t = t || function () {
          }, n = n || function () {
          }, new Promise(function (r, i) {
            var s = function () {
                t();
                r();
              }, o = function (e) {
                n(e);
                i(e);
              };
            f.isGroupConversation(e) ? u.task.waitAll([
              l.initializeTask.promise,
              l.createEndpointTask.promise
            ]).then(function () {
              l.webAPIService.syncThread(e, s, o);
            }) : o(new Error("expected valid group conversation id"));
          });
        };
        this.sendMessage = function (e, t, r, i, s) {
          var o = function (t) {
              var n = t.response.OriginalArrivalTime;
              r.timestamp._set(new Date(n));
              var s = r.isEdited && r.isEdited(), o = r.isDeleted && r.isDeleted();
              !s && !o && l.setConsumptionHorizonToMessage(e, r);
              p.publish(t.request.status);
              a();
              i();
            }, u = function (e) {
              p.publish(e.status);
              a();
              s();
            }, a = function () {
              var e = l.queueForMessages.shift();
              e ? e() : l.queuePendingState = !1;
            }, f = function () {
              l.webAPIService.postMessage(e.conversationId, c, o, u);
            };
          if (l.systemCommandsService.executeCommand(r._originalContent || t.content, e))
            return i(), !1;
          var c = T.messageForService(t), h = c.content ? c.content.length : 0, p = A.build(e, r, c.skypeeditedid, h);
          return n.isEmpty(l.queueForMessages) && !l.queuePendingState ? (f(), l.queuePendingState = !0) : l.queueForMessages.push(f), !0;
        };
        this.removeAllMessages = function (e, t, n) {
          return l.webAPIService.removeAllMessages(e, t, n);
        };
        this.sendMojiMessage = function (e, t, n, r) {
          var i = N.dateTime.getDate(), s = t + "/views/thumbnail", o = /\/([^\/]+)$/.exec(t)[1], u = w.settings.xmmFallbackUrl + "?go=webclient.xmm&amp;" + o, a = {
              messagetype: "RichText/Media_FlikMsg",
              content: "<URIObject type=\"Video.1/Flik.1\" uri=\"" + t + "\" url_thumbnail=\"" + s + "\">" + "To view this Moji, go to: <a href=\"" + u + "\">" + u + "</a>" + "</URIObject>",
              key: String(i.getTime()),
              timestamp: i.getTime(),
              conversationModel: e
            }, f = T.outgoingMojiActivityItem(t, a);
          l.sendMessage(e, a, f, n, r);
        };
        this.sendPollMessage = function (e, t, s, u) {
          var a = N.dateTime.getDate().getTime(), f = o.get().personsAndGroupsManager.mePerson, c = JSON.parse(t), h = n.reduce(c.answers, function (e, t) {
              return e += "<Answer value=\"" + C.messageSanitizer.escapeHTML(t) + "\" />";
            }, ""), p = n.reduce(c.answers, function (e, t) {
              return e += "- " + C.messageSanitizer.escapeHTML(t) + "\n";
            }, ""), d = C.messageSanitizer.escapeHTML(C.messageSanitizer.webify(c.question)), m = w.settings.pollFallbackUrl + "&amp;threadId=" + e.conversationId, g = r.localization.fetch({ key: "poll_fallback_link_text" }), y = r.localization.fetch({
              key: "poll_message_goto_text",
              params: { fallbackLink: "<a href=\"" + m + "\">" + g + "</a>" }
            }), b = "poll.1", S = {
              messagetype: "RichText",
              conversationModel: e,
              content: "<URIObject type=\"" + b + "\">" + "<Title>" + d + "</Title>" + "\n\n" + "<Description>" + p + "</Description>" + "\n" + y + "<Settings>" + "<MultipleChoice value=\"" + c.multipleChoice + "\" />" + "</Settings>" + "<Question value=\"" + d + "\" />" + "<Answers>" + h + "</Answers>" + "</URIObject>",
              key: String(a),
              timestamp: a,
              isMyself: !0,
              author: v.getKey(f.id(), f._type())
            }, x = T.outgoingPollMessageActivityItem(S);
          x.html._set(S.content);
          l.sendMessage(e, S, x, function () {
            E.sendPoll(x);
            s();
          }, function () {
            E.error(e.conversationId, undefined, b, i.COMMON.telemetry.poll.errorType.SEND);
            u();
          });
        };
        this.sendContactInfoMessage = function (e, t, n, r, i) {
          var s = function (e) {
              var t = "<contacts>";
              return e.forEach(function (e) {
                t += "<c t=\"s\" s=\"" + e.id() + "\" f=\"" + e.displayName() + "\"/>";
              }), t += "</contacts>", t;
            }, o = {
              messagetype: "RichText/Contacts",
              content: s(n),
              key: t.key(),
              timestamp: N.dateTime.getDate().getTime(),
              conversationModel: e
            };
          t.html._set(o.content);
          l.sendMessage(e, o, t, r, i);
        };
        this.sendPhotoSharingMessage = function (e, t, n, r, i, s) {
          var o = w.settings.amdServiceHost + "/v1/objects/" + n, u = o + "/views/imgt1", a = w.settings.xmmFallbackUrl + "?go=webclient.xmm&amp;pic=" + n, f = {
              messagetype: "RichText/UriObject",
              content: "<URIObject type=\"Picture.1\" uri=\"" + o + "\" url_thumbnail=\"" + u + "\">" + "To view this shared photo, go to: <a href=\"" + a + "\">" + a + "</a>" + "<OriginalName v=\"" + r + "\"/>" + "<meta type=\"photo\" originalName=\"" + r + "\"/>" + "</URIObject>",
              key: t.key(),
              timestamp: new Date().getTime()
            };
          t.html._set(f.content);
          l.sendMessage(e, f, t, i, s);
        };
        this.sendFileTransferMessage = function (e, t, n, r, i, s, o) {
          var u = w.settings.amdServiceHost + "/v1/objects/" + n, a = u + "/views/thumbnail", f = w.settings.xmmFallbackUrl + "?go=webclient.xmm&amp;docid=" + n, c = {
              messagetype: "RichText/Media_GenericFile",
              content: "<URIObject type=\"File.1\" uri=\"" + u + "\" url_thumbnail=\"" + a + "\">" + "<Title>Title: " + r + "</Title>" + "<Description> Description: " + r + "</Description>" + "<a href=\"" + f + "\"> " + f + "</a>" + "<OriginalName v=\"" + r + "\"/>" + "<FileSize v=\"" + i + "\"/>" + "</URIObject>",
              key: t.key(),
              timestamp: new Date().getTime()
            };
          t.html._set(c.content);
          t.fileUri._set(u + "/views/original");
          t.fileThumbnailUri._set(u + "/views/thumbnail");
          l.sendMessage(e, c, t, s, o);
        };
        this.syncMessages = function (e, t, n, r) {
          var i = function () {
            _.get(e.conversationId) ? l.webAPIService.syncMessagesLoadMore(e.conversationId, t, n, r) : l.webAPIService.syncMessages(e.conversationId, 0, t, n, r);
          };
          l.isOnline.once(!0, function () {
            u.task.waitAll([
              l.initializeTask.promise,
              l.createEndpointTask.promise
            ]).then(function () {
              e._requestedJoining ? e._requestedJoining.promise.then(function () {
                i();
              }) : i();
            });
          });
        };
        this.startPolling = function () {
          l.webAPIService.poll();
        };
        this.addParticipant = function (e, t, n, r, i) {
          l.webAPIService.addParticipant(e, t, n, r, i);
        };
        this.removeParticipant = function (e, t, n, r) {
          l.webAPIService.removeParticipant(e, t, n, r);
        };
        this.joinConversation = function (e, t) {
          return e._requestedJoining && e._requestedJoining.promise.state() === "pending" ? Promise.reject(new Error("already joining this conversation")) : (e._requestedJoining = u.task(), l.initializeTask.promise.then(function () {
            var n = o.get().personsAndGroupsManager.mePerson, r = function (t) {
                t instanceof XMLHttpRequest && (t = new Error("while joining " + e.conversationId + ": " + t.response));
                e._requestedJoining.reject(t);
              }, i = function () {
                t ? l.syncThread(e.conversationId).then(function () {
                  e._requestedJoining.resolve();
                }, r) : (l.syncThread(e.conversationId), e._requestedJoining.resolve());
              };
            l.addParticipant(e.conversationId, v.getKey(n.id(), n._type()), s.participantRole.Attendee, i, r);
          }), e._requestedJoining.promise);
        };
        this.setAlerts = function (e, t, n, r, i) {
          var s = function () {
              r(t && n === "", n);
            }, o = function () {
              l.webAPIService.setConversationOption(e, "alertmatches", n, s, i);
            };
          n || (n = "");
          l.webAPIService.setConversationOption(e, "alerts", t && n === "", o, i);
        };
        this.setTopic = function (e, t, n, r) {
          l.webAPIService.setThreadOption(e, "topic", t, n, r);
        };
        this.setAvatar = function (e, t, n, r) {
          l.webAPIService.setThreadOption(e, "picture", t, n, r);
        };
        this.joiningEnabled = function (e, t, n, r) {
          l.webAPIService.setThreadOption(e, "joiningenabled", t, n, r);
        };
        this.historyDisclosed = function (e, t, n, r) {
          l.webAPIService.setThreadOption(e, "historydisclosed", t, n, r);
        };
        this.setConsumptionHorizonToMessage = function (e, t) {
          var n = new Date().getTime(), r = e.historyService.activityItems(), i = r[r.length - 1], o = [
              s.activityType.ContactRequestOutgoing,
              s.activityType.ContactRequestOutgoingResend,
              s.activityType.ContactRequestOutgoingAgent
            ], u;
          if (r.length === 0) {
            l.unreadMessagesLogger.log("apiHandler.setConsumptionHorizonToMessage in if messages are empty: ", e.conversationId);
            return;
          }
          if (t === i)
            l.unreadMessagesLogger.log("apiHandler.setConsumptionHorizonToMessage in if message == lastDisplayedMessage: ", e.conversationId), u = t.timestamp().getTime();
          else if (t._isOriginal && t._isOriginal())
            u = t.timestamp().getTime();
          else {
            var f = e.historyService.activityItems(t.key());
            u = f ? f.timestamp().getTime() : 0;
          }
          var c = t && t._id && o.indexOf(t.type()) === -1;
          if (!c || x.isMessageReadOnServer(e._consumptionHorizon, t.key(), u)) {
            l.unreadMessagesLogger.log("apiHandler.setConsumptionHorizonToMessage in if !isValidMessage: ", e.conversationId);
            return;
          }
          var h = u + ";" + n + ";" + t.key();
          e._updateConsumptionHorizon(h);
          t instanceof a.ContactRequestActivityItem || l.setConsumptionHorizon(e);
        };
        this.setConsumptionHorizon = function (e) {
          if (e._consumptionHorizon.lastReadMessageTimestamp === 0)
            return;
          l.unreadMessagesLogger.log("apiHandler.setConsumptionHorizonToMessage calling webapi: ", e.conversationId);
          var t = e._consumptionHorizon.lastReadMessageTimestamp + ";" + e._consumptionHorizon.modificationTime + ";" + e._consumptionHorizon.lastReadMessageId;
          l.webAPIService.setConsumptionHorizon(e.conversationId, t, function () {
          });
        };
        this.setIsFavorite = function (e, t, n, r) {
          return l.webAPIService.setIsFavorite(e, t, n, r);
        };
        this.setIsTyping = function (e, t, n, r) {
          var i = new Date().getTime(), s = {
              clientmessageid: String(i),
              messagetype: t ? D.MESSAGE_TYPE.SET_TYPING : D.MESSAGE_TYPE.CLEAR_TYPING,
              content: "",
              contenttype: "text"
            };
          l.webAPIService.postMessage(e, s, n, r);
        };
        this.conversationsManager = e;
        this.createEndpointTask = t || u.task();
        this.dataHandler = y.build(this, e);
        this.filter = g.build(this.dataHandler);
      }
      return e.prototype.onOnlineStateChanged = function (e) {
        this.isOnline(e === F.ONLINE);
        this.conversationsManager._onlineStateChanged();
      }, e.prototype.resyncAll = function () {
        L.sessionStorage.set(B.RESURECTION_KEY, "1");
      }, e.prototype.onWebAPIDataReceived = function (e) {
        e.eventMessages && (M.startingUpdate(), this.filter.eventMessages(e.eventMessages));
        e.actionName === "syncThread" && (this.dataHandler.handleThreadSync(e), b.updateNGCCallState(e.id, e.properties));
        e.actionName === "endpointCreation" && this.createEndpointTask.promise.state() === "pending" && this.createEndpointTask.resolve();
      }, e.prototype.bindDataEvents = function () {
        var e = l.get();
        e.subscribe("webapi:data", this.onWebAPIDataReceived.bind(this));
        e.subscribe(j.FORCE_RESYNC, this.resyncAll.bind(this));
        e.subscribe(j.ONLINE_STATE_CHANGED, this.onOnlineStateChanged.bind(this));
      }, e.prototype.participantToMember = function (e, t) {
        return {
          id: v.getKey(t.person.id(), t.person._type()),
          role: e
        };
      }, e.prototype.conversationsCollectionAdded = function () {
        this.addConversationsCollectionTask.promise.state() === "pending" && this.addConversationsCollectionTask.resolve();
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = q;
}));
