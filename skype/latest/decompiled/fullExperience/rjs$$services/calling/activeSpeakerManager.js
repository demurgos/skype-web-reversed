define("services/calling/activeSpeakerManager", [
  "require",
  "utils/chat/sort",
  "lodash-compat",
  "experience/settings"
], function (e) {
  function f(e, r) {
    function p() {
      h && (c = setInterval(m, i));
    }
    function d() {
      c && (clearInterval(c), c = null);
      l = [];
    }
    function v(e) {
      var t = e.speaking !== e.audio.isSpeaking(), n = e.speaking ? e.tick < o : e.tick < s;
      return t ? (e.cancelTick = 1, n ? e.tick++ : (e.speaking = !e.speaking, e.timestamp = new Date(), e.tick = 1), !n) : (e.tick > 1 && (e.cancelTick > u ? (e.tick = 1, e.cancelTick = 1) : e.cancelTick++), !1);
    }
    function m() {
      var e = !1;
      f.forEach(function (t) {
        e = v(t) || e;
      });
      e && y();
    }
    function g(e) {
      return e.rawParticipant;
    }
    function y() {
      var i = [], s = [], o, u, c = new Date();
      f.forEach(function (e) {
        e.speaking ? i.push(e) : c - e.timestamp < a && s.push(e);
      });
      i.sort(t.byTimestamp);
      s.sort(t.byTimestampDescending);
      u = Math.max(0, e - i.length);
      o = i.slice(0, e).map(g).concat(s.slice(0, u).map(g));
      n.isEqual(l, o) || (l = o, r(o));
    }
    function b(e) {
      return f.filter(function (t) {
        return t.rawParticipant === e;
      })[0];
    }
    function w(e) {
      f = f.filter(function (t) {
        return t.rawParticipant !== e;
      });
    }
    function E(e) {
      f.push({
        tick: 1,
        speaking: !1,
        cancelTick: 1,
        audio: e.audio,
        rawParticipant: e
      });
    }
    var f = [], l = [], c = 0, h = !0;
    this.onParticipantAdded = function (e) {
      if (b(e))
        return;
      E(e);
      !c && f.length > 1 && p();
    };
    this.onParticipantRemoved = function (e) {
      if (!b(e))
        return;
      w(e);
      f.length < 2 && d();
    };
    this.pause = function () {
      h = !1;
      d();
    };
    this.unpause = function () {
      h = !0;
      !c && f.length > 1 && p();
    };
    this.dispose = function () {
      d();
    };
  }
  var t = e("utils/chat/sort"), n = e("lodash-compat"), r = e("experience/settings"), i = r.activeSpeaker.tickInterval, s = r.activeSpeaker.timeToPromote / i, o = r.activeSpeaker.timeToDemote / i, u = r.activeSpeaker.ticksToCancel, a = r.activeSpeaker.recentlySpokenTimeout;
  return {
    build: function (e, t) {
      return new f(e, t);
    }
  };
});
