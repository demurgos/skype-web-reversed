(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/common/session", [
      "require",
      "exports",
      "./../statistics/sessionStatistics",
      "./../statistics/mediaLegId",
      "./utils",
      "./../constants"
    ], e);
}(function (e, t) {
  var n = e("./../statistics/sessionStatistics"), r = e("./../statistics/mediaLegId"), i = e("./utils"), s = e("./../constants"), o = function () {
      function e(e, t, i, s) {
        var o = this;
        this.session = e;
        this.context = t;
        this.id = i;
        this.callback = s;
        this.rejectedNegotiations = 0;
        this.statistics = n["default"].build();
        this.mediaLegId = r["default"].build();
        this.settings = t.maContext.settings;
        this.statistics.setId(i);
        t.config.isConference && this.statistics.setMultiParty();
        this.session._onTerminated = function (e) {
          o._onTerminated && o._onTerminated(e);
        };
        this.session.onSessionErrorOccurred = function (e) {
          o.statistics.setError(e);
          o.callback.onSessionErrorOccurred(e);
        };
        this.session.onNegotiationRequired = s.onNegotiationRequired;
        this.session.onAudioStateChanged = s.onAudioStateChanged;
      }
      return e.prototype.createOfferAsync = function () {
        var e = this;
        return this.statistics.negotiation.offering.started(), this.session.createOfferAsync().then(function (t) {
          return t.mediaLegId = e.mediaLegId.process(t.mediaLegId), t;
        })["catch"](function (t) {
          throw e.statistics.setError(t), t;
        });
      }, e.prototype.processOfferAsync = function (e) {
        var t = this;
        return this.statistics.negotiation.answering.started(), this.mediaLegId.process(e.mediaLegId), this.session.processOfferAsync(e)["catch"](function (e) {
          throw t.statistics.setError(e), e;
        });
      }, e.prototype.processAnswerAsync = function (e, t) {
        var n = this;
        return this.session.processAnswerAsync(e, t)["catch"](function (e) {
          throw n.statistics.setError(e), e;
        });
      }, e.prototype.completeNegotiationAsync = function () {
        var e = this;
        return this.rejectedNegotiations = 0, this.session.completeNegotiationAsync().then(function (t) {
          return e.statistics.negotiation.current.completed(), t;
        })["catch"](function (t) {
          throw e.statistics.setError(t), t;
        });
      }, e.prototype.rejectNegotiationAsync = function (e) {
        var t = this, n = ++this.rejectedNegotiations <= this.settings.renegotiationAttempts && this.isRetriableError(e);
        return this.statistics.negotiation.current.rejected(), this.session.rejectNegotiationAsync(e, n)["catch"](function (e) {
          throw t.statistics.setError(e), e;
        });
      }, e.prototype.terminate = function () {
        return this.statistics.terminated(), this.session.terminate();
      }, e.prototype.normalizeStatsValue = function (e) {
        return typeof e == "boolean" ? e ? "1" : "0" : e.toString();
      }, e.prototype.normalizeStatsValues = function (e) {
        var t = this;
        _.forOwn(e, function (n, r) {
          typeof n == "object" ? t.normalizeStatsValues(n) : e[r] = t.normalizeStatsValue(n);
        });
      }, e.prototype.getStatsAsync = function () {
        var e = this;
        return this.session.getStatsAsync().then(function (t) {
          e.statistics.setMediaLegId(e.mediaLegId.process());
          if (t.type === "OrtcMediaStats") {
            var n = t;
            n.metrics = e.statistics.getReport();
            e.normalizeStatsValues(n.metrics);
            e.normalizeStatsValues(n.ortc);
          } else {
            if (t.type !== "WebRtcMediaStats")
              throw new Error("Unknown stats type - " + t.type);
            var r = t;
            r.metrics = e.statistics.getReport();
            e.normalizeStatsValues(r.metrics);
            e.normalizeStatsValues(r.webrtc);
          }
          return t;
        });
      }, e.prototype.createAnswerAsync = function (e) {
        var t = this;
        return this.session.createAnswerAsync(e).then(function (e) {
          return e.mediaLegId = t.mediaLegId.process(e.mediaLegId), e;
        })["catch"](function (e) {
          throw t.statistics.setError(e), e;
        });
      }, e.prototype.configureModalitiesAsync = function (e) {
        return i["default"].forOwn(e, function (t, n) {
          t || delete e[n];
        }), this.session.configureModalitiesAsync(e);
      }, e.prototype.createRemoteRenderer = function (e, t) {
        return this.session.createRemoteRenderer(e, t);
      }, e.prototype.sendDtmf = function (e) {
        var t = this;
        return this.session.sendDtmf(e).then(function (e) {
          return t.statistics.dtmfResult(!0), e;
        })["catch"](function (e) {
          throw t.statistics.dtmfResult(!1), e;
        });
      }, e.prototype.canSendDtmf = function () {
        return this.session.canSendDtmf();
      }, e.prototype.getExtensionsManager = function () {
        return this.session.getExtensionsManager();
      }, e.prototype.muteInputAsync = function () {
        return this.session.muteInputAsync();
      }, e.prototype.unmuteInputAsync = function () {
        return this.session.unmuteInputAsync();
      }, e.prototype._deviceSelectionChanged = function (e) {
        this.session._deviceSelectionChanged(e);
      }, e.prototype.isRetriableError = function (e) {
        return s["default"].RENEGOTIATION_ERROR.signaling === e || s["default"].RENEGOTIATION_ERROR.media === e;
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = o;
}));
