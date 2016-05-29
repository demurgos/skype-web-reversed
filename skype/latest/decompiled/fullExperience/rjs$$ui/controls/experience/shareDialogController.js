define("ui/controls/experience/shareDialogController", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "browser/dom",
  "browser/window",
  "constants/common",
  "services/serviceLocator",
  "text!views/chat/shareDialog.html",
  "ui/viewModels/chat/shareDialog"
], function (e, t) {
  function c() {
    h();
    var e = p(), t = a.build(e.sharedUrl, e.flowId), r = d();
    n.applyBindings(t, r);
    t.show();
  }
  function h() {
    var e = r.getElement("#" + l);
    if (e)
      throw new Error("Internal API error: Share Dialog should not be launched more than once");
  }
  function p() {
    var e = t.getRawQueryString() || "";
    e = e.replace(/^\??/, "");
    var n = e.split("&"), r = {};
    for (var i = 0; i < n.length; i++) {
      var s = n[i].split("="), o = decodeURIComponent(s[0] || "").toLowerCase(), u = decodeURIComponent(s[1] || ""), a = r[o];
      a || (a = [], r[o] = a);
      a.push(u);
    }
    return {
      sharedUrl: (r.sharedurl || [])[0],
      flowId: (r.flowid || [])[0]
    };
  }
  function d() {
    var e = r.createElement("div");
    e.innerHTML = u;
    var t = e.firstChild, n = r.getElement(f);
    return n.appendChild(t), t;
  }
  var n = e("vendor/knockout"), r = e("browser/dom"), i = e("browser/window"), s = e("constants/common"), o = e("services/serviceLocator"), u = e("text!views/chat/shareDialog.html"), a = e("ui/viewModels/chat/shareDialog"), f = ".swx", l = "swx-share-dialog";
  t.getRawQueryString = function () {
    return i.location.search;
  };
  t.conditionallyLaunchSharingExperience = function () {
    var e = o.resolve(s.serviceLocator.FEATURE_FLAGS), t = e.isFeatureOn(s.featureFlags.SHOW_ALTERNATE_SHARE_DIALOG_EXPERIENCE);
    t && c();
  };
});
