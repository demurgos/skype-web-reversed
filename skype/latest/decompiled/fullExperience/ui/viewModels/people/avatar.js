define("ui/viewModels/people/avatar", [
  "require",
  "vendor/knockout",
  "utils/common/ko",
  "lodash-compat",
  "constants/cssClasses"
], function (e) {
  function s(e) {
    return i.AVATAR_PRESENCE + " " + i.AVATAR + "--" + e;
  }
  function o(e) {
    var o = this, u = t.utils.unwrapObservable(e.isAgent), a = e.status || r.noop, f = e.isSelected || r.noop, l = e.size;
    o.isPstn = n.wrapObservable(e.isPstn), o.isGroupAvatar = n.wrapObservable(e.isGroupAvatar), o.avatarUrl = e.avatar || "", o.tabindex = e.tabindex || "", o.containerClass = t.computed(function () {
      return r.filter([
        l && i.AVATAR_SIZE + l,
        o.isGroupAvatar() && i.AVATAR_GROUP,
        u && i.AVATAR_AGENT,
        o.isPstn() && i.AVATAR_PSTN,
        a() && s(a()),
        f() && i.AVATAR_SELECTED
      ], r.isString).join(" ");
    }), o.dispose = function () {
      o.containerClass.dispose();
    };
  }
  var t = e("vendor/knockout"), n = e("utils/common/ko"), r = e("lodash-compat"), i = e("constants/cssClasses").avatar;
  return o;
})
