define("services/telemetry/eventBus", [
  "require",
  "services/pubSub/pubSub"
], function (e) {
  var t = e("services/pubSub/pubSub");
  return {
    get: function () {
      return t;
    }
  };
})
