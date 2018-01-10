define("ui/viewModels/people/avatar", [
  "require",
  "vendor/knockout",
  "utils/common/ko",
  "lodash-compat",
  "swx-constants",
  "constants/cssClasses",
  "swx-service-locator-instance",
  "swx-utils-common",
  "swx-utils-common"
], function (e) {
  function f(e) {
    function g() {
      return typeof e.useDefaultAvatar != "undefined" ? e.useDefaultAvatar : !1;
    }
    function y() {
      var t = f._avatar() || "", n;
      return typeof e.size != "number" && (e.size = u.tryParseInt(e.size, 0)), t && m ? (e.isFullSize ? n = "l" : n = b(e.size), a.appendQueryParameter(t, "size", n)) : t;
    }
    function b(e) {
      var t = "s";
      return e >= 256 ? t = "l" : e > 96 && (t = "m"), t;
    }
    function w(e) {
      return s.AVATAR_PRESENCE + " " + s.AVATAR + "--" + e;
    }
    var f = this, l = t.utils.unwrapObservable(e.isAgent), c = e.status || r.noop, h = e.isSelected || r.noop, p = e.isFullSize || !1, d = e.size, v = o.resolve(i.serviceLocator.FEATURE_FLAGS), m = v.isFeatureOn(i.featureFlags.AVATAR_SERVICE_SUPPORTS_SIZE_PARAMETER);
    f.isPstn = n.wrapObservable(e.isPstn);
    f.isGroupAvatar = n.wrapObservable(e.isGroupAvatar);
    f._avatar = n.wrapObservable(e.avatar);
    f.avatarUrl = t.computed(y);
    f.tabindex = e.tabindex || "";
    f.displayName = n.wrapObservable(e.displayName);
    f.useDefaultAvatar = n.wrapObservable(g());
    f.useAbsolutePosition = n.wrapObservable(e.useAbsolutePosition);
    f.containerClass = t.computed(function () {
      return r.filter([
        d && s.AVATAR_SIZE + d,
        f.isGroupAvatar() && s.AVATAR_GROUP,
        l && s.AVATAR_AGENT,
        p && s.AVATAR_FULL_SIZE,
        f.isPstn() && s.AVATAR_PSTN,
        c() && w(c()),
        h() && s.AVATAR_SELECTED,
        f.useDefaultAvatar() && s.AVATAR_USE_DEFAULT,
        f.useAbsolutePosition() && s.AVATAR_ABSOLUTE
      ], r.isString).join(" ");
    });
    f.dispose = function () {
      f.containerClass.dispose();
      f.avatarUrl.dispose();
    };
  }
  var t = e("vendor/knockout"), n = e("utils/common/ko"), r = e("lodash-compat"), i = e("swx-constants").COMMON, s = e("constants/cssClasses").avatar, o = e("swx-service-locator-instance").default, u = e("swx-utils-common").stringUtils, a = e("swx-utils-common").url;
  return f;
});
