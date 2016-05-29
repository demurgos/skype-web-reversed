define("bindings/ko.fallBackOnDefaultAvatarOnError", [
  "require",
  "vendor/knockout",
  "experience/settings"
], function (e) {
  function r() {
    t.bindingHandlers.fallBackOnDefaultAvatarOnError = {
      update: function (e, n, r) {
        e.onerror = function () {
          e.src = i(r);
        };
        e.src = t.unwrap(n()) || i(r);
      }
    };
  }
  function i(e) {
    var t = e.get("isPstn"), r = e.get("isGroupAvatar");
    return t && t() ? n.appBaseUrl + n.images.relativeToAppBase.defaultPstnAvatarSvg : r && r() ? n.appBaseUrl + n.images.relativeToAppBase.defaultGroupAvatarSvg : n.appBaseUrl + n.images.relativeToAppBase.defaultProfileAvatarSvg;
  }
  var t = e("vendor/knockout"), n = e("experience/settings");
  return { register: r };
});
