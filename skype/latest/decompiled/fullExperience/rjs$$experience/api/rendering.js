define("experience/api/rendering", [
  "require",
  "exports",
  "module",
  "constants/common",
  "experience/settings",
  "services/serviceLocator",
  "experience/api/helpers/contentNavigatorStore"
], function (e, t) {
  function o(e, t, r) {
    var s = i.resolve(n.serviceLocator.CONTROLS_BUILDER);
    return s.build(e, t, r);
  }
  var n = e("constants/common"), r = e("experience/settings"), i = e("services/serviceLocator"), s = e("experience/api/helpers/contentNavigatorStore");
  t.renderContent = function (e, t) {
    s.add(e);
    o(r.controls.content.toLowerCase(), e, t);
  };
  t.renderSidebar = function (e, t) {
    o(r.controls.sidebar.toLowerCase(), e, t);
  };
  t.renderMe = function (e, t) {
    o(r.controls.me.toLowerCase(), e, t);
  };
});
