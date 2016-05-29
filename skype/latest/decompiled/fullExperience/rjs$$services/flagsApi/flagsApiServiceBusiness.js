define("services/flagsApi/flagsApiServiceBusiness", [
  "require",
  "exports",
  "module",
  "constants/common",
  "services/pubSub/pubSub",
  "experience/settings"
], function (e, t) {
  function s() {
    this.getAll = function () {
      var e = [], t = [];
      if (i.initParams && i.initParams.flags == null)
        e = [-1];
      else if (i.initParams && i.initParams.flags)
        try {
          t = JSON.parse(i.initParams.flags);
          t.forEach(function (t) {
            e.push(parseInt(t.split("-")[1]));
          });
        } catch (n) {
        }
      return Promise.resolve(e);
    };
    this.set = function (e) {
      parseInt(e) && r.publish(n.events.flags.SET_FLAG, "EducationBubble-" + e);
    };
  }
  var n = e("constants/common"), r = e("services/pubSub/pubSub"), i = e("experience/settings");
  t.build = function () {
    return new s();
  };
});
