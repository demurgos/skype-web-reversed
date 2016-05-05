define("services/calling/autoCalling", [
  "require",
  "exports",
  "module",
  "cafe/applicationInstance",
  "ui/viewModels/calling/helpers/callingFacade",
  "constants/common",
  "services/serviceLocator",
  "ui/controls/calling/sounds",
  "swx-utils-common",
  "experience/api/helpers/conversationsSynchronizer"
], function (e, t) {
  function f(e) {
    var t = n.get().conversationsManager, f = s.resolve(i.serviceLocator.FEATURE_FLAGS);
    if (!f.isFeatureOn(i.featureFlags.CALLING))
      return;
    if (!f.isFeatureOn(i.featureFlags.AUTO_CALLING))
      return;
    u.set(i.autoCallingThreadId, e), n.get().personsAndGroupsManager.mePerson.id.get().then(function () {
      a.sync().then(function () {
        var n = t.getConversationByUri(e);
        n && n.autoCall && n.autoCall.once(!0, function () {
          r.placeCall(n, !0, "autoCalling"), o.playOnce(o.KEYS.CALL_DIALING);
        });
      });
    });
  }
  var n = e("cafe/applicationInstance"), r = e("ui/viewModels/calling/helpers/callingFacade"), i = e("constants/common"), s = e("services/serviceLocator"), o = e("ui/controls/calling/sounds"), u = e("swx-utils-common").sessionStorage, a = e("experience/api/helpers/conversationsSynchronizer");
  t.init = function () {
    var e = u.get("userSession");
    if (!e) {
      u.remove(i.autoCallingThreadId);
      return;
    }
    try {
      var t = JSON.parse(e).threadId;
      t ? new f(t) : u.remove(i.autoCallingThreadId);
    } catch (n) {
      u.remove(i.autoCallingThreadId);
    }
  };
})
