define("services/flagsApi/flagsApiServiceBusiness", [
  "require",
  "exports",
  "module",
  "swx-constants",
  "swx-pubsub-instance",
  "experience/settings",
  "swx-utils-common"
], function (e, t) {
  function o() {
    var e = [];
    this.getAll = function () {
      var t = [], n = [];
      if (i.flags == null)
        t = [-1];
      else if (i.flags)
        try {
          n = JSON.parse(i.flags);
          n.forEach(function (n) {
            t.push(parseInt(n.split("-")[1]));
            e.push(n);
          });
        } catch (r) {
        }
      else
        !s.get("SkypeFirstRun") && i.flags === "" && (t = [-1]);
      return Promise.resolve(t);
    };
    this.set = function (t) {
      var o = "";
      if (parseInt(t)) {
        s.get("SkypeFirstRun") && s.remove("SkypeFirstRun");
        o = i.version + "/EducationBubble-" + t;
        e.push(o);
        try {
          r.publish(n.events.flags.SET_FLAG, JSON.stringify(e));
        } catch (u) {
        }
      }
    };
  }
  var n = e("swx-constants").COMMON, r = e("swx-pubsub-instance").default, i = e("experience/settings"), s = e("swx-utils-common").sessionStorage;
  t.build = function () {
    return new o();
  };
});
