define("ui/controls/experience/sidebar", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "browser/dom",
  "text!views/experience/sidebar.html",
  "ui/controls/experience/shareDialogController",
  "ui/viewModels/experience/sidebar",
  "utils/common/styleModeHelper",
  "swx-constants",
  "lodash-compat",
  "swx-service-locator-instance"
], function (e, t) {
  function p(e) {
    return e && f.has(e, "sidebarPosition") && f.isString(e.sidebarPosition) && e.sidebarPosition.toLowerCase() === a.sidebar.position.LEFT;
  }
  function d(e) {
    return a.sidebar.cssClasses[p(e) ? "SLIDE_LEFT_TO_RIGHT" : "SLIDE_RIGHT_TO_LEFT"];
  }
  function v(e) {
    function n() {
      e.parentElement.style.display = "none";
    }
    var t = l.resolve(a.serviceLocator.PUBSUB);
    t.subscribe(a.apiUIEvents.SWX_TIMELINE_LOADED, n);
  }
  function m(e) {
    var t;
    return e.setAttribute("data-bind", g()), r.addClass(e, h), t = new o(e), t.init(), t;
  }
  function g() {
    function t() {
      var t = [
        "mouseover: expand",
        "mouseout: collapse"
      ].join(e);
      return "event:{" + t + "}";
    }
    function n() {
      var t = [
        "active: isExpanded()",
        "inactive: !isExpanded()",
        "showTooltips: showTooltips()",
        "slideIn: addSlideInClass()",
        "slideOut: addSlideOutClass()"
      ].join(e);
      return "css:{" + t + "}";
    }
    function r() {
      var t = ["transitionEnd: {callback: slideTransitionEnded, moreElementsToWatch: [\"aside.sideContainer\"]}"].join(e);
      return t;
    }
    var e = ",";
    return [
      t(),
      n(),
      r()
    ].join(e);
  }
  var n = e("vendor/knockout"), r = e("browser/dom"), i = e("text!views/experience/sidebar.html"), s = e("ui/controls/experience/shareDialogController"), o = e("ui/viewModels/experience/sidebar"), u = e("utils/common/styleModeHelper"), a = e("swx-constants").COMMON, f = e("lodash-compat"), l = e("swx-service-locator-instance").default, c = "side themeWhite", h = "inactive";
  t.name = "sidebar";
  t.render = function (e, t) {
    var o = r.createElement("div"), f = l.resolve(a.serviceLocator.FEATURE_FLAGS);
    o.className = c;
    r.addClass(o, d(e));
    o.innerHTML = i;
    f.isFeatureOn(a.featureFlags.HIDE_SIDEBAR_ON_START) && v(o);
    n.applyBindings(m(o), o);
    t(o);
    s.conditionallyLaunchSharingExperience();
    u.get().addContainer(o);
  };
});
