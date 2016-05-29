define("telemetry/chat/messagesSent", [
  "require",
  "services/telemetry/skypeData",
  "constants/common",
  "telemetry/chat/activityItemHelper"
], function (e) {
  function i() {
    this.publish = function (i) {
      var s, o, u = 0;
      if (i.length === 0)
        return;
      var a = r.getEmptyResult();
      a.totalCount = i.length;
      a.failedCount = 0;
      a.balance404Count = 0;
      a.tts = [];
      a.t404 = [];
      for (s = 0; s < i.length; s++)
        o = i[s], r.updateResult(a, o.typeId), u += o.tts, a.tts.push(o.tts), a.t404.push(o.t404), o.t404 !== n.telemetry.NOT_AVAILABLE && a.balance404Count++, o.isSuccess || a.failedCount++;
      a.tts.sort();
      var f = {
        type: "chat_IM_sentBatch",
        data: a
      };
      a.ttsAvg = u / a.totalCount;
      a.deliveryRate = (1 - a.failedCount / a.totalCount) * 100;
      t.push(f);
    };
  }
  var t = e("services/telemetry/skypeData"), n = e("constants/common"), r = e("telemetry/chat/activityItemHelper");
  return i;
});
