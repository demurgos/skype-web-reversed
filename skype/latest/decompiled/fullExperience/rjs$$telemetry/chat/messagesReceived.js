define("telemetry/chat/messagesReceived", [
  "require",
  "services/telemetry/skypeData",
  "telemetry/chat/activityItemHelper"
], function (e) {
  function r() {
    this.publish = function (r) {
      var i, s, o = 0;
      if (r.length === 0)
        return;
      var u = n.getEmptyResult();
      u.totalCount = r.length;
      for (i = 0; i < r.length; i++)
        s = r[i], n.updateResult(u, s.typeId), s.appIsActive && o++;
      u.inOpenedApp = o;
      var a = {
        type: "chat_IM_receiveBatch",
        data: u
      };
      t.push(a);
    };
  }
  var t = e("services/telemetry/skypeData"), n = e("telemetry/chat/activityItemHelper");
  return r;
})
