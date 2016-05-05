define("services/telemetry/common/afterRenderHandler", [], function () {
  return function (t, n) {
    var r = 0;
    return function () {
      r++, r === t && (n(), r = 0);
    };
  };
})
