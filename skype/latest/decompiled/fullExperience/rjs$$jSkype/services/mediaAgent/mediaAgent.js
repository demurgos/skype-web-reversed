define("jSkype/services/mediaAgent/mediaAgent", [
  "./session",
  "./deviceManager",
  "./capabilities",
  "./constants",
  "./helper"
], function (e, t, n, r, i) {
  var s = function (r, i) {
    function l() {
      return u;
    }
    var s = r.getLogger().createChild("MA", r.settings.debug), o = s.createChild("DeviceManager"), u = new t({
        logger: o,
        settings: r.settings
      }, i), a = [], f = n.build({ settings: r.settings });
    u._deviceSelectionChanged = function () {
      a.forEach(function (e) {
        e._deviceSelectionChanged();
      });
    }, this.createSession = function (t, n, i) {
      var o = s.createChild("Session").createChild(n), u = {
          getDeviceManager: l,
          getLogger: function () {
            return o;
          },
          maContext: r,
          config: i ? i : {}
        }, f = e.build(u, n, t);
      return f._onTerminated = function (e) {
        var t = a.indexOf(e);
        t !== -1 && a.splice(t, 1);
      }, a.push(f), f;
    }, this.getDeviceManager = l, this.getCapabilities = function () {
      return f;
    };
  };
  return {
    build: function (e, t) {
      return new s(e, t);
    },
    isPlatformSupported: function () {
      return navigator.getUserMedia && (typeof RTCPeerConnection != "undefined" || typeof RTCIceGatherer != "undefined");
    },
    constants: r,
    helper: i
  };
})
