define("services/calling/autoCalling", [
  "require",
  "exports",
  "module",
  "swx-cafe-application-instance",
  "ui/viewModels/calling/helpers/callingFacade",
  "swx-constants",
  "swx-log-tracer",
  "swx-service-locator-instance",
  "swx-utils-common",
  "experience/api/helpers/conversationsSynchronizer"
], function (e, t) {
  function f(e) {
    var t = n.get().conversationsManager, f = o.resolve(i.serviceLocator.FEATURE_FLAGS);
    if (!f.isFeatureOn(i.featureFlags.CALLING))
      return;
    if (!f.isFeatureOn(i.featureFlags.AUTO_CALLING))
      return;
    u.set(i.autoCallingThreadId, e);
    n.get().personsAndGroupsManager.mePerson.id.get().then(function () {
      a.sync().then(function () {
        var n = t.getConversationByUri(e);
        n && n.autoCall ? n.autoCall.once(!0, function () {
          r.placeCall(n, !0, "autoCalling");
        }) : s.warn("Unable to find conversation with thread id = ", e);
      });
    });
  }
  var n = e("swx-cafe-application-instance"), r = e("ui/viewModels/calling/helpers/callingFacade"), i = e("swx-constants").COMMON, s = e("swx-log-tracer").getLogger(), o = e("swx-service-locator-instance").default, u = e("swx-utils-common").sessionStorage, a = e("experience/api/helpers/conversationsSynchronizer");
  t.init = function () {
    var e = u.get("userSession");
    if (!e) {
      u.remove(i.autoCallingThreadId);
      return;
    }
    try {
      var t = JSON.parse(e).threadId;
      t ? new f(t) : (u.remove(i.autoCallingThreadId), s.warn("Thread ID doesnt exist in user session"));
    } catch (n) {
      u.remove(i.autoCallingThreadId);
      s.error("Unable to setup auto calling", n);
    }
  };
});
