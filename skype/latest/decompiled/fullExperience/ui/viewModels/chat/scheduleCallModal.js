define("ui/viewModels/chat/scheduleCallModal", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "vendor/knockout",
  "browser/window",
  "services/serviceLocator",
  "utils/common/eventMixin",
  "ui/modalDialog/modalDialog",
  "constants/common",
  "ui/telemetry/actions/actionNames",
  "ui/modelHelpers/meetingScheduler"
], function (e, t) {
  function h(e) {
    function o() {
      var t = s.resolve(a.serviceLocator.FEATURE_FLAGS), r = t.isFeatureOn(a.featureFlags.USE_LEGACY_SCHEDULER_URI_FORMAT);
      l.generateMeetingUri(e, r).then(n);
    }
    function h() {
      i.open(n(), a.window.BLANK_NAME);
    }
    function p() {
      var e = s.resolve(a.serviceLocator.ACTION_TELEMETRY);
      e.recordAction(f.scheduleCall.scheduleCallConfirmButton);
    }
    var t = this, n = r.observable();
    o(), t.isGeneratingJoinUrl = r.computed(function () {
      return !n();
    }), t.goToCalendar = function () {
      h(), p(), t.close();
    }, t.close = function () {
      u.hide(c);
    };
  }
  var n = e("lodash-compat"), r = e("vendor/knockout"), i = e("browser/window"), s = e("services/serviceLocator"), o = e("utils/common/eventMixin"), u = e("ui/modalDialog/modalDialog"), a = e("constants/common"), f = e("ui/telemetry/actions/actionNames"), l = e("ui/modelHelpers/meetingScheduler"), c = "swx-overlayScheduleCall";
  n.assign(h.prototype, o), t.ELEMENT_ID = c, t.build = function (e) {
    return new h(e);
  };
})
