define("jSkype/services/webapi/boundary/facade", [
  "require",
  "lodash-compat",
  "usertiming",
  "constants/common",
  "jSkype/client",
  "jSkype/constants/data",
  "jcafe-property-model",
  "jSkype/services/internalPubSub",
  "jSkype/services/webapi/builders/requestURIBuilder",
  "jSkype/services/webapi/builders/headerSelector",
  "jSkype/services/webapi/constants",
  "jSkype/services/webapi/utils/exponentialTimeout",
  "jSkype/settings",
  "jSkype/services/serviceAccessLayer/serviceQosReporterFacade",
  "swx-utils-common",
  "utils/common/cache/instance"
], function (e) {
  function S(e, t) {
    var n = e.getAllResponseHeaders().toLowerCase();
    return n.indexOf(t) === -1 ? null : e.getResponseHeader(t);
  }
  function x(e) {
    e = e || "";
    var t = e.match(/^(https?:.+?\.live\.com)/i);
    return t ? t[1] : null;
  }
  function T(e, t) {
    var n = new RegExp("errorCode[\"']?:[\"']?" + t, "i");
    return n.test(e);
  }
  var t = e("lodash-compat"), n = e("usertiming"), r = e("constants/common"), i = e("jSkype/client"), s = e("jSkype/constants/data").storageKeys, o = e("jcafe-property-model"), u = e("jSkype/services/internalPubSub"), a = e("jSkype/services/webapi/builders/requestURIBuilder"), f = e("jSkype/services/webapi/builders/headerSelector"), l = e("jSkype/services/webapi/constants"), c = e("jSkype/services/webapi/utils/exponentialTimeout"), h = e("jSkype/settings"), p = e("jSkype/services/serviceAccessLayer/serviceQosReporterFacade"), d = e("swx-utils-common").sessionStorage, v = e("utils/common/cache/instance"), m = r.msnpErrors, g = r.httpStatusCodes, y = r.events.system, b = r.onlineStates, w = r.telemetry.performanceMarks, E = [
      "/v1/users/ME/conversations/ALL/properties",
      "/v1/users/ME/conversations/ALL/messages",
      "/v1/users/ME/contacts/ALL",
      "/v1/threads/ALL"
    ];
  return function (N, C, k) {
    function D(e) {
      return function () {
        d.get(s.ENDPOINT_ID) !== null && e.apply(L, arguments);
      };
    }
    function j(e) {
      var t, n = new RegExp(s.ENDPOINT_ID + "=({.+})"), r = e && e.match(n);
      r && (t = r[1], d.set(s.ENDPOINT_ID, t), v.get().setItem(s.ENDPOINT_ID, t), P(!0));
    }
    function F() {
      A.promise.state() === "pending" && A.resolve();
    }
    function I(e, t) {
      var n = "chat-4171", r;
      t ? d.set(n, e) : (r = d.get(n), d.set(n, r + ">" + e));
    }
    function q(e, t, r) {
      var i = e.status === g.notFound && T(e.response, m.redirectionOverride), s;
      return i ? (s = x(S(e, "location")), s ? (r && n.mark(r), k.updateServiceDomain(s), t(), !0) : !1) : !1;
    }
    function R(e) {
      if (!h.isFeatureOn(r.featureFlags.PINNING_TO_DOGFOOD_CLOUD))
        return !1;
      var t = /https:\/\/.*?-?df-/i, n = t.test(x(e.responseURL)), i = x(S(e, "location")), s = t.test(i), o = e.status === g.notFound && n && !s;
      return o && (k.updateServiceDomain(i), L.pinUserToDogfoodCloud()), o;
    }
    function U(e) {
      function n(n) {
        var r = d.get("chat-4171"), s = r.match(/(\d+)x>P$/), o = new Date() - H;
        s ? (r = r.replace(/\d+x>P$/, ""), I(r + (+s[1] + 1) + "x", !0)) : I("POK1x");
        t.success(n);
        if (i.get()._standbyMode() && (B || o > L._internal.POLLING_DURATION)) {
          var u = h.settings.webApiService.standbyPollingDelayTime.min || 30, a = h.settings.webApiService.standbyPollingDelayTime.max || 60, f = W(u, a), l = new Promise(function (e) {
              setTimeout(e, f * 1000);
            });
          Promise.race([
            M,
            l
          ]).then(U.bind(null, e));
          B = !0;
        } else
          U(e);
      }
      function r(e) {
        t.error(e);
        if (q(e, L.poll)) {
          I("PERR404");
          return;
        }
        e.status === 0 ? (I("PERR0"), L.ping()) : (I("PERR"), L.poll());
      }
      var t = N("polling");
      A.promise.then(function () {
        I("P");
        H = new Date();
        k.requestPolling(e).then(n, r);
      });
    }
    function z() {
      k.setEndpointProperty(l.ENDPOINT_PROPERTIES.SUPPORTS_MESSAGE_PROPERTIES, !0);
    }
    function W(e, t) {
      return Math.floor(Math.random() * Math.abs(t - e) + e);
    }
    var L = this, A = o.task(), O = !1, M = new Promise(function (e) {
        i.get()._standbyMode.once(!1, e);
      }), P = o.property({ value: !!d.get(s.ENDPOINT_ID) }), H, B;
    this._internal = {
      ANNOTATIONS_RETRY_COUNT: 50,
      ANNOTATIONS_RETRY_TIMEOUT: 200,
      POLLING_DURATION: 5000
    };
    this.setMessageProperty = function (e, t, n, r, i, s) {
      function o(o) {
        q(o, L.setMessageProperty.bind(L, e, t, n, r, i, s)) || s(o);
      }
      function a() {
        u++;
        u < L._internal.ANNOTATIONS_RETRY_COUNT && (t._actualId ? k.setMessageProperty(e, t._actualId, n, r).then(i, o) : setTimeout(a, L._internal.ANNOTATIONS_RETRY_TIMEOUT));
      }
      var u = 0;
      a();
    };
    this.removeMessageProperty = function (e, t, n, r, i, s) {
      function o(o) {
        q(o, L.removeMessageProperty.bind(L, e, t, n, r, i, s)) || s(o);
      }
      function a() {
        u++;
        u < L._internal.ANNOTATIONS_RETRY_COUNT && (t._actualId ? k.removeMessageProperty(e, t._actualId, n, r).then(i, o) : setTimeout(a, L._internal.ANNOTATIONS_RETRY_TIMEOUT));
      }
      var u = 0;
      a();
    };
    this.removeAllMessages = function (e, t, n) {
      function s(e) {
        r.statusCode = e.response.status;
        t && t();
      }
      function o(i) {
        q(i, L.removeAllMessages.bind(L, e, t, n)) || n(i);
        r.statusCode = i.status;
      }
      var r = i.get()._telemetry.context;
      k.removeAllMessages(e).then(s, o);
    };
    this.setConversationOption = function (e, t, n, r, i) {
      function s(s) {
        q(s, L.setConversationOption.bind(L, e, t, n, r, i)) || i(s);
      }
      k.setConversationOption(e, t, n).then(r, s);
    };
    this.setThreadOption = function (e, t, n, r, i) {
      function s(s) {
        q(s, L.setThreadOption.bind(L, e, t, n, r, i)) || i(s);
      }
      k.setThreadOption(e, t, n).then(r, s);
    };
    this.pinUserToDogfoodCloud = function () {
      function t(t) {
        e.success(t);
        L.poll();
      }
      function n(t) {
        e.error(t);
        q(t, L.pinUserToDogfoodCloud);
      }
      var e = N("pinToDogfood");
      k.pinToDogfood().then(t, n);
    };
    this.ping = function () {
      var e = u.get();
      e.publish(y.ONLINE_STATE_CHANGED, b.OFFLINE);
      I("O");
      var t = N("ping");
      k.ping().then(function (r) {
        I("OOK");
        e.publish(y.ONLINE_STATE_CHANGED, b.ONLINE);
        t.success(r);
        L.poll();
        p.getInstance().reportSuccess("webapi-ping");
      }, function (n) {
        var i = d.get("chat-4171"), s = i.match(/(\d+)x>O$/), o = 1000;
        if (h.isFeatureOn(r.featureFlags.ENABLE_PING_ECS_CONFIG)) {
          var u = h.settings.webApiService.pingDelayTime.min || 30, a = h.settings.webApiService.pingDelayTime.max || 60;
          o = W(u * 1000, a * 1000);
        }
        s ? (i = i.replace(/\d+x>O$/, ""), I(i + (+s[1] + 1) + "x", !0)) : I("OERR1x");
        t.error(n);
        setTimeout(L.ping, o);
      });
    };
    this.createConversation = function (e, t, r) {
      function s(e) {
        n.mark(w.NEW_CONVERSATION.CREATION_END_OK);
        i.success(e);
        var r = S(e.request, "location"), s = r.match(/threads\/(19:.*)$/)[1];
        t(s);
      }
      function o(s) {
        n.mark(w.NEW_CONVERSATION.CREATION_END_ERROR);
        i.error(s);
        q(s, L.createConversation.bind(L, e, t, r));
        r(s);
      }
      n.mark(w.NEW_CONVERSATION.CREATION_START);
      var i = N("createConversation");
      k.createConversation(e).then(s, o);
    };
    this.getUserPresence = function (e) {
      function n(n) {
        t.error(n);
        q(n, L.getUserPresence.bind(L, e));
      }
      var t = N("getUserPresence");
      k.getUserPresence(e).then(t.success, n);
    };
    this.setEndpointPresence = function () {
      function t(t) {
        e.error(t);
        q(t, L.setEndpointPresence);
      }
      var e = N("setEndpointPresence");
      k.setEndpointPresence().then(e.success, t);
    };
    this.activateEndpoint = function () {
      function e() {
        var e = N("activateEndpoint");
        k.activateEndpoint().then(e.success, e.error);
      }
      P.when(!0, e);
    };
    this._getEndpointId = function () {
      return new Promise(function (e) {
        var t = d.get(s.ENDPOINT_ID);
        v.get().getItem(s.ENDPOINT_ID).then(function (n) {
          n === t ? e(t) : e();
        });
      });
    };
    this.poll = function () {
      function o(e) {
        n.error(e);
        if (q(e, L.poll)) {
          I("SERR404");
          return;
        }
        I("SERR");
        if (e.status === g.notFound && T(e.response, m.missingEndpoint))
          return;
        c.execute(L.poll);
      }
      function l(e) {
        I("SOK");
        n.success(e);
        L.setEndpointPresence();
        U(S(e.request, "location"));
      }
      function p(t) {
        e.error(t);
        v(t);
        if (R(t)) {
          I("EERRdf");
          return;
        }
        if (q(t, L.poll)) {
          I("EERR404");
          return;
        }
        if (t.status === g.forbidden) {
          f.clearRegistrationToken();
          I("EERR403(" + t.getResponseHeader("contextId") + ";\"" + t.responseText + "\")" + !!d.get("registrationTokenRealTime"));
          L.poll();
          return;
        }
        I("EERR");
        c.execute(L.poll);
      }
      function v(e) {
        var t = S(e, "set-registrationtoken");
        t && (f.setRegistrationToken(t), j(t));
      }
      function b(t) {
        var n = t.response, f = t.request, p = r.telemetry.timelineLoadOrigin, m = i.get()._telemetry.context, g = u.get(), b;
        v(f);
        I("EOK");
        c.reset();
        e.success(t);
        b = d.get(s.RESURECTION_KEY);
        b ? (d.remove(s.RESURECTION_KEY), m.timelineLoadOrigin = p.RESSURECT) : P() ? m.timelineLoadOrigin = p.RELOAD : m.timelineLoadOrigin = p.LOAD;
        if (!h.settings.isPollingEnabled)
          return;
        h.isFeatureOn(r.featureFlags.SUPPORT_MESSAGE_PROPERTIES) && z();
        if (n.subscriptions && n.subscriptions.length > 0) {
          var S = a.customResource("/endpoints/SELF/subscriptions/") + n.subscriptions[0].id;
          w().finally(function () {
            U(S);
          });
        } else
          O && g.publish(y.FORCE_RESYNC), w().finally(function () {
            I("S");
            k.requestSubscriptionCreation(E).then(l, o);
          });
        O = !0;
      }
      function w() {
        var e = k.getSelfProperties();
        return e.then(t.success.bind(t), t.error.bind(t)), e;
      }
      function x() {
        var e = "Agent";
        return h.isFeatureOn(r.featureFlags.READ_RECEIPT_ENABLED) && (e += ",readReceipts"), { endpointFeatures: e };
      }
      var e = N("endpointCreation"), t = N("getSelfProperties"), n = N("subscriptionCreation");
      I("E" + !!d.get(s.ENDPOINT_ID));
      L._getEndpointId().then(function (e) {
        k.requestEndpointCreation(e, x()).then(b, p);
      });
    };
    this.reset = function () {
      function e() {
        O = !1;
      }
      return k.abortCurrentPoll(), k.requestEndpointRemoval(d.get(s.ENDPOINT_ID)).then(e, e);
    };
    this.postMessage = function (e, t, r, s) {
      function a(e) {
        n.mark(w.IM_SEND.POST_END_OK + o);
        u.enqueueSentMessageInfo(t);
        r(e);
      }
      function f(i) {
        if (q(i, L.postMessage.bind(L, e, t, r, s)))
          return;
        n.mark(w.IM_SEND.POST_END_ERROR + o);
        u.enqueueSentMessageInfo(t);
        s(i);
      }
      var o = t.clientmessageid, u = i.get()._telemetry.messagesCollector;
      n.mark(w.IM_SEND.POST_START + o);
      k.postMessage(e, t).then(a, f);
    };
    this.sendContactsList = function (e) {
      k.sendContactsList(e).then(t.noop, function (n) {
        q(n, L.sendContactsList.bind(L, e));
      });
    };
    this.addContactToContactsList = D(function (e) {
      k.addContactToContactsList(e).then(t.noop, function (n) {
        q(n, L.addContactToContactsList.bind(L, e));
      });
    });
    this.removeContactFromContactsList = D(function (e) {
      k.removeContactFromContactsList(e).then(t.noop, function (n) {
        q(n, L.removeContactFromContactsList.bind(L, e));
      });
    });
    this.addParticipant = function (e, t, n, r, i) {
      k.addParticipant(e, t, n).then(r, function (o) {
        q(o, L.addParticipant.bind(L, e, t, n, r, i)) || typeof i == "function" && i(o);
      });
    };
    this.removeParticipant = function (e, t, n, r) {
      k.removeParticipant(e, t).then(n, function (s) {
        q(s, L.removeParticipant.bind(L, e, t, n, r)) || r(s);
      });
    };
    this.setConsumptionHorizon = function (e, t, n) {
      function i(e) {
        n && n(e);
        r.success(e);
      }
      function s(n) {
        r.error(n);
        q(n, L.setConsumptionHorizon.bind(L, e, t));
      }
      var r = N("setConsumptionHorizon");
      k.setConsumptionHorizon(e, t).then(i, s);
    };
    this.getFavorites = function () {
      return new Promise(function (e, t) {
        function r(t) {
          n.success(t);
          e(t);
        }
        function i(e) {
          n.error(e);
          q(e, L.getFavorites.bind(L)) || t();
        }
        var n = N("getFavorites");
        k.getFavorites().then(r, i);
      });
    };
    this.setFavorites = function (e) {
      return new Promise(function (t, n) {
        function i(e) {
          r.success(e);
          t();
        }
        function s(t) {
          r.error(t);
          q(t, L.setFavorites.bind(L, e)) || n();
        }
        var r = N("setFavorites");
        k.setFavorites(e).then(i, s);
      });
    };
    this.setUserPresence = function (e) {
      function n(n) {
        t.error(n);
        q(n, L.setUserPresence.bind(L, e));
      }
      var t = N("setUserPresence");
      k.setUserPresence(e).then(t.success, n);
    };
    this.syncMessages = function (e, t, n, r, s) {
      function a(t) {
        var n = C.buildMessageSuccess(e, r);
        F();
        n(t);
      }
      function f(i) {
        u.chatHistoryLoadResult[e] = i.status;
        var a = q(i, L.syncMessages.bind(L, e, t, n, r, s));
        a ? u.isChatHistoryLoad404 = !0 : (o.error(i), s && s());
      }
      var o = N("syncMessages"), u = i.get()._telemetry.context;
      u.chatHistoryLoadResult[e] = g.OK;
      k.fetchMessages(e, t, n).then(a, f);
    };
    this.syncMessagesLoadMore = function (e, t, n, r) {
      function s(t) {
        var r = C.buildMessageSuccess(e, n);
        r(t);
      }
      function o(s) {
        var o = q(s, L.syncMessagesLoadMore.bind(L, e, t, n, r));
        o || (i.error(s), r(s));
      }
      var i = N("syncMessagesLoadMore");
      k.fetchMessagesLoadMore(e, t).then(s, o);
    };
    this.syncRecents = function (e, t, n, r) {
      function i(e) {
        n(e);
        F();
      }
      function s(i) {
        var s = q(i, L.syncRecents.bind(L, e, t, n, r));
        s || r(i);
      }
      k.fetchConversations(e, t).then(i, s);
    };
    this.syncRecentsBySyncState = function (e, t, n, i) {
      function s(e) {
        n(e);
        h.isFeatureOn(r.featureFlags.DISABLE_POLLING_ON_KAHUNA) || F();
      }
      function o(r) {
        var s = q(r, L.syncRecentsBySyncState.bind(L, e, t, n, i));
        s || i(r);
      }
      k.fetchConversationsBySyncState(e, t).then(s, o);
    };
    this.syncConversation = function (e, t, n) {
      function r(e) {
        t(e);
        F();
      }
      function i(r) {
        var i = q(r, L.syncConversation.bind(L, e, t, n));
        i || n(r);
      }
      k.fetchConversation(e).then(r, i);
    };
    this.syncThread = function (e, t, n) {
      function i(e) {
        r.success(e);
        t();
        F();
      }
      function s(i) {
        var s = q(i, L.syncThread.bind(L, e, t, n));
        s || (r.error(i), n());
      }
      var r = N("syncThread");
      t = t || function () {
      };
      n = n || function () {
      };
      k.fetchThread(e).then(i, s);
    };
  };
});
