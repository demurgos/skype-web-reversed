(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/smsPrice/instance", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "jskype-settings-instance",
      "swx-sms-price-web-service"
    ], e);
}(function (e, t) {
  function o() {
    var e;
    return s || (e = n.get().signInManager._skypeToken, s = i.build(e, { host: r.settings.smsPriceWebService.host })), s;
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("jskype-settings-instance"), i = e("swx-sms-price-web-service"), s;
  t.get = o;
}));
