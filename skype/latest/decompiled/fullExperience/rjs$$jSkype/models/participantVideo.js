define("jSkype/models/participantVideo", [
  "require",
  "exports",
  "module",
  "jcafe-property-model",
  "jSkype/modelHelpers/propertyModelHelper",
  "jSkype/client",
  "jSkype/modelHelpers/personsAndGroupsHelper",
  "jSkype/models/videoChannel",
  "swx-enums"
], function (e, t) {
  function a(e, t) {
    function h() {
      l = i.get().devicesManager.selectedCamera.changed(p), c = i.get().devicesManager.cameras.removed(v);
    }
    function p(e, t) {
      if (e) {
        var n = d();
        n.camera = e;
      } else
        (e === null || t === "ActiveDeviceUnplugged") && a.channels(0) && a.channels(0)._toggleIsStarted(!1);
    }
    function d() {
      var n = new o(e, a.state, t);
      return n._init(), a.channels._add(n), n;
    }
    function v(e) {
      a.channels._removeByCondition(function (t) {
        return t.camera.deviceId() === e.deviceId() ? (t._dispose(), !0) : !1;
      });
    }
    var a = this, f = n.collection(), l, c;
    return this.state = n.property({
      readOnly: !0,
      value: u.callConnectionState.Disconnected
    }), this.channels = r.exposeReadOnlyCollection(f), this._sourceId = n.property(), this._dispose = function () {
      a.channels().forEach(function (e) {
        e._dispose();
      }), a.channels._removeAll(), s.isMePerson(t) && (l.dispose(), c.dispose());
    }, s.isMePerson(t) ? h() : d(), this;
  }
  var n = e("jcafe-property-model"), r = e("jSkype/modelHelpers/propertyModelHelper"), i = e("jSkype/client"), s = e("jSkype/modelHelpers/personsAndGroupsHelper"), o = e("jSkype/models/videoChannel"), u = e("swx-enums");
  t.build = function (e, t) {
    return new a(e, t.id());
  };
})
