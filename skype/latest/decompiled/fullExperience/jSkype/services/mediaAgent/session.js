define("jSkype/services/mediaAgent/session", [
  "./webRtcSession",
  "./ortcSession",
  "./statistics/sessionStatistics",
  "./mediaLegId",
  "./constants"
], function (e, t, n, r, i) {
  function s(e, t, s, o) {
    function h(e) {
      return i.RENEGOTIATION_ERROR.signaling === e || i.RENEGOTIATION_ERROR.media === e;
    }
    var u = this, a = n.build(), f = r.build(), l = t.maContext.settings, c = 0;
    a.setId(s), t.config.isConference && a.setMultiParty(), this.createOfferAsync = function () {
      return a.negotiation.offering.started(), e.createOfferAsync.apply(e, arguments).then(function (e) {
        return {
          mediaContent: {
            blob: e.sdp,
            contentType: "application/sdp",
            mediaLegId: f.process()
          },
          modalities: e.modalities
        };
      }).catch(function (e) {
        throw a.setError(e), e;
      });
    }, this.processOfferAsync = function (t) {
      var n = [].slice.call(arguments);
      return n.splice(0, 1, t.blob), a.negotiation.answering.started(), f.process(t.mediaLegId), e.processOfferAsync.apply(e, n).catch(function (e) {
        throw a.setError(e), e;
      });
    }, this.processAnswerAsync = function (t) {
      var n = [].slice.call(arguments);
      return n.splice(0, 1, t.blob), e.processAnswerAsync.apply(e, n).catch(function (e) {
        throw a.setError(e), e;
      });
    }, this.completeNegotiationAsync = function () {
      return c = 0, e.completeNegotiationAsync.apply(e, arguments).then(function (e) {
        return a.negotiation.current.completed(), e;
      }).catch(function (e) {
        throw a.setError(e), e;
      });
    }, this.rejectNegotiationAsync = function (t) {
      var n = ++c <= l.renegotiationAttempts && h(t);
      return a.negotiation.current.rejected(), e.rejectNegotiationAsync(t, n).catch(function (e) {
        throw a.setError(e), e;
      });
    }, this.terminate = function () {
      a.terminated(), e.terminate.apply(e, arguments);
    }, this.getStatsAsync = function () {
      return e.getStatsAsync.apply(e, arguments).then(function (e) {
        return a.setMediaLegId(f.process()), e.metrics = a.getReport(), e;
      });
    }, this.createAnswerAsync = function () {
      return e.createAnswerAsync.apply(e, arguments).then(function (e) {
        return {
          mediaContent: {
            blob: e.sdp,
            contentType: "application/sdp",
            mediaLegId: f.process()
          },
          modalities: e.modalities
        };
      }).catch(function (e) {
        throw a.setError(e), e;
      });
    }, this.configureModalitiesAsync = e.configureModalitiesAsync, this.createRemoteRenderer = e.createRemoteRenderer, this._deviceSelectionChanged = e._deviceSelectionChanged, this._onTerminated = null, e.onNegotiationRequired = o.onNegotiationRequired, e.onContributingSourcesChanged = o.onContributingSourcesChanged, e.onSessionErrorOccurred = function (t) {
      a.setError(t), o.onSessionErrorOccurred.apply(e, arguments);
    }, e._onTerminated = function () {
      u._onTerminated && u._onTerminated.apply(e, arguments);
    };
  }
  return {
    build: function (n, r, i) {
      var o = typeof RTCIceGatherer == "undefined" ? e : t;
      return new s(o.build.apply(this, arguments), n, r, i);
    }
  };
})
