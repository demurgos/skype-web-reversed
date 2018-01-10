(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("jskype-constants/lib/common", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  t.__esModule = !0;
  t["default"] = {
    contentTypes: {
      FORM_URL_ENCODED: "application/x-www-form-urlencoded",
      JSON_V1_0: "application/json; ver=1.0",
      JSON_V2_0: "application/json; ver=2.0",
      JSON_V3_0: "application/json; ver=3.0"
    }
  };
}));
