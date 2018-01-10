define("text!views/people/avatar.html", [], function () {
  return "<div role=\"button\" class=\"Avatar\" data-bind=\"css: containerClass, attr: {tabindex: tabindex}\">\r\n    <img class=\"Avatar-image\" data-bind=\"fallBackOnDefaultAvatarOnError: avatarUrl, isPstn: isPstn, isGroupAvatar: isGroupAvatar, displayName: displayName, useDefaultAvatar: useDefaultAvatar\" alt=\"\" aria-hidden=\"true\" role=\"presentation\">\r\n</div>\r\n";
});
