define("jSkype/services/pluginless/pluginlessTelemetry", ["lodash-compat"], function (e) {
  function t(t) {
    function s(e) {
      var t = { DataVersion: "3" };
      [].slice.call(arguments, 1).forEach(function (e) {
        o(e, t);
      });
      try {
        n.sendEvent(r, e, t);
      } catch (s) {
        i.error("failed to send event", e, s);
      }
    }
    function o(t, n, r) {
      r = r || "";
      var i = function (e) {
          return e.replace(/[^a-zA-Z0-9._]/g, "_");
        }, s = function (e) {
          return typeof e == "boolean" ? e ? "1" : "0" : String(e);
        };
      e.forOwn(t, function (t, u) {
        if (typeof t == "object") {
          var a = o(t, n, r + u + "_");
          e.forOwn(a, function (e, t) {
            n[i(r + u + "_" + t)] = s(e);
          });
        } else
          n[i(r + u)] = s(t);
      });
    }
    var n = t.telemetryManager, r = t.token, i = t.logger.createChild("Telemetry");
    this.sendMediaSessionStats = function (e) {
      s("mdsc_conference", e.media.metrics, e.signaling), e.media.ortc && s("mdsc_ortc_reports", e.media.ortc), e.media.webrtc && s("mdsc_webrtc_session", e.media.webrtc);
    };
  }
  return {
    build: function (e) {
      return new t(e);
    }
  };
})
