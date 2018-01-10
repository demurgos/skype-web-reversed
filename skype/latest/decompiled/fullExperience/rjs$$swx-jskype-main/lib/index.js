(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/index", [
      "require",
      "exports",
      "./utils/batch",
      "swx-jskype-internal-application-instance",
      "./utils/chat/cacheBase",
      "./utils/chat/parser",
      "./services/serviceAccessLayer/decorations/reporting",
      "./services/serviceAccessLayer/qos/reporter",
      "./services/serviceAccessLayer/requestDispatcher",
      "./services/serviceAccessLayer/transientFaultPolicy",
      "./services/serviceAccessLayer/uriBuilder"
    ], e);
}(function (e, t) {
  var n = e("./utils/batch"), r = e("swx-jskype-internal-application-instance"), i = e("./utils/chat/cacheBase"), s = e("./utils/chat/parser"), o = e("./services/serviceAccessLayer/decorations/reporting"), u = e("./services/serviceAccessLayer/qos/reporter"), a = e("./services/serviceAccessLayer/requestDispatcher"), f = e("./services/serviceAccessLayer/transientFaultPolicy"), l = e("./services/serviceAccessLayer/uriBuilder");
  t.client = r;
  t.utils = {
    batch: n,
    chat: {
      cacheBase: i,
      parser: s
    }
  };
  t.services = {
    serviceAccessLayer: {
      decorations: { reporting: o },
      qos: { reporter: u },
      requestDispatcher: a,
      transientFaultPolicy: f,
      uriBuilder: l
    }
  };
}));
