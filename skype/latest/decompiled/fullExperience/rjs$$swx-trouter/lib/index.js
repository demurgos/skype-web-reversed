(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-trouter/lib/index", [
      "require",
      "exports",
      "trouter-client",
      "swx-pubsub"
    ], e);
}(function (e, t) {
  function a(e) {
    return new u(e);
  }
  var n = e("trouter-client"), r = e("swx-pubsub"), i = 400, s = 500, o = {
      READY: "READY",
      TROUTER_URL_CHANGED: "TROUTER_URL_CHANGED",
      AUTH: "AUTH",
      AUTH_SUCCESS: "AUTH_SUCCESS",
      AUTH_FAILURE: "AUTH_FAILURE",
      MESSAGE: "MESSAGE",
      RECONNECTING: "RECONNECTING",
      DISCONNECTED: "DISCONNECTED"
    }, u = function () {
      function e(e) {
        var t = this;
        this.messageHandlers = [];
        this.isStarted = !1;
        this.trouterEndpointUrl = null;
        this.eventProvider = r.build();
        this.isAuthenticating = !1;
        this.pendingTrouterUrlPromise = null;
        this.start = function () {
          t.logProvider.log("[Trouter] open connection");
          if (t.isStarted) {
            t.logProvider.warn("Trouter session already started. You are calling start twice");
            return;
          }
          t.isStarted = !0;
          t.trouterServer = n.createServer(null, t.populateTrouterOptions());
          t.trouterServer.on("ready", t.onMessageChannelReady);
          t.trouterServer.on("auth", t.onMessageChannelAuthRequired);
          t.trouterServer.on("request", t.onIncomingMessage);
          t.trouterServer.on("disconnect", t.onDisconnect);
          t.trouterServer.on("error", t.onError);
          t.trouterServer.on("connect", t.onConnect);
          t.trouterServer.on("connecting", t.onConnecting);
          t.trouterServer.on("connect_failed", t.onConnectFailed);
          t.trouterServer.on("reconnect", t.onReconnect);
          t.trouterServer.on("reconnecting", t.onReconnecting);
          t.trouterServer.on("reconnect_failed", t.onReconnectFailed);
          t.trouterServer.on("log", t.onLog);
          t.trouterServer.open(t.settings.trouterServiceUrl);
        };
        this.stop = function () {
          t.logProvider.log("[Trouter] close connection");
          t.isStarted = !1;
          t.clearMessageHandlers();
          t.eventProvider.unsubscribeAll();
          t.rejectPendingTrouterUrlPromise();
          if (t.trouterServer) {
            var e = function () {
            };
            t.trouterServer.on("ready", e);
            t.trouterServer.on("auth", e);
            t.trouterServer.on("request", e);
            t.trouterServer.on("disconnect", e);
            t.trouterServer.on("error", e);
            t.trouterServer.on("connect", e);
            t.trouterServer.on("connecting", e);
            t.trouterServer.on("connect_failed", e);
            t.trouterServer.on("reconnect", e);
            t.trouterServer.on("reconnecting", e);
            t.trouterServer.on("reconnect_failed", e);
            t.trouterServer.on("log", e);
            t.trouterServer.close();
          }
        };
        this.trouterUrl = function () {
          return t.trouterEndpointUrl;
        };
        this.getServerState = function () {
          return t.trouterServer.getServerState();
        };
        this.registerMessageHandler = function (e) {
          if (t.messageHandlers.some(function (t) {
              return t === e;
            }))
            throw new Error("Registering the same handler twice is not allowed");
          t.messageHandlers.push(e);
        };
        this.unregisterMessageHandler = function (e) {
          var n = t.messageHandlers.indexOf(e);
          n > -1 && t.messageHandlers.splice(n, 1);
        };
        this.clearMessageHandlers = function () {
          t.messageHandlers = [];
        };
        this.getTrouterUrlAsync = function () {
          return t.pendingTrouterUrlPromise ? t.pendingTrouterUrlPromise : t.trouterEndpointUrl && !t.isAuthenticating ? Promise.resolve(t.trouterEndpointUrl) : (t.pendingTrouterUrlPromise = new Promise(function (e, n) {
            t.pendingTrouterUrlPromiseResolveRef = e;
            t.pendingTrouterUrlPromiseRejectRef = n;
          }), t.pendingTrouterUrlPromise);
        };
        this.resolvePendingTrouterUrlPromise = function () {
          t.pendingTrouterUrlPromise && (t.pendingTrouterUrlPromiseResolveRef(t.trouterEndpointUrl), t.pendingTrouterUrlPromiseResolveRef = null, t.pendingTrouterUrlPromise = null);
        };
        this.rejectPendingTrouterUrlPromise = function (e) {
          t.pendingTrouterUrlPromise && (t.pendingTrouterUrlPromiseRejectRef(e), t.pendingTrouterUrlPromiseRejectRef = null, t.pendingTrouterUrlPromise = null);
        };
        this.setLogProvider = function (e) {
          t.logProvider = e || {
            log: console.log,
            warn: console.warn,
            error: console.error,
            debug: console.debug,
            info: console.info
          };
        };
        this.onConnect = function (e) {
          return t.logProvider.log("[Trouter] connect", e);
        };
        this.onConnecting = function (e) {
          return t.logProvider.log("[Trouter] connecting", e);
        };
        this.onConnectFailed = function (e) {
          return t.logProvider.log("[Trouter] connect failed", e);
        };
        this.onReconnect = function (e) {
          return t.logProvider.log("[Trouter] reconnect", e);
        };
        this.onReconnectFailed = function (e) {
          return t.logProvider.log("[Trouter] reconnect failed", e);
        };
        this.onLog = function (e) {
          try {
            var n = JSON.parse(e);
            t.logProvider[n.level](e);
          } catch (r) {
            t.logProvider.warn("onLog failed: " + r);
          }
        };
        this.onError = function (e) {
          return t.logProvider.log("[Trouter] error", e);
        };
        this.onDisconnect = function () {
          t.logProvider.log("[Trouter] disconnected");
          t.eventProvider.publish(o.DISCONNECTED);
          t.trouterEndpointUrl = "";
          t.rejectPendingTrouterUrlPromise();
        };
        this.onReconnecting = function () {
          t.logProvider.log("[Trouter] reconnecting");
          t.eventProvider.publish(o.RECONNECTING);
        };
        this.onMessageChannelAuthRequired = function (e, n) {
          t.logProvider.log("[Trouter] auth required");
          t.isAuthenticating = !0;
          t.skypeTokenProvider().then(function (n) {
            var r = {
              headers: { "X-Skypetoken": n },
              payload: JSON.stringify({ sr: e })
            };
            return t.eventProvider.publish(o.AUTH), t.requestDispatcherProvider.post(t.settings.tpcServiceUrl, r);
          }).then(function (e) {
            t.trouterUrlTtl = e.response.ttl;
            t.eventProvider.publish(o.AUTH_SUCCESS);
            n(e.response);
          })["catch"](function (e) {
            t.isAuthenticating = !1;
            t.trouterEndpointUrl = "";
            t.eventProvider.publish(o.AUTH_FAILURE, typeof XMLHttpRequest == "function" && e instanceof XMLHttpRequest ? e : null);
            t.rejectPendingTrouterUrlPromise(e);
          });
        };
        this.onMessageChannelReady = function (e, n) {
          t.logProvider.log("[Trouter] ready");
          t.isAuthenticating = !1;
          n && (t.trouterEndpointUrl = t.trouterServer.getServerState().surl, t.eventProvider.publish(o.TROUTER_URL_CHANGED, {
            url: t.trouterServer.getServerState().surl,
            ttl: t.trouterUrlTtl
          }));
          t.eventProvider.publish(o.READY, {
            url: t.trouterServer.getServerState().surl,
            isNewUrl: n
          });
          t.resolvePendingTrouterUrlPromise();
        };
        this.buildMessage = function (e) {
          try {
            var n = JSON.parse(e.body), r = t.getEventIdFromRequestBody(n);
            return {
              eventId: r,
              url: e.url,
              body: n,
              headers: e.headers
            };
          } catch (i) {
            return null;
          }
        };
        this.getEventIdFromRequestBody = function (e) {
          return e && (e.evt || e.eventId) || null;
        };
        this.sendBackAcknowledgement = function (e, t) {
          e.writeHead(t);
          e.end();
        };
        this.safeExecuteHandle = function (e, n) {
          try {
            return e.handleMessage(n);
          } catch (r) {
            return t.logProvider.warn("A trouter message handler is throwing exceptions. exception: " + r), {
              isHandled: !0,
              resultCode: s
            };
          }
        };
        this.handleMessage = function (e) {
          var n, r = {
              isHandled: !1,
              resultCode: i
            };
          if (!e)
            return r;
          for (var s = 0; s < t.messageHandlers.length; s++) {
            n = t.safeExecuteHandle(t.messageHandlers[s], e);
            if (n.isHandled === !0)
              return n;
          }
          return r;
        };
        this.onIncomingMessage = function (e, n) {
          var r = t.buildMessage(e), i = t.handleMessage(r);
          t.sendBackAcknowledgement(n, i.resultCode);
        };
        this.populateTrouterOptions = function () {
          var e = {
            clientInfo: {
              ua: t.settings.userAgent,
              v: t.settings.version
            },
            ioOptions: {
              requireMtls: !0,
              "connect timeout": t.settings.connectTimeout
            },
            clientCorrelationID: t.settings.correlationId,
            environment: t.settings.environment,
            telemetrySettings: t.telemetryConfig,
            eventFactory: t.settings.eventFactory,
            eventLogger: t.settings.eventLogger
          };
          return e;
        };
        this.settings = e.settings;
        this.requestDispatcherProvider = e.requestDispatcherProvider;
        this.skypeTokenProvider = e.skypetokenProvider;
        this.subscribe = this.eventProvider.subscribe.bind(this.eventProvider);
        this.unsubscribe = this.eventProvider.unsubscribe.bind(this.eventProvider);
        this.telemetryConfig = e.telemetryConfig;
        this.setLogProvider(e.logProvider);
      }
      return e;
    }();
  t.build = a;
}));
