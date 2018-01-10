(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-sms-price-web-service/lib/smsPriceWebService", [
      "require",
      "exports",
      "swx-xhr-dispatcher"
    ], e);
}(function (e, t) {
  function r(e, t) {
    function i(t, n) {
      return e().then(function (e) {
        var i = "skype", s = "skype.client.sms.1way", o = {
            headers: { "X-Skypetoken": e },
            params: {
              number: n,
              organizationId: i,
              flowId: s
            },
            reporting: { serviceName: "smsPrice" }
          }, u = "/skypesms/v1/user/" + t + "/price";
        return r.get(u, o);
      });
    }
    var r = n.build(t);
    return { getSmsPrice: i };
  }
  var n = e("swx-xhr-dispatcher");
  t.build = r;
}));
