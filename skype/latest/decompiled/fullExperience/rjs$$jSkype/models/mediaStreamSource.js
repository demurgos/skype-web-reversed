define("jSkype/models/mediaStreamSource", [
  "require",
  "jSkype/models/mediaStreamSink"
], function (e) {
  function n() {
    return { sink: new t() };
  }
  var t = e("jSkype/models/mediaStreamSink");
  return n;
})
