define("text!views/people/avatarDeprecated.html", [], function () {
  return "<span class=\"tile\" data-bind=\"css: containerClass\">\r\n    <span role='button' class=\"tileAvatar circle\" data-bind=\"css: presenceClass\">\r\n        <span class=\"tileImage\" data-bind=\"css: {agent: isAgent, pstn: isPstn}\">\r\n            <img data-bind=\"fallBackOnDefaultAvatarOnError: avatarUrl, isPstn: isPstn, isGroupAvatar: isGroupAvatar\" alt=\"\" aria-hidden=\"true\" role=\"presentation\">\r\n        </span>\r\n    </span>\r\n</span>\r\n";
})
