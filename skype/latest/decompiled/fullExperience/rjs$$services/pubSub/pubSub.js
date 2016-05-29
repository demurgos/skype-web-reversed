define("services/pubSub/pubSub", [
  "require",
  "lodash-compat",
  "swx-pubsub"
], function (e) {
  var t = e("lodash-compat"), n = e("swx-pubsub").default, r = new n();
  return t.bindAll(r, "subscribe", "unsubscribe", "publish", "unsubscribeAll"), r;
});
