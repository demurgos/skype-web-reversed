(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-chat-service/lib/boundary/facade", [
      "require",
      "exports",
      "lodash-compat",
      "swx-constants",
      "jskype-constants",
      "jcafe-property-model",
      "../builders/requestURIBuilder",
      "../constants",
      "../utils/exponentialTimeout",
      "jskype-settings-instance",
      "swx-browser-globals",
      "swx-utils-common"
    ], e);
}(function (e, t) {
  function b(e, t) {
    var n = e.getAllResponseHeaders().toLowerCase();
    return n.indexOf(t) === -1 ? null : e.getResponseHeader(t);
  }
  function w(e) {
    e || (e = "");
    var t = e.match(/^(https?:.+?\.live\.com)/i);
    return t ? t[1] : null;
  }
  function E(e, t) {
    var n = new RegExp("errorCode[\"']?:[\"']?" + t, "i");
    return n.test(e);
  }
  var n = e("lodash-compat"), r = e("swx-constants"), i = e("jskype-constants"), s = e("jcafe-property-model"), o = e("../builders/requestURIBuilder"), u = e("../constants"), a = e("../utils/exponentialTimeout"), f = e("jskype-settings-instance"), l = e("swx-browser-globals"), c = e("swx-utils-common"), h = i.DATA.storageKeys, p = r.COMMON.msnpErrors, d = r.COMMON.httpStatusCodes, v = r.COMMON.events.system, m = r.COMMON.onlineStates, g = r.COMMON.telemetry.performanceMarks, y = [
      "/v1/users/ME/conversations/ALL/properties",
      "/v1/users/ME/conversations/ALL/messages",
      "/v1/users/ME/contacts/ALL",
      "/v1/threads/ALL"
    ], S = function () {
      function e(e, t, i, u, w, S, x, T, N, C, k, L, A, O, M) {
        var D = this;
        this._internal = {
          ANNOTATIONS_RETRY_COUNT: 50,
          ANNOTATIONS_RETRY_TIMEOUT: 200,
          POLLING_DURATION: 5000
        };
        this.canPoll = s.task();
        this.pollingSequenceInitialized = !1;
        this.addContactToContactsList = this.ifEndpointExists(function (e) {
          D.service.addContactToContactsList(e)["catch"](function (t) {
            D.handleRedirection(t, D.addContactToContactsList.bind(D, e));
          });
        });
        this.removeContactFromContactsList = this.ifEndpointExists(function (e) {
          D.service.removeContactFromContactsList(e)["catch"](function (t) {
            D.handleRedirection(t, D.removeContactFromContactsList.bind(D, e));
          });
        });
        this.setMessageProperty = function (e, t, n, r, i, s) {
          var o = 0, u = function (o) {
              D.handleRedirection(o, D.setMessageProperty.bind(D, e, t, n, r, i, s)) || s(o);
            }, a = function () {
              o++;
              o < D._internal.ANNOTATIONS_RETRY_COUNT && (t._actualId ? D.service.setMessageProperty(e, t._actualId, n, r).then(i, u) : setTimeout(a, D._internal.ANNOTATIONS_RETRY_TIMEOUT));
            };
          a();
        };
        this.removeMessageProperty = function (e, t, n, r, i, s) {
          var o = 0, u = function (o) {
              D.handleRedirection(o, D.removeMessageProperty.bind(D, e, t, n, r, i, s)) || s(o);
            }, a = function () {
              o++;
              o < D._internal.ANNOTATIONS_RETRY_COUNT && (t._actualId ? D.service.removeMessageProperty(e, t._actualId, n, r).then(i, u) : setTimeout(a, D._internal.ANNOTATIONS_RETRY_TIMEOUT));
            };
          a();
        };
        this.removeAllMessages = function (e, t, n) {
          var r = D.telemetry.context, i = function (e) {
              r.statusCode = e.response.status;
              t && t();
            }, s = function (i) {
              D.handleRedirection(i, D.removeAllMessages.bind(D, e, t, n)) || n(i);
              r.statusCode = i.status;
            };
          D.service.removeAllMessages(e).then(i, s);
        };
        this.setConversationOption = function (e, t, n, r, i) {
          var s = function (s) {
            D.handleRedirection(s, D.setConversationOption.bind(D, e, t, n, r, i)) || i(s);
          };
          D.service.setConversationOption(e, t, n).then(r, s);
        };
        this.setThreadOption = function (e, t, n, r, i) {
          var s = function (s) {
            D.handleRedirection(s, D.setThreadOption.bind(D, e, t, n, r, i)) || i(s);
          };
          D.service.setThreadOption(e, t, n).then(r, s);
        };
        this.pinUserToDogfoodCloud = function () {
          var e = D.buildDispatcher("pinToDogfood"), t = function (t) {
              e.success(t);
              D.poll();
            }, n = function (t) {
              e.error(t);
              D.handleRedirection(t, D.pinUserToDogfoodCloud);
            };
          D.service.pinToDogfood().then(t, n);
        };
        this.ping = function () {
          var e = D.buildDispatcher("ping");
          D.internalPubSub.publish(v.ONLINE_STATE_CHANGED, m.OFFLINE);
          D.update403DebugData("O");
          D.service.ping().then(function (t) {
            D.update403DebugData("OOK");
            D.internalPubSub.publish(v.ONLINE_STATE_CHANGED, m.ONLINE);
            e.success(t);
            D.poll();
            D.QosReporter.get().reportSuccess("webapi-ping");
          }, function (t) {
            var n = c.sessionStorage.get("chat-4171") || "", i = n.match(/(\d+)x>O$/), s = 1000;
            if (f.isFeatureOn(r.COMMON.featureFlags.ENABLE_PING_ECS_CONFIG)) {
              var o = f.settings.webApiService.pingDelayTime.min || 30, u = f.settings.webApiService.pingDelayTime.max || 60;
              s = D.pickRandomDelay(o * 1000, u * 1000);
            }
            i ? (n = n.replace(/\d+x>O$/, ""), D.update403DebugData(n + (+i[1] + 1) + "x", !0)) : D.update403DebugData("OERR1x");
            e.error(t);
            setTimeout(D.ping, s);
          });
        };
        this.createConversation = function (e, t, n) {
          var r = D.buildDispatcher("createConversation");
          D.usertiming.mark(g.NEW_CONVERSATION.CREATION_START);
          var i = function (e) {
              D.usertiming.mark(g.NEW_CONVERSATION.CREATION_END_OK);
              r.success(e);
              var n = b(e.request, "location"), i = n.match(/threads\/(19:.*)$/)[1];
              t(i);
            }, s = function (i) {
              D.usertiming.mark(g.NEW_CONVERSATION.CREATION_END_ERROR);
              r.error(i);
              D.handleRedirection(i, D.createConversation.bind(D, e, t, n));
              n(i);
            };
          D.service.createConversation(e).then(i, s);
        };
        this.getUserPresence = function (e) {
          var t = D.buildDispatcher("getUserPresence");
          D.service.getUserPresence(e).then(t.success, function (n) {
            t.error(n);
            D.handleRedirection(n, D.getUserPresence.bind(D, e));
          });
        };
        this.setEndpointPresence = function () {
          var e = D.buildDispatcher("setEndpointPresence");
          D.service.setEndpointPresence().then(e.success, function (t) {
            e.error(t);
            D.handleRedirection(t, D.setEndpointPresence);
          });
        };
        this.getEndpointsPresence = function () {
          if (!D.endpointsTelemetry.available())
            return;
          D.service.getEndpointsPresence().then(function (e) {
            if (!e || !e.response)
              return;
            e.response.endpointPresenceDocs && D.endpointsDataProvider.set(e.response.endpointPresenceDocs);
            e.response.publicInfo && D.endpointsDataProvider.set([{ publicInfo: e.response.publicInfo }]);
            D.endpointsTelemetry.publish();
          });
        };
        this.getActiveEndpoints = function () {
          return D.service.getActiveEndpoints();
        };
        this.activateEndpoint = function () {
          D.isEndpointCreated.when(!0, function () {
            var e = D.buildDispatcher("activateEndpoint");
            D.service.activateEndpoint().then(e.success, e.error);
          });
        };
        this._getEndpointId = function () {
          return new Promise(function (e) {
            var t = c.sessionStorage.get(h.ENDPOINT_ID);
            D.cache.get().getItem(h.ENDPOINT_ID).then(function (n) {
              n === t ? e(t) : e();
            });
          });
        };
        this.poll = function () {
          if (D.validatingSkypeToken) {
            a.reset();
            return;
          }
          var e = D.buildDispatcher("endpointCreation"), t = D.buildDispatcher("getSelfProperties"), i = D.buildDispatcher("subscriptionCreation"), s = function (e) {
              i.error(e);
              if (D.handleRedirection(e, D.poll)) {
                D.update403DebugData("SERR404");
                return;
              }
              D.update403DebugData("SERR");
              if (e.status === d.notFound && E(e.response, p.missingEndpoint))
                return;
              a.execute(D.poll);
            }, u = function (e) {
              D.update403DebugData("SOK");
              i.success(e);
              D.setEndpointPresence();
              D.continuallyPoll(b(e.request, "location"));
            }, l = function (e) {
              var t = b(e, "set-registrationtoken");
              t && (D.headerSelector.setRegistrationToken(t), D.storeEndpointId(t));
            }, m = function (t) {
              e.error(t);
              if (n.isObject(t)) {
                l(t);
                if (D.handlePinToDogfoodRedirection(t)) {
                  D.update403DebugData("EERRdf");
                  return;
                }
                var i = t.status === d.unauthorized || t.status === d.forbidden;
                i && D.pollFailedWithAuthErrorCount++;
                if (D.pollFailedWithAuthErrorCount === 2 && D.signInManager.validateState.enabled()) {
                  a.reset();
                  D.validatingSkypeToken = !0;
                  D.signInManager.validateState().then(function () {
                    D.validatingSkypeToken = !1;
                    D.poll();
                  });
                  return;
                }
                if (D.pollFailedWithAuthErrorCount > 2) {
                  D.signInManager.signOut.enabled.once(!0, function () {
                    D.signInManager.signOut({ reason: r.COMMON.api.auth.errorTypes.REAUTH_NEEDED });
                  });
                  return;
                }
                if (D.handleRedirection(t, D.poll)) {
                  D.update403DebugData("EERR404");
                  return;
                }
              }
              D.update403DebugData("EERR");
              a.execute(D.poll);
            }, g = function () {
              var e = D.service.getSelfProperties();
              return e.then(t.success.bind(t), t.error.bind(t)), e;
            }, w = function (t) {
              var n = t.response, i = t.request, p = r.COMMON.telemetry.timelineLoadOrigin, d = D.telemetry.context, m;
              D.pollFailedWithAuthErrorCount = 0;
              l(i);
              D.update403DebugData("EOK");
              a.reset();
              e.success(t);
              m = c.sessionStorage.get(h.RESURECTION_KEY);
              m ? (c.sessionStorage.remove(h.RESURECTION_KEY), d.timelineLoadOrigin = p.RESSURECT) : D.isEndpointCreated() ? d.timelineLoadOrigin = p.RELOAD : d.timelineLoadOrigin = p.LOAD;
              if (!f.settings.isPollingEnabled)
                return;
              f.isFeatureOn(r.COMMON.featureFlags.SUPPORT_MESSAGE_PROPERTIES) && D.enableMessageProperties();
              if (n.subscriptions && n.subscriptions.length > 0) {
                var b = o.customResource("/endpoints/SELF/subscriptions/") + n.subscriptions[0].id;
                g()["finally"](function () {
                  D.continuallyPoll(b);
                });
              } else
                D.pollingSequenceInitialized && D.internalPubSub.publish(v.FORCE_RESYNC), g()["finally"](function () {
                  D.update403DebugData("S");
                  D.service.requestSubscriptionCreation(y).then(u, s);
                });
              D.pollingSequenceInitialized = !0;
              D.getEndpointsPresence();
            }, S = function () {
              var e = "Agent";
              return f.isFeatureOn(r.COMMON.featureFlags.READ_RECEIPT_ENABLED) && (e += ",readReceipts"), { endpointFeatures: e };
            };
          D.update403DebugData("E" + !!c.sessionStorage.get(h.ENDPOINT_ID));
          D._getEndpointId().then(function (e) {
            D.service.requestEndpointCreation(e, S()).then(w, m);
          });
        };
        this.reset = function () {
          D.service.abortCurrentPoll();
          var e = function () {
            D.pollingSequenceInitialized = !1;
          };
          return D.validatingSkypeToken = !1, D.pollFailedWithAuthErrorCount = 0, D.service.requestEndpointRemoval(c.sessionStorage.get(h.ENDPOINT_ID)).then(e, e);
        };
        this.postMessage = function (e, t, n, r) {
          var i = t.clientmessageid;
          D.usertiming.mark(g.IM_SEND.POST_START + i);
          var s = function (e) {
              D.usertiming.mark(g.IM_SEND.POST_END_OK + i);
              n(e);
            }, o = function (s) {
              if (D.handleRedirection(s, D.postMessage.bind(D, e, t, n, r)))
                return;
              D.usertiming.mark(g.IM_SEND.POST_END_ERROR + i);
              r(s);
            };
          D.service.postMessage(e, t).then(s, o);
        };
        this.sendContactsList = function (e) {
          D.service.sendContactsList(e)["catch"](function (t) {
            D.handleRedirection(t, D.sendContactsList.bind(D, e));
          });
        };
        this.addParticipant = function (e, t, n, r, i) {
          D.service.addParticipant(e, t, n).then(r, function (s) {
            D.handleRedirection(s, D.addParticipant.bind(D, e, t, n, r, i)) || typeof i == "function" && i(s);
          });
        };
        this.removeParticipant = function (e, t, n, r) {
          D.service.removeParticipant(e, t).then(n, function (i) {
            D.handleRedirection(i, D.removeParticipant.bind(D, e, t, n, r)) || r(i);
          });
        };
        this.setConsumptionHorizon = function (e, t, n) {
          var r = D.buildDispatcher("setConsumptionHorizon"), i = function (e) {
              n && n(e);
              r.success(e);
            }, s = function (n) {
              r.error(n);
              D.handleRedirection(n, D.setConsumptionHorizon.bind(D, e, t));
            };
          D.service.setConsumptionHorizon(e, t).then(i, s);
        };
        this.setIsFavorite = function (e, t, n, r) {
          var i = D.buildDispatcher("setIsFavorite"), s = function (e) {
              i.success(e);
              n(e);
            }, o = function (s) {
              D.handleRedirection(s, D.setIsFavorite.bind(D, e, t, n, r)) || (i.error(s), r(s));
            };
          D.service.setIsFavorite(e, t).then(s, o);
        };
        this.setUserPresence = function (e) {
          var t = D.buildDispatcher("setUserPresence"), n = function (n) {
              t.error(n);
              D.handleRedirection(n, D.setUserPresence.bind(D, e));
            };
          D.service.setUserPresence(e).then(t.success, n);
        };
        this.syncMessages = function (e, t, n, r, i) {
          var s = D.buildDispatcher("syncMessages"), o = D.telemetry.context;
          o.chatHistoryLoadResult[e] = d.OK;
          var u = function (t) {
              var n = D.handlers.buildMessageSuccess(e, r, D.syncStateRetriever);
              D.readyToPoll();
              n(t);
            }, a = function (u) {
              o.chatHistoryLoadResult[e] = u.status;
              var a = D.handleRedirection(u, D.syncMessages.bind(D, e, t, n, r, i));
              a ? o.isChatHistoryLoad404 = !0 : (s.error(u), i && i());
            };
          D.service.fetchMessages(e, t, n).then(u, a);
        };
        this.syncMessagesLoadMore = function (e, t, n, r) {
          var i = D.buildDispatcher("syncMessagesLoadMore"), s = function (t) {
              var r = D.handlers.buildMessageSuccess(e, n, D.syncStateRetriever);
              r(t);
            }, o = function (s) {
              var o = D.handleRedirection(s, D.syncMessagesLoadMore.bind(D, e, t, n, r));
              o || (i.error(s), r(s));
            };
          D.service.fetchMessagesLoadMore(e, t).then(s, o);
        };
        this.syncRecents = function (e, t, n, r) {
          var i = function (e) {
              n(e);
              D.readyToPoll();
            }, s = function (i) {
              var s = D.handleRedirection(i, D.syncRecents.bind(D, e, t, n, r));
              s || r(i);
            };
          D.service.fetchConversations(e, t).then(i, s);
        };
        this.syncRecentsBySyncState = function (e, t, n, i) {
          var s = function (e) {
              n(e);
              f.isFeatureOn(r.COMMON.featureFlags.DISABLE_POLLING_ON_KAHUNA) || D.readyToPoll();
            }, o = function (r) {
              var s = D.handleRedirection(r, D.syncRecentsBySyncState.bind(D, e, t, n, i));
              s || i(r);
            };
          D.service.fetchConversationsBySyncState(e, t).then(s, o);
        };
        this.syncConversation = function (e, t, n) {
          var r = function (e) {
              t(e);
              D.readyToPoll();
            }, i = function (r) {
              var i = D.handleRedirection(r, D.syncConversation.bind(D, e, t, n));
              i || n(r);
            };
          D.service.fetchConversation(e).then(r, i);
        };
        this.syncThread = function (e, t, n) {
          var r = D.buildDispatcher("syncThread");
          t = t || function () {
            return;
          };
          n = n || function () {
            return;
          };
          var i = function (e) {
              r.success(e);
              t();
              D.readyToPoll();
            }, s = function (i) {
              var s = D.handleRedirection(i, D.syncThread.bind(D, e, t, n));
              s || (r.error(i), n(i));
            };
          D.service.fetchThread(e).then(i, s);
        };
        this.standbyMode = u;
        this.telemetry = w;
        this.buildDispatcher = e;
        this.handlers = t;
        this.service = i;
        this.headerSelector = S;
        this.cache = x;
        this.usertiming = T;
        this.internalPubSub = N;
        this.QosReporter = C;
        this.endpointsTelemetry = k;
        this.endpointsDataProvider = L;
        this.analytics = A;
        this.syncStateRetriever = O;
        this.signInManager = M;
        this.validatingSkypeToken = !1;
        this.pollFailedWithAuthErrorCount = 0;
        this.whenActivePromise = new Promise(function (e) {
          D.standbyMode.once(!1, e);
        });
        l.getWindow().Skype && l.getWindow().Skype.isElectron && l.getWindow().Skype.Shell && (l.getWindow().Skype.Shell.clearChatServiceToken = this.headerSelector.clearRegistrationToken);
        this.isEndpointCreated = s.property({ value: !!c.sessionStorage.get(h.ENDPOINT_ID) });
        this.endpointsDataProvider.setup(this.getActiveEndpoints);
      }
      return e.prototype.ifEndpointExists = function (e) {
        return function () {
          c.sessionStorage.get(h.ENDPOINT_ID) !== null && e.apply(this, arguments);
        };
      }, e.prototype.storeEndpointId = function (e) {
        var t = new RegExp(h.ENDPOINT_ID + "=({.+})"), n = e && e.match(t), r;
        n && (r = n[1], c.sessionStorage.set(h.ENDPOINT_ID, r), this.cache.get().setItem(h.ENDPOINT_ID, r), this.isEndpointCreated(!0));
      }, e.prototype.readyToPoll = function () {
        this.canPoll.promise.state() === "pending" && this.canPoll.resolve();
      }, e.prototype.update403DebugData = function (e, t) {
        var n = "chat-4171", r;
        t ? c.sessionStorage.set(n, e) : (r = c.sessionStorage.get(n), c.sessionStorage.set(n, r + ">" + e));
      }, e.prototype.handleRedirection = function (e, t) {
        var n = e.status === d.notFound && E(e.response, p.redirectionOverride), r = e.status === d.unauthorized, i = e.status === d.forbidden, s;
        return (r || i) && this.headerSelector.clearRegistrationToken(), n ? (s = w(b(e, "location")), s ? (this.service.updateServiceDomain(s), t(), !0) : !1) : !1;
      }, e.prototype.handlePinToDogfoodRedirection = function (e) {
        if (!f.isFeatureOn(r.COMMON.featureFlags.PINNING_TO_DOGFOOD_CLOUD))
          return !1;
        var t = /https:\/\/.*?-?df-/i, n = t.test(w(e.responseURL)), i = w(b(e, "location")), s = t.test(i), o = e.status === d.notFound && n && !s;
        return o && (this.service.updateServiceDomain(i), this.pinUserToDogfoodCloud()), o;
      }, e.prototype.continuallyPoll = function (e) {
        var t = this, n = this.buildDispatcher("polling"), r = function (r) {
            var i = c.sessionStorage.get("chat-4171"), s = i && i.match(/(\d+)x>P$/), o = Date.now() - t.pollStartTime.getTime();
            s ? (i = i.replace(/\d+x>P$/, ""), t.update403DebugData(i + (+s[1] + 1) + "x", !0)) : t.update403DebugData("POK1x");
            n.success(r);
            if (t.standbyMode() && (t.enteredStandbyMode || o > t._internal.POLLING_DURATION)) {
              var u = f.settings.webApiService.standbyPollingDelayTime.min || 30, a = f.settings.webApiService.standbyPollingDelayTime.max || 60, l = t.pickRandomDelay(u, a), h = new Promise(function (e) {
                  setTimeout(e, l * 1000);
                });
              t.analytics.publish();
              Promise.race([
                t.whenActivePromise,
                h
              ]).then(function () {
                t.continuallyPoll(e);
              });
              t.enteredStandbyMode = !0;
            } else
              t.continuallyPoll(e);
          }, i = function (e) {
            n.error(e);
            if (t.handleRedirection(e, t.poll)) {
              t.update403DebugData("PERR404");
              return;
            }
            e.status === 0 ? (t.update403DebugData("PERR0"), t.ping()) : (t.update403DebugData("PERR"), t.poll());
          };
        this.canPoll.promise.then(function () {
          t.update403DebugData("P");
          t.pollStartTime = new Date();
          t.service.requestPolling(e).then(r, i);
        });
      }, e.prototype.enableMessageProperties = function () {
        this.service.setEndpointProperty(u.ENDPOINT_PROPERTIES.SUPPORTS_MESSAGE_PROPERTIES, !0);
      }, e.prototype.pickRandomDelay = function (e, t) {
        return Math.floor(Math.random() * Math.abs(t - e) + e);
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = S;
}));
