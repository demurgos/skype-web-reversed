define("services/calling/screenSharingHandler", [
  "require",
  "swx-enums"
], function (e) {
  function n(e) {
    function a(e) {
      return e === t.mediaStreamState.Started || e === t.mediaStreamState.Active || e === t.mediaStreamState.Inactive;
    }
    function f(e, n) {
      var r = a(n);
      return r && e === t.mediaStreamState.Stopped;
    }
    function l(e) {
      var t = e.person.id();
      if (o[t])
        return;
      o[t] = !0, i(e);
    }
    function c(e) {
      var t = e.person.id();
      delete o[t], s(e);
    }
    function h(e) {
      function t(t, n, r) {
        a(t) && l(e), f(t, r) && c(e);
      }
      u[e.person.id()] = function () {
        e.screenSharing.stream.state.changed.off(t);
      }, e.screenSharing.stream.state.changed(t);
    }
    function p(e) {
      var t = e.person.id();
      u[t] && (u[t](), delete u[t]), o[t] && (s(e), delete o[t]);
    }
    var n = this, r = function () {
      }, i = r, s = r, o = {}, u = {};
    n.init = function () {
      e.participants.added(h), e.participants.removed(p);
    }, n.onScreenSharingStarted = function (e) {
      i = e || r;
    }, n.onScreenSharingStopped = function (e) {
      s = e || r;
    }, n.dispose = function () {
      Object.keys(u).forEach(function (e) {
        u[e]();
      }), u = {}, e.participants.added.off(h), e.participants.removed.off(p), i = r, s = r;
    };
  }
  var t = e("swx-enums");
  return {
    build: function (e) {
      return new n(e);
    }
  };
})
