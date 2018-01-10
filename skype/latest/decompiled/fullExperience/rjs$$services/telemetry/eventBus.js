define("services/telemetry/eventBus", [
  "require",
  "swx-pubsub-instance"
], function (e) {
  var t = e("swx-pubsub-instance").default;
  return {
    get: function () {
      return t;
    }
  };
});
