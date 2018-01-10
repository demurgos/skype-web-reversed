(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/common/stream/subscriptionManager", [
      "require",
      "exports",
      "../utils",
      "../stream/receiveStream"
    ], e);
}(function (e, t) {
  var n = e("../utils"), r = e("../stream/receiveStream"), i = function () {
      function e(e) {
        this.subscription = e;
      }
      return e.prototype.getMsi = function () {
        return this.checkDisposed(), this.subscription.getMsi();
      }, e.prototype.getModality = function () {
        return this.checkDisposed(), this.subscription.getModality();
      }, e.prototype.onMediaStreamChanged = function (e) {
        this.checkDisposed();
        this.mediaStreamChanged = e;
        this.subscription.isStreamReady() && this.notifyMediaStreamChanged();
      }, e.prototype.onError = function (e) {
        this.checkDisposed();
        this.error = e;
      }, e.prototype.dispose = function () {
        this.subscription && (this.subscription.dispose(this), this.subscription = null);
      }, e.prototype.notifyMediaStreamChanged = function () {
        if (this.mediaStreamChanged) {
          var e = this.subscription.getStream(), t = this.subscription.isStreamReady();
          this.mediaStreamChanged(e && t ? e.getMediaStream() : null);
        }
      }, e.prototype.notifyError = function (e) {
        this.error && this.error(e);
      }, e.prototype.checkDisposed = function () {
        if (!this.subscription)
          throw new Error("subscription disposed");
      }, e;
    }(), s = function () {
      function e(e, t, n) {
        this.clients = [];
        this.streamReady = !1;
        this.modality = e;
        this.msi = t;
        this.onDisposed = n;
      }
      return e.prototype.client = function () {
        var e = new i(this);
        return this.clients.push(e), e;
      }, e.prototype.getMsi = function () {
        return this.msi;
      }, e.prototype.getStream = function () {
        return this.stream;
      }, e.prototype.isStreamReady = function () {
        return this.streamReady;
      }, e.prototype.getModality = function () {
        return this.modality;
      }, e.prototype.setStream = function (e) {
        var t = this;
        if (e === this.stream)
          return;
        this.stream && (this.releaseStream(), this.notifyStreamChanged());
        this.stream = e;
        e && (this.streamReady = !1, e.requestSource(this.msi).then(function () {
          t.streamReady = !0;
          t.notifyStreamChanged();
        })["catch"](function (e) {
          t.notifyError(e);
        }));
      }, e.prototype.notifyStreamChanged = function () {
        this.clients.forEach(function (e) {
          return e.notifyMediaStreamChanged();
        });
      }, e.prototype.releaseStream = function () {
        this.stream && (this.stream.requestSource(r.MediaSourceIdentifiers.SourceNone)["catch"](function () {
        }), this.streamReady = !1, this.stream = null);
      }, e.prototype.notifyError = function (e) {
        this.clients.forEach(function (t) {
          return t.notifyError(e);
        });
      }, e.prototype.dispose = function (e) {
        n["default"].remove(this.clients, function (t) {
          return t === e;
        });
        this.clients.length || (this.releaseStream(), this.onDisposed());
      }, e;
    }(), o = function () {
      function e(e, t) {
        var n = this;
        this.subscriptions = [];
        this.logger = e.logger.createChild("subs");
        this.streamProvider = t;
        this.streamProvider.onStreamsChanged(function () {
          return n.streamsChanged();
        });
        this.logger.log("created");
      }
      return e.prototype.subscribe = function (e, t) {
        var i = this;
        t === void 0 && (t = r.MediaSourceIdentifiers.SourceAny);
        var o = n["default"].find(this.subscriptions, function (n) {
          return n.getMsi() === t && n.getModality() === e;
        });
        if (!o) {
          this.logger.log("creating new subscription #", t, "for modality", e);
          o = new s(e, t, function () {
            i.logger.log("disposing subscription #", t);
            n["default"].remove(i.subscriptions, function (e) {
              return e === o;
            });
          });
          this.subscriptions.push(o);
          var u = this.getAvailableStream(e);
          u && this.assignStream(o, u);
        }
        return o.client();
      }, e.prototype.dispose = function () {
        this.streamProvider.onStreamsChanged(null);
        this.logger.log("disposed");
      }, e.prototype.streamsChanged = function () {
        var e = this;
        this.subscriptions.forEach(function (t) {
          var n = !t.getStream() || e.isStreamRemoved(t.getStream());
          if (!n)
            return;
          var r = e.getAvailableStream(t.getModality());
          r ? e.assignStream(t, r) : e.resignStream(t);
        });
      }, e.prototype.getAvailableStream = function (e) {
        var t = this.streamProvider.getStreams(), i = n["default"].find(t, function (t) {
            return e === t.getModality() && t.getMsi() === r.MediaSourceIdentifiers.SourceNone;
          });
        return i;
      }, e.prototype.isStreamRemoved = function (e) {
        var t = this.streamProvider.getStreams();
        return !t.some(function (t) {
          return t === e;
        });
      }, e.prototype.assignStream = function (e, t) {
        this.logger.log("assigning stream #", t.getId(), "to subscription #", e.getMsi());
        e.setStream(t);
      }, e.prototype.resignStream = function (e) {
        var t = e.getStream();
        t && (this.logger.log("removing stream from subscription #", e.getMsi()), e.setStream(null));
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = o;
}));
