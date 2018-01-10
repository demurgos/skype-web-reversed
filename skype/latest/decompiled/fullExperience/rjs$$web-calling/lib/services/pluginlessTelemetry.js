(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("web-calling/lib/services/pluginlessTelemetry", [
      "require",
      "exports",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function i(e) {
    return new r(e);
  }
  var n = e("lodash-compat"), r = function () {
      function e(e) {
        var t = this;
        this.sendMediaSessionStats = function (e) {
          t.sendEvent("mdsc_conference", e.media.metrics, e.signaling);
          e.media.ortc && t.sendEvent("mdsc_ortc_reports", e.media.ortc);
          e.media.webrtc && t.sendEvent("mdsc_webrtc_session", e.media.webrtc);
        };
        this.telemetryManager = e.telemetryManager;
        this.mdscToken = e.mdscToken;
        this.logger = e.logger.createChild("Telemetry");
      }
      return e.prototype.sendEvents = function (e) {
        throw new Error("PluginlessTelemetry.sendEvents(events) not yet implemented!");
      }, e.prototype.sendEvent = function (e) {
        var t = this, n = [];
        for (var r = 1; r < arguments.length; r++)
          n[r - 1] = arguments[r];
        var i = { DataVersion: "3" };
        [].slice.call(arguments, 1).forEach(function (e) {
          t.toEventProperty(e, i);
        });
        try {
          this.telemetryManager.sendEvent(this.mdscToken, e, i);
        } catch (s) {
          this.logger.error("failed to send event", e, s);
        }
      }, e.prototype.toEventProperty = function (e, t, r) {
        var i = this;
        r = r || "";
        var s = function (e) {
            return e.replace(/[^a-zA-Z0-9._]/g, "_");
          }, o = function (e) {
            return typeof e == "boolean" ? e ? "1" : "0" : String(e);
          };
        return n.forOwn(e, function (e, u) {
          if (typeof e == "object") {
            var a = i.toEventProperty(e, t, r + u + "_");
            n.forOwn(a, function (e, n) {
              t[s(r + u + "_" + n)] = o(e);
            });
          } else
            t[s(r + u)] = o(e);
        }), undefined;
      }, e;
    }();
  t.Telemetry = r;
  t.build = i;
}));
