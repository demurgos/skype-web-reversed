define("jSkype/models/mediaStream", [
  "require",
  "jcafe-property-model",
  "jSkype/models/mediaStreamSource",
  "swx-enums"
], function (e) {
  function i() {
    return {
      state: t.property({
        readOnly: !0,
        value: r.mediaStreamState.Stopped
      }),
      source: new n(),
      width: t.property({
        readOnly: !0,
        value: 0
      }),
      height: t.property({
        readOnly: !0,
        value: 0
      })
    };
  }
  var t = e("jcafe-property-model"), n = e("jSkype/models/mediaStreamSource"), r = e("swx-enums");
  return i;
});
