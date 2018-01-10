define("bindings/ko.fallBackOnDefaultAvatarOnError", [
  "require",
  "vendor/knockout",
  "lodash-compat",
  "browser/window",
  "swx-constants",
  "swx-service-locator-instance",
  "utils/people/avatar/cache",
  "utils/people/avatar/helper",
  "experience/settings"
], function (e) {
  function p() {
    var e = g;
    v(s.USE_AVATAR_CACHE) && (e = m);
    t.bindingHandlers.fallBackOnDefaultAvatarOnError = {
      init: d,
      update: e
    };
  }
  function d(e, n, i) {
    var o, u, f = i.get("displayName"), p = i.get("isPstn"), d = i.get("isGroupAvatar"), m = e.parentNode;
    if (!v(s.USE_AVATAR_INITIALS) || !t.isObservable(f) || p() || d())
      return;
    o = f.subscribe(function () {
      if (t.utils.domData.get(e, l))
        return;
      a.showColoredInitials(m, f());
    });
    u = r.setTimeout(function () {
      a.showColoredInitials(m, f());
    }, h);
    t.utils.domData.set(e, c, u);
    t.utils.domNodeDisposal.addDisposeCallback(e, function () {
      o.dispose();
    });
  }
  function v(e) {
    return o.resolve(i.serviceLocator.FEATURE_FLAGS).isFeatureOn(e);
  }
  function m(e, n, r) {
    var i = t.unwrap(n());
    return u.isCached(i).then(function (t) {
      t || !i ? w(e, r) : (e.src = i, e.onload = b.bind(null, e), e.onerror = y.bind(null, e, r, u.add.bind(null, e.src)));
    });
  }
  function g(e, n, r) {
    var i = t.unwrap(n());
    return i ? (e.src = i, e.onload = b.bind(null, e), e.onerror = y.bind(null, e, r)) : w(e, r), Promise.resolve();
  }
  function y(e, t, r) {
    var i = n.isFunction(r) ? r : n.noop;
    e.onload = n.noop;
    w(e, t);
    i();
  }
  function b(e) {
    var n = t.utils.domData.get(e, c);
    r.clearTimeout(n);
    a.resetInitials(e.parentNode);
    t.utils.domData.set(e, l, !0);
  }
  function w(e, t) {
    var r = n.isFunction(t.get("displayName")) ? t.get("displayName")() : null, i = t.get("isPstn"), o = t.get("isGroupAvatar"), u = t.get("useDefaultAvatar") || n.noop;
    e.src = E(t);
    e.onload = n.noop;
    e.onerror = n.noop;
    u(!0);
    if (v(s.USE_AVATAR_INITIALS) && a.isValidDisplayName(r) && !i() && !o()) {
      a.showColoredInitials(e.parentNode, r);
      return;
    }
    a.resetInitials(e.parentNode);
  }
  function E(e) {
    var t = e.get("isPstn"), n = e.get("isGroupAvatar");
    return t && t() ? f.appBaseUrl + f.images.relativeToAppBase.defaultPstnAvatarSvg : n && n() ? f.appBaseUrl + f.images.relativeToAppBase.defaultGroupAvatarSvg : f.appBaseUrl + f.images.relativeToAppBase.defaultProfileAvatarSvg;
  }
  var t = e("vendor/knockout"), n = e("lodash-compat"), r = e("browser/window"), i = e("swx-constants").COMMON, s = i.featureFlags, o = e("swx-service-locator-instance").default, u = e("utils/people/avatar/cache"), a = e("utils/people/avatar/helper"), f = e("experience/settings"), l = "imageLoaded", c = "initialsTimer", h = 100;
  return { register: p };
});
