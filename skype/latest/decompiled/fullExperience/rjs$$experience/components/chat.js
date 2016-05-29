define("experience/components/chat", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "experience/settings",
  "constants/common",
  "services/serviceLocator",
  "swx-utils-common",
  "utils/chat/urlParser",
  "utils/chat/dateTime",
  "ui/components/chat/index",
  "ui/components/registrar",
  "constants/components",
  "ui/components/chat/pes.v2/expressionPicker",
  "ui/components/chat/pes.v2/itemsPicker",
  "ui/components/chat/pes.v2/itemRoster"
], function (e, t) {
  var n = e("lodash-compat"), r = e("experience/settings"), i = e("constants/common"), s = e("services/serviceLocator"), o = e("swx-utils-common").loader, u = e("utils/chat/urlParser"), a = e("utils/chat/dateTime"), f = e("ui/components/chat/index"), l = e("ui/components/registrar"), c = e("constants/components").chat, h = e("ui/components/chat/pes.v2/expressionPicker"), p = e("ui/components/chat/pes.v2/itemsPicker"), d = e("ui/components/chat/pes.v2/itemRoster");
  t.init = function (e) {
    var t = s.resolve(i.serviceLocator.FEATURE_FLAGS);
    t.isFeatureOn(i.featureFlags.LOCATION_MESSAGE_SUPPORT) && o.loadScript(r.mapsApiUrl + (u.isHttps(location.href) ? "&s=1" : ""));
    t.isFeatureOn(i.featureFlags.PES_V2_ENABLED) && (f = n.map(f, function (e) {
      switch (e.name) {
      case c.EXPRESSION_PICKER:
        return h;
      case c.EXPRESSION_ITEMS_PICKER:
        return p;
      case c.EXPRESSION_ITEM_ROSTER:
        return d;
      default:
        return e;
      }
    }));
    a.notifyOnDayChange();
    l.register(f);
    e();
  };
});
