define("services/cqf/cqfSettings", [
  "require",
  "exports",
  "module",
  "services/ecs/configLoader",
  "swx-enums",
  "experience/settings"
], function (e, t) {
  function o() {
    function o() {
      if (!t || !s)
        s = n.loadConfig(r.ecsClientNames.Skype, i.ecsCqfKey);
      return s;
    }
    function u() {
      return {
        minimumCallLength: i.cqf.minimumCallLengthSec * 1000,
        pstnCallPercentage: i.cqf.pstnCallPercentage,
        groupCallPercentage: i.cqf.groupCallPercentage,
        skypeCallPercentage: i.cqf.skypeCallPercentage
      };
    }
    function a(e) {
      return {
        minimumCallLength: e.Configurations.CQF_Trigger.MinCallDurationSecs * 1000,
        pstnCallPercentage: e.Configurations.CQF_Trigger.PSTN_Percent,
        groupCallPercentage: e.Configurations.CQF_Trigger.GroupCall_Percent,
        skypeCallPercentage: e.Configurations.CQF_Trigger.S2S_Percent
      };
    }
    var e = this, t = !1, s;
    return e.get = function () {
      var e = new Promise(function (e) {
        o().then(function (n) {
          t = !0;
          e(a(n));
        }).catch(function () {
          t = !1;
          e(u());
        });
      });
      return e;
    }, e;
  }
  var n = e("services/ecs/configLoader"), r = e("swx-enums"), i = e("experience/settings"), s;
  t.build = function () {
    return s || (s = new o()), s;
  };
});
