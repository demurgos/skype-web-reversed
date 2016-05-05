define("jSkype/services/relayManager/relayManager", [
  "lodash-compat",
  "jSkype/services/serviceAccessLayer/requestDispatcher"
], function (e, t) {
  return function (n) {
    function a(e, n) {
      if ("turn" === e) {
        var r = s.Relay.Turn.url;
        return t.get(r, { addContentType: !1 }).then(function (e) {
          var t = e.response, r = JSON.parse(JSON.stringify(t));
          return n.Turn[0].addresses = r.relay ? [r.relay] : n.Turn[0].addresses, Promise.resolve(n);
        }).catch(function (e) {
          return o.error("failed to retreive turn relay addresses", e), Promise.resolve(n);
        });
      }
      return Promise.resolve(n);
    }
    function f(e) {
      var t = c().then(function () {
        return l();
      }).then(function (e) {
        return u = t, e;
      }).catch(function (t) {
        u = null, e ? o.warn("failed to retrieve relays", t) : o.error("failed to retrieve relays", t);
      });
      return t;
    }
    function l() {
      var e = s.Service.tokenUrl;
      return n.tokenProvider().then(function (n) {
        return t.get(e, { headers: { "X-Skypetoken": n } });
      }).then(function (e) {
        var t = e.response, n = JSON.parse(JSON.stringify(t)), r = JSON.parse(JSON.stringify(t)), i = JSON.parse(JSON.stringify(t)), u = 0, a = s.Token.earlyRefreshMinutes, l = s.Token.earlyRefreshPercentage;
        u = Math.max(t.expires - a * 60, t.expires * l / 100), window.setTimeout(f, 1000 * u), n.addresses = s.Relay.Skype.addresses, n.tcpPort = s.Relay.Skype.tcpPort, n.udpPort = s.Relay.Skype.udpPort, n.type = "msturn", r.addresses = s.Relay.Lync.addresses, r.tcpPort = s.Relay.Lync.tcpPort, r.udpPort = s.Relay.Lync.udpPort, r.type = "msturn", i.addresses = s.Relay.Turn.addresses, i.tcpPort = s.Relay.Turn.tcpPort, i.udpPort = s.Relay.Turn.udpPort, i.type = "turn";
        var c = {
          Skype: [n],
          Lync: [r],
          Turn: [i]
        };
        return o.log("relays from trap", c), c;
      });
    }
    function c() {
      return Promise.resolve(n.configProvider()).then(function (t) {
        e.merge(i, t), o.log("relayManager.getConfigAsync", "providedConfig", t, "merged config", s);
      }).catch(function (e) {
        o.warn("failed to retrieve configuration", e);
      });
    }
    var r = {}, i = {
        Service: {
          url: "https://api.trap.skype.net/",
          tokenUrl: "https://api.trap.skype.net/v1/token",
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
            url: "https://world.turn.skype.net/relay"
          }
        },
        Token: {
          earlyRefreshMinutes: 60,
          earlyRefreshPercentage: 50
        }
      }, s = i, o = n.getLogger().createChild("RM"), u = null;
    return r.queryRelaysAsync = function (e, t) {
      return u || (u = f()), u.then(function (t) {
        return a(e, t);
      }).then(function (n) {
        return n ? "turn" === e ? n.Turn : t ? n.Lync : n.Skype : [];
      });
    }, r.queryRelaysOnStartupAsync = function () {
      u || (u = f(!0));
    }, r;
  };
})
