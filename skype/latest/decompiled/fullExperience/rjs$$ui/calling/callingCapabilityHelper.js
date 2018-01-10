define("ui/calling/callingCapabilityHelper", [
  "require",
  "exports",
  "module",
  "swx-cafe-application-instance",
  "swx-browser-detect",
  "swx-service-locator-instance",
  "swx-constants",
  "ui/modelHelpers/conversationHelper",
  "vendor/knockout"
], function (e, t) {
  var n = e("swx-cafe-application-instance"), r = e("swx-browser-detect").default, i = e("swx-service-locator-instance").default, s = e("swx-constants").COMMON, o = e("ui/modelHelpers/conversationHelper"), u = e("vendor/knockout");
  t.getVideoCapabilityObservable = function (e) {
    function h(t) {
      if (!t) {
        l(!1);
        return;
      }
      if (e.isGroupConversation() && r.getBrowserInfo().isChromeOnLinux) {
        l(a.isFeatureOn(s.featureFlags.PLUGINLESS_GROUP_VIDEO_CALLING_CHROME_LINUX));
        return;
      }
      if (e.isGroupConversation()) {
        l(!0);
        return;
      }
      l(!f);
    }
    var t = n.get().personsAndGroupsManager.mePerson.capabilities.video, a = i.resolve(s.serviceLocator.FEATURE_FLAGS), f = o.isConversationWithPstn(e), l = u.observable(!1), c;
    return c = t.changed(h), l.dispose = c.dispose.bind(c), l;
  };
});
