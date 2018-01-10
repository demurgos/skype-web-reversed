(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-registrar/lib/index", [
      "require",
      "exports",
      "swx-browser-globals"
    ], e);
}(function (e, t) {
  function i(e) {
    return new r(e);
  }
  var n = e("swx-browser-globals"), r = function () {
      function e(e) {
        var t = this;
        this.isTtlRefresh = !1;
        this.registerEndpoint = function (e, n) {
          t.isTtlRefresh = !1;
          t.currentPublicUrl = e;
          t.currentRegistrationId = n;
          t.clearRegistrationRefresh();
          t.initialRegistrationTimestamp = Date.now();
          t.getPayloadAndRegister();
        };
        this.unregisterEndpoint = function (e) {
          t.skypetokenProvider().then(function (n) {
            var r = { headers: { "X-Skypetoken": n } };
            t.requestDispatcherProvider.remove(t.settings.registrarServiceUrl + "/" + e, r);
          }, function () {
          });
        };
        this.getPayloadAndRegister = function () {
          var e;
          t.customRegistrationProvider ? e = t.customRegistrationProvider.registerPresence(t.settings.registrarServiceUrl, t.getPayload()) : e = t.skypetokenProvider().then(function (e) {
            var n = {
              headers: { "X-Skypetoken": e },
              payload: JSON.stringify(t.getPayload())
            };
            return t.requestDispatcherProvider.post(t.settings.registrarServiceUrl, n);
          });
          e.then(t.registrationSuccess, t.registrationError);
        };
        this.renewTtl = function () {
          t.isTtlRefresh = !0;
          t.getPayloadAndRegister();
        };
        this.registrationSuccess = function (e) {
          e.response || t.registrationError("Invalid success response result, expected response property");
          e.response.status || t.registrationError("Invalid success response result, expected status property");
          t.isSuccessCode(e.response.status) || t.registrationError(e.response);
          t.schedulePresenceRefresh();
          t.onRegistrationSuccess && t.onRegistrationSuccess(t.isTtlRefresh);
        };
        this.registrationError = function (e) {
          t.onRegistrationError && t.onRegistrationError(typeof XMLHttpRequest == "function" && e instanceof XMLHttpRequest ? e : null);
        };
        this.schedulePresenceRefresh = function () {
          t.clearRegistrationRefresh();
          t.getRegistrationTime() + t.settings.registrarRefreshTimeoutInMs < t.settings.maxRegistrationTimeInMs && (t.refreshTimeout = n.getWindow().setTimeout(t.renewTtl, t.settings.registrarRefreshTimeoutInMs));
        };
        this.clearRegistrationRefresh = function () {
          n.getWindow().clearTimeout(t.refreshTimeout);
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
        this.settings = e.settings;
        this.requestDispatcherProvider = e.requestDispatcherProvider;
        this.skypetokenProvider = e.skypetokenProvider;
        this.onRegistrationSuccess = e.onRegistrationSuccess;
        this.onRegistrationError = e.onRegistrationError;
        this.customRegistrationProvider = e.customRegistrationProvider || null;
        this.setLogProvider(e.logProvider);
      }
      return e.prototype.getPayload = function () {
        return {
          clientDescription: {
            appId: this.settings.pnhAppId,
            aesKey: "",
            languageId: "en-US",
            platform: this.settings.platform,
            templateKey: this.settings.pnhTemplate,
            platformUIVersion: this.settings.platformUIVersion
          },
          registrationId: this.currentRegistrationId,
          nodeId: "",
          transports: {
            TROUTER: [{
                context: "",
                path: this.currentPublicUrl,
                ttl: this.settings.registrarTtlInSeconds
              }]
          }
        };
      }, e.prototype.isSuccessCode = function (e) {
        return e === 202 || e === 200;
      }, e.prototype.getRegistrationTime = function () {
        return Date.now() - this.initialRegistrationTimestamp;
      }, e;
    }();
  t.build = i;
  t.EVENTS = {
    REGISTRATION_SUCCESS: "REGISTRATION_SUCCESS",
    REGISTRATION_FAILURE: "REGISTRATION_FAILURE",
    REGISTRATION_REFRESH: "REGISTRATION_REFRESH"
  };
}));
