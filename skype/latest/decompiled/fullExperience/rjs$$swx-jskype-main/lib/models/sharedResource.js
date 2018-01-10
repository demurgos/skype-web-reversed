(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/sharedResource", [
      "require",
      "exports",
      "swx-enums",
      "jcafe-property-model",
      "../../lib/services/calling/callingFacade"
    ], e);
}(function (e, t) {
  function o(e, t) {
    return new s(e, t);
  }
  var n = e("swx-enums"), r = e("jcafe-property-model"), i = e("../../lib/services/calling/callingFacade"), s = function () {
      function e(e, t) {
        var s = this;
        this._getPreviewImage = function (e, t) {
          return new Promise(function (r, o) {
            if (s._type !== n.sharedResourceType.Desktop) {
              o("Not supported");
              return;
            }
            i.getMonitorPreview(s._id, e, t).then(r, o);
          });
        };
        this._type = e;
        this._id = t;
        this.type = r.property({
          readOnly: !0,
          value: e
        });
        this.id = r.property({
          readOnly: !0,
          value: t
        });
      }
      return e;
    }();
  t.SharedResource = s;
  t.build = o;
}));
