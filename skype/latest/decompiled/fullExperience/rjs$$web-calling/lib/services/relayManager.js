(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("web-calling/lib/services/relayManager", [
      "require",
      "exports",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function s(e) {
    return {
      expires: e.expires,
      username: e.username,
      password: e.password,
      realm: e.realm
    };
  }
  function u(e) {
    return new o(e);
  }
  var n = e("lodash-compat"), r = "\"rtcmedia\"", i = {
      Service: {
        url: "https://trap.skype.com/",
        tokenUrl: "https://trap.skype.com/tokens",
        disabled: !1
      },
      Relay: {
        addresses: ["13.107.8.2"],
        tcpPort: 443,
        udpPort: 3478,
        Lync: {
          addresses: ["mr.skype.net"],
          tcpPort: 443,
          udpPort: 3478
        },
        Skype: {
          addresses: ["13.107.8.2"],
          tcpPort: 443,
          udpPort: 3478
        },
        Turn: {
          addresses: ["104.44.195.106"],
          tcpPort: 443,
          udpPort: 3478,
          url: "https://world.turn.skype.com/relay"
        }
      },
      Token: {
        earlyRefreshMinutes: 60,
        earlyRefreshPercentage: 50
      }
    }, o = function () {
      function e(e) {
        var t = this;
        this.updateRelaysPromise = null;
        this.config = n.cloneDeep(i);
        this.trapTokens = {};
        this.$unit = {
          enforceUpdate: function () {
            t.updateRelaysPromise = null;
          }
        };
        this.queryRelaysAsync = function (e, n) {
          return t.updateRelaysPromise || (t.updateRelaysPromise = t.updateRelaysFromConfigAsync()), t.updateRelaysPromise.then(function (n) {
            return t.fetchTurnRelayAddresses(e, n);
          }).then(function (t) {
            return t ? "turn" === e ? t.Turn : n ? t.Lync : t.Skype : [];
          });
        };
        this.context = e;
        this.logger = e.logger.createChild("RM");
        this.request = e.request;
      }
      return e.prototype.initialize = function () {
        this.updateRelaysPromise || (this.updateRelaysPromise = this.updateRelaysFromConfigAsync());
      }, e.prototype.fetchTurnRelayAddresses = function (e, t) {
        var r = this;
        if ("turn" === e) {
          var i = this.config.Relay.Turn.url;
          return this.request.get(i).then(function (e) {
            var i = e.response, o = JSON.parse(JSON.stringify(i));
            return t.Turn[0].addresses = o.relay ? [o.relay] : t.Turn[0].addresses, n.assign(t.Turn[0], s(r.getTrapToken(o.realm))), Promise.resolve(t);
          })["catch"](function (e) {
            return r.logger.error("failed to retreive turn relay addresses", e), Promise.resolve(t);
          });
        }
        return Promise.resolve(t);
      }, e.prototype.updateRelaysFromConfigAsync = function (e) {
        var t = this, n = this.getConfigAsync().then(function () {
            return t.updateRelaysAsync();
          }).then(function (e) {
            return t.updateRelaysPromise = n, e;
          })["catch"](function (n) {
            return t.updateRelaysPromise = null, e ? t.logger.warn("failed to retrieve relays", n) : t.logger.error("failed to retrieve relays", n), null;
          });
        return n;
      }, e.prototype.refreshRelaysFromConfig = function () {
        this.request.isOnline() ? this.updateRelaysFromConfigAsync() : (this.updateRelaysPromise = null, this.logger.warn("not refreshing relays due to no network connection"));
      }, e.prototype.updateRelaysAsync = function () {
        var e = this, t = this.config.Service.tokenUrl;
        return this.context.tokenProvider().then(function (n) {
          return e.request.get(t, {
            headers: {
              "X-Skypetoken": n,
              "api-version": 2
            }
          });
        }).then(function (t) {
          var n = t.response, i = 0, o = e.config.Token.earlyRefreshMinutes, u = e.config.Token.earlyRefreshPercentage;
          e.storeTrapTokens(n);
          i = Math.max(n.expires - o * 60, n.expires * u / 100);
          window.setTimeout(e.refreshRelaysFromConfig.bind(e), 1000 * i);
          var a = s(e.getTrapToken(r)), f = __assign({
              addresses: e.config.Relay.Skype.addresses,
              tcpPort: e.config.Relay.Skype.tcpPort,
              udpPort: e.config.Relay.Skype.udpPort,
              type: "msturn"
            }, a), l = __assign({
              addresses: e.config.Relay.Lync.addresses,
              tcpPort: e.config.Relay.Lync.tcpPort,
              udpPort: e.config.Relay.Lync.udpPort,
              type: "msturn"
            }, a), c = __assign({
              addresses: e.config.Relay.Turn.addresses,
              tcpPort: e.config.Relay.Turn.tcpPort,
              udpPort: e.config.Relay.Turn.udpPort,
              type: "turn"
            }, a), h = {
              Skype: [f],
              Lync: [l],
              Turn: [c]
            };
          return e.logger.log("relays from trap", h), h;
        });
      }, e.prototype.storeTrapTokens = function (e) {
        if (!e || !e.tokens) {
          this.logger.error("failed to get tokens from trap response");
          return;
        }
        var t = {};
        e.tokens.forEach(function (n) {
          t[n.realm] = {
            expires: e.expires,
            username: n.username,
            password: n.password,
            realm: n.realm
          };
        });
        this.trapTokens = t;
      }, e.prototype.getTrapToken = function (e) {
        if (typeof e == "string") {
          var t = e.replace(/^"|"$/g, ""), n = "\"" + t + "\"", r = this.trapTokens[n];
          if (r)
            return r;
        }
        throw new Error("token for relay not found, realm: " + e);
      }, e.prototype.getConfigAsync = function () {
        var e = this;
        return this.logger.log("retrieving configuration"), Promise.resolve(this.context.configProvider()).then(function (t) {
          e.logger.log("retrieved configuration:", t);
          e.config = n.cloneDeep(i);
          n.merge(e.config, t);
          e.logger.log("applied configuration:", e.config);
        })["catch"](function (t) {
          e.logger.warn("failed to retrieve configuration", t);
        });
      }, e;
    }();
  t.RelayManager = o;
  t.build = u;
}));
