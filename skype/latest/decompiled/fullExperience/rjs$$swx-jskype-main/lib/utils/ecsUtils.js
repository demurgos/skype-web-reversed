(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/utils/ecsUtils", [
      "require",
      "exports",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function i(e) {
    var t = e.version.split(".", 4);
    while (t.length < 4)
      t.push("0");
    return t[3] = t[2], t[2] = e.ecsClientCobrandTag, r + "_" + t.join(".");
  }
  function s(e) {
    return n.isString(e.ecsHosts) ? JSON.parse(e.ecsHosts) : e.ecsHosts || [];
  }
  function o(e) {
    return e.initParams && e.initParams.apiKey ? e.initParams.apiKey : undefined;
  }
  var n = e("lodash-compat"), r = 908;
  t.getClientVersion = i;
  t.getHosts = s;
  t.getApiKey = o;
}));
