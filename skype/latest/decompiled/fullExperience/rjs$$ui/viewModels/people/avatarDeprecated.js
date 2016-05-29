define("ui/viewModels/people/avatarDeprecated", [
  "require",
  "vendor/knockout",
  "utils/common/ko",
  "lodash-compat",
  "constants/cssClasses"
], function (e) {
  function o(e) {
    function i() {
      var t = a(e.status);
      return r.isGroupAvatar() ? s.GROUP_AVATAR : t;
    }
    function o() {
      return !r.isGroupAvatar() && !e.isCalling ? s.SHOW_PRESENCE : "";
    }
    var r = this;
    if (u(e.isGroupAvatar) || u(e.status))
      throw new Error("[AvatarDeprecated] Passing incorrect parameter, did you used property instead of ko observable ?");
    r.isPstn = n.wrapObservable(e.isPstn);
    r.isGroupAvatar = n.wrapObservable(e.isGroupAvatar);
    r.isAgent = e.isAgent;
    r.avatarUrl = e.avatar || "";
    r.containerClass = t.computed(i);
    r.presenceClass = t.computed(o);
    r.tabindex = e.tabindex || "";
    this.dispose = function () {
      r.containerClass.dispose();
      r.presenceClass.dispose();
    };
  }
  function u(e) {
    return r.isFunction(e) && !t.isObservable(e);
  }
  function a(e) {
    return e ? t.utils.unwrapObservable(e) : "";
  }
  var t = e("vendor/knockout"), n = e("utils/common/ko"), r = e("lodash-compat"), i = e("constants/cssClasses"), s = i.avatarDeprecated;
  return o;
});
