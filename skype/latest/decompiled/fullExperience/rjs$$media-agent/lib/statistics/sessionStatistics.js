(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/statistics/sessionStatistics", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function n() {
    function d() {
      return {
        started: function () {
          n = "Offering";
          m();
        }
      };
    }
    function v() {
      return {
        started: function () {
          n = "Answering";
          m();
        }
      };
    }
    function m() {
      t = t || n;
      ++r;
    }
    function g() {
      return {
        completed: function () {
          r === 1 && (i = !0);
        },
        rejected: function () {
          ++l;
        }
      };
    }
    function y(e) {
      return e * 10000;
    }
    var e = new Date().getTime(), t, n, r = 0, i = !1, s = !1, o, u = 0, a = 0, f = "0", l = 0, c = {
        type: "none",
        detail: "none"
      }, h = 0, p = 0;
    this.negotiation = {
      offering: d(),
      answering: v(),
      current: g()
    };
    this.terminated = function () {
      a = new Date().getTime();
      u = new Date().getTime() - e;
    };
    this.setMultiParty = function () {
      s = !0;
    };
    this.setMediaLegId = function (e) {
      o = e;
    };
    this.setId = function (e) {
      f = e;
    };
    this.setError = function (e) {
      c.type = e.type || "internalError";
      c.detail = e.detail || e.toString();
    };
    this.dtmfResult = function (e) {
      e ? ++h : ++p;
    };
    this.getReport = function () {
      return {
        CorrelationId: f,
        CallNumber: 0,
        RetargetCount: 0,
        CreationTime: y(e),
        InitTime: y(e),
        TerminationTime: y(a),
        CallDuration: y(u),
        InitialNegotiationType: t || "none",
        InitialNegotiationCompleted: i,
        NegotiationCount: r,
        RejectedNegotiationCount: l,
        MediaLegId: o,
        MultiParty: s,
        ErrorType: c.type,
        ErrorDetail: c.detail,
        DtmfSuccess: h,
        DtmfFailure: p
      };
    };
  }
  t.__esModule = !0;
  t["default"] = {
    build: function () {
      return new n();
    }
  };
}));
